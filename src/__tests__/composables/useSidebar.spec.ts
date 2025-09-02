import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useSidebar } from '../../composables/useSidebar'

// Mock do window para testes
const mockInnerWidth = vi.fn()

Object.defineProperty(window, 'innerWidth', {
    writable: true,
    value: 1024
})

// Mock do addEventListener e removeEventListener
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

Object.defineProperty(window, 'addEventListener', {
    writable: true,
    value: mockAddEventListener
})

Object.defineProperty(window, 'removeEventListener', {
    writable: true,
    value: mockRemoveEventListener
})

describe('useSidebar', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        // Reset window.innerWidth para desktop
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('deve iniciar com sidebar expandido no desktop', () => {
        const { isCollapsed, isMobile, isDrawerOpen } = useSidebar()

        expect(isCollapsed.value).toBe(false)
        expect(isMobile.value).toBe(false)
        expect(isDrawerOpen.value).toBe(true)
    })

    it('deve iniciar com sidebar colapsado no mobile', () => {
        // Simular mobile
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 600
        })

        const { isCollapsed, isMobile, isDrawerOpen } = useSidebar()

        expect(isCollapsed.value).toBe(true)
        expect(isMobile.value).toBe(true)
        expect(isDrawerOpen.value).toBe(false)
    })

    it('deve alternar sidebar no desktop', () => {
        const { isCollapsed, isMobile, toggleSidebar } = useSidebar()

        expect(isCollapsed.value).toBe(false)
        expect(isMobile.value).toBe(false)

        toggleSidebar()
        expect(isCollapsed.value).toBe(true)

        toggleSidebar()
        expect(isCollapsed.value).toBe(false)
    })

    it('deve abrir e fechar drawer no mobile', () => {
        // Simular mobile
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 600
        })

        const { isDrawerOpen, isMobile, toggleSidebar, openDrawer, closeDrawer } = useSidebar()

        expect(isDrawerOpen.value).toBe(false)
        expect(isMobile.value).toBe(true)

        openDrawer()
        expect(isDrawerOpen.value).toBe(true)

        closeDrawer()
        expect(isDrawerOpen.value).toBe(false)

        toggleSidebar()
        expect(isDrawerOpen.value).toBe(true)
    })

    it('deve calcular isVisible corretamente', () => {
        const { isVisible, isCollapsed, isMobile, isDrawerOpen } = useSidebar()

        // Desktop expandido
        expect(isCollapsed.value).toBe(false)
        expect(isMobile.value).toBe(false)
        expect(isVisible.value).toBe(true)

        // Desktop colapsado
        isCollapsed.value = true
        expect(isVisible.value).toBe(false)

        // Mobile com drawer fechado
        isMobile.value = true
        isDrawerOpen.value = false
        expect(isVisible.value).toBe(false)

        // Mobile com drawer aberto
        isDrawerOpen.value = true
        expect(isVisible.value).toBe(true)
    })

    it('deve adicionar e remover event listeners do resize', () => {
        const { cleanup } = useSidebar()

        expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function))

        if (cleanup) {
            cleanup()
            expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
        }
    })

    it('deve detectar mudança de desktop para mobile', () => {
        const { isMobile, isCollapsed, isDrawerOpen } = useSidebar()

        expect(isMobile.value).toBe(false)
        expect(isCollapsed.value).toBe(false)
        expect(isDrawerOpen.value).toBe(true)

        // Simular redimensionamento para mobile
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 600
        })

        // Disparar evento de resize
        const resizeCallback = mockAddEventListener.mock.calls.find(
            call => call[0] === 'resize'
        )?.[1]

        if (resizeCallback) {
            resizeCallback()
            expect(isMobile.value).toBe(true)
            expect(isCollapsed.value).toBe(true)
            expect(isDrawerOpen.value).toBe(false)
        }
    })

    it('deve calcular classes CSS corretamente', () => {
        const { sidebarClasses, overlayClasses, isMobile, isCollapsed, isDrawerOpen } = useSidebar()

        // Desktop expandido
        expect(sidebarClasses.value).toEqual({
            'sidebar-collapsed': false,
            'sidebar-mobile': false,
            'sidebar-drawer-open': false,
            'sidebar-drawer-closed': false
        })

        expect(overlayClasses.value).toEqual({
            'sidebar-overlay': true,
            'sidebar-overlay-visible': false
        })

        // Mobile com drawer fechado
        isMobile.value = true
        isDrawerOpen.value = false

        expect(sidebarClasses.value).toEqual({
            'sidebar-collapsed': false,
            'sidebar-mobile': true,
            'sidebar-drawer-open': false,
            'sidebar-drawer-closed': true
        })

        expect(overlayClasses.value).toEqual({
            'sidebar-overlay': true,
            'sidebar-overlay-visible': false
        })

        // Mobile com drawer aberto
        isDrawerOpen.value = true

        expect(overlayClasses.value).toEqual({
            'sidebar-overlay': true,
            'sidebar-overlay-visible': true
        })
    })
})
