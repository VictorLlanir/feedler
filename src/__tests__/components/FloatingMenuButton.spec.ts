import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import FloatingMenuButton from '../../components/FloatingMenuButton.vue'

// Mock do router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: { template: '<div>Home</div>' } }
    ]
})

describe('FloatingMenuButton', () => {
    it('não deve renderizar quando não é mobile', () => {
        const wrapper = mount(FloatingMenuButton, {
            global: {
                plugins: [router]
            }
        })

        // Simular desktop
        wrapper.vm.$data.isMobile = false

        const button = wrapper.find('.floating-menu-button')
        expect(button.exists()).toBe(false)
    })

    it('não deve renderizar quando drawer está aberto', () => {
        const wrapper = mount(FloatingMenuButton, {
            global: {
                plugins: [router]
            }
        })

        // Simular mobile com drawer aberto
        wrapper.vm.$data.isMobile = true
        wrapper.vm.$data.isDrawerOpen = true

        const button = wrapper.find('.floating-menu-button')
        expect(button.exists()).toBe(false)
    })

    it('deve renderizar quando mobile e drawer fechado', () => {
        const wrapper = mount(FloatingMenuButton, {
            global: {
                plugins: [router]
            }
        })

        // Simular mobile com drawer fechado
        wrapper.vm.$data.isMobile = true
        wrapper.vm.$data.isDrawerOpen = false

        const button = wrapper.find('.floating-menu-button')
        expect(button.exists()).toBe(true)
    })

    it('deve ter atributos de acessibilidade corretos', () => {
        const wrapper = mount(FloatingMenuButton, {
            global: {
                plugins: [router]
            }
        })

        // Simular mobile com drawer fechado
        wrapper.vm.$data.isMobile = true
        wrapper.vm.$data.isDrawerOpen = false

        const button = wrapper.find('.floating-menu-button')
        expect(button.attributes('title')).toBe('Abrir menu lateral')
        expect(button.attributes('aria-label')).toBe('Abrir menu lateral')
    })

    it('deve renderizar ícone correto', () => {
        const wrapper = mount(FloatingMenuButton, {
            global: {
                plugins: [router]
            }
        })

        // Simular mobile com drawer fechado
        wrapper.vm.$data.isMobile = true
        wrapper.vm.$data.isDrawerOpen = false

        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe('/src/assets/icons/add.svg')
        expect(img.attributes('alt')).toBe('Menu')
    })

    it('deve chamar openDrawer quando clicado', async () => {
        const wrapper = mount(FloatingMenuButton, {
            global: {
                plugins: [router]
            }
        })

        // Simular mobile com drawer fechado
        wrapper.vm.$data.isMobile = true
        wrapper.vm.$data.isDrawerOpen = false

        const button = wrapper.find('.floating-menu-button')

        // Mock da função openDrawer
        const mockOpenDrawer = vi.fn()
        wrapper.vm.$data.openDrawer = mockOpenDrawer

        await button.trigger('click')
        expect(mockOpenDrawer).toHaveBeenCalled()
    })
})
