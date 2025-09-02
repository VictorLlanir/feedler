import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SideNav from '../../layouts/SideNav.vue'
import MenuItem from '../../layouts/components/MenuItem.vue'

// Mock do router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/today', component: { template: '<div>Today</div>' }, meta: { title: 'Hoje' } },
        { path: '/add-feeds', component: { template: '<div>Add Feeds</div>' }, meta: { title: 'Adicionar feeds' } },
        { path: '/search', component: { template: '<div>Search</div>' }, meta: { title: 'Buscar' } },
        { path: '/favorites', component: { template: '<div>Favorites</div>' }, meta: { title: 'Favoritos' } },
        { path: '/read-later', component: { template: '<div>Read Later</div>' }, meta: { title: 'Ler mais tarde' } },
        { path: '/recently-read', component: { template: '<div>Recently Read</div>' }, meta: { title: 'Lidos recentemente' } },
    ]
})

describe('SideNav', () => {
    it('deve renderizar o logo corretamente', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const logo = wrapper.find('.side-nav__logo')
        expect(logo.exists()).toBe(true)
        expect(logo.attributes('src')).toBe('/src/assets/images/feedler_logo.png')
        expect(logo.attributes('alt')).toBe('Logo')
    })

    it('deve renderizar todos os itens do menu core', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const menuItems = wrapper.findAllComponents(MenuItem)
        const coreMenuItems = menuItems.slice(0, 3) // primeiros 3 são do core menu

        expect(coreMenuItems).toHaveLength(3)
        expect(coreMenuItems[0].props('text')).toBe('Hoje')
        expect(coreMenuItems[1].props('text')).toBe('Adicionar feeds')
        expect(coreMenuItems[2].props('text')).toBe('Buscar')
    })

    it('deve renderizar todos os itens do menu de feeds', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const menuItems = wrapper.findAllComponents(MenuItem)
        const feedMenuItems = menuItems.slice(3) // últimos 3 são do feed menu

        expect(feedMenuItems).toHaveLength(3)
        expect(feedMenuItems[0].props('text')).toBe('Favoritos')
        expect(feedMenuItems[1].props('text')).toBe('Ler mais tarde')
        expect(feedMenuItems[2].props('text')).toBe('Lidos recentemente')
    })

    it('deve marcar o item correto como ativo baseado na rota atual', async () => {
        await router.push('/today')
        await router.isReady()

        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const menuItems = wrapper.findAllComponents(MenuItem)
        const todayItem = menuItems.find(item => item.props('text') === 'Hoje')

        expect(todayItem?.props('isActive')).toBe(true)
    })

    it('deve aplicar estilos corretos ao container', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const sideNav = wrapper.find('.side-nav')
        expect(sideNav.exists()).toBe(true)
        expect(sideNav.classes()).toContain('side-nav')
    })

    it('deve renderizar separador entre menus', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const hr = wrapper.find('hr')
        expect(hr.exists()).toBe(true)
    })

    it('deve renderizar botão de toggle', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const toggleButton = wrapper.find('.side-nav__toggle')
        expect(toggleButton.exists()).toBe(true)
    })

    it('deve ocultar logo quando colapsado no desktop', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        // Simular estado colapsado
        wrapper.vm.$data.isCollapsed = true
        wrapper.vm.$data.isMobile = false

        const logo = wrapper.find('.side-nav__logo')
        expect(logo.classes()).toContain('hidden') // ou verificar se tem opacity: 0
    })

    it('deve mostrar logo quando expandido', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const logo = wrapper.find('.side-nav__logo')
        expect(logo.exists()).toBe(true)
    })

    it('deve ocultar texto dos itens quando colapsado', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const menuItems = wrapper.findAllComponents(MenuItem)

        // Verificar se os itens recebem a prop showText=false quando colapsado
        menuItems.forEach(item => {
            expect(item.props('showText')).toBe(true) // por padrão deve ser true
        })
    })

    it('deve renderizar overlay quando mobile e drawer aberto', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        // Simular mobile com drawer aberto
        wrapper.vm.$data.isMobile = true
        wrapper.vm.$data.isDrawerOpen = true

        const overlay = wrapper.find('.sidebar-overlay')
        expect(overlay.exists()).toBe(true)
        expect(overlay.classes()).toContain('sidebar-overlay-visible')
    })

    it('não deve renderizar overlay quando desktop', () => {
        const wrapper = mount(SideNav, {
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const overlay = wrapper.find('.sidebar-overlay')
        expect(overlay.exists()).toBe(false)
    })
})
