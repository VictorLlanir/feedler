import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../../layouts/AppLayout.vue'
import SideNav from '../../layouts/SideNav.vue'
import MainContent from '../../layouts/MainContent.vue'
import AppHeader from '../../layouts/components/AppHeader.vue'
import MenuItem from '../../layouts/components/MenuItem.vue'

// Mock do router com todas as rotas
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            redirect: '/today',
            children: [
                { path: 'today', component: { template: '<div>Today Page</div>' }, meta: { title: 'Hoje' } },
                { path: 'favorites', component: { template: '<div>Favorites Page</div>' }, meta: { title: 'Favoritos' } },
                { path: 'add-feeds', component: { template: '<div>Add Feeds Page</div>' }, meta: { title: 'Adicionar Feeds' } },
            ]
        }
    ]
})

describe('Layout Integration', () => {
    beforeEach(async () => {
        router.push('/')
        await router.isReady()
    })

    it('deve renderizar layout completo com todos os componentes', async () => {
        router.push('/today')
        await router.isReady()

        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        // Verificar componentes principais
        expect(wrapper.findComponent(SideNav).exists()).toBe(true)
        expect(wrapper.findComponent(MainContent).exists()).toBe(true)

        // Verificar componentes dentro do MainContent
        const mainContent = wrapper.findComponent(MainContent)
        expect(mainContent.findComponent(AppHeader).exists()).toBe(true)
    })

    it('deve sincronizar navegação entre SideNav e MainContent', async () => {
        router.push('/today')
        await router.isReady()

        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        // Verificar se o título no header corresponde à rota atual
        const appHeader = wrapper.findComponent(AppHeader)
        expect(appHeader.props('title')).toBe('Hoje')

        // Verificar se o item do menu está marcado como ativo
        const sideNav = wrapper.findComponent(SideNav)
        const menuItems = sideNav.findAllComponents(MenuItem)
        const todayItem = menuItems.find(item => item.props('text') === 'Hoje')
        expect(todayItem?.props('isActive')).toBe(true)
    })

    it('deve manter consistência visual entre componentes', async () => {
        await router.push('/favorites')
        await router.isReady()

        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        // Verificar se o título foi atualizado
        const appHeader = wrapper.findComponent(AppHeader)
        expect(appHeader.props('title')).toBe('Favoritos')

        // Verificar se o item ativo mudou
        const sideNav = wrapper.findComponent(SideNav)
        const menuItems = sideNav.findAllComponents(MenuItem)
        const favoritesItem = menuItems.find(item => item.props('text') === 'Favoritos')
        expect(favoritesItem?.props('isActive')).toBe(true)

        // Verificar se apenas um item está ativo
        const activeItems = menuItems.filter(item => item.props('isActive'))
        expect(activeItems).toHaveLength(1)
    })

    it('deve renderizar conteúdo correto da página', async () => {
        await router.push('/today')
        await router.isReady()

        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        // Verificar se o conteúdo da página está sendo renderizado
        // Como estamos usando stub para RouterView, verificamos a estrutura
        const mainContent = wrapper.findComponent(MainContent)
        const routerView = mainContent.findComponent({ name: 'RouterView' })
        expect(routerView.exists()).toBe(true)
    })

    it('deve manter estrutura de layout consistente', async () => {
        await router.push('/add-feeds')
        await router.isReady()

        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        // Verificar estrutura geral
        const sideNav = wrapper.find('.side-nav')
        const mainContent = wrapper.find('.main-content')

        expect(sideNav.exists()).toBe(true)
        expect(mainContent.exists()).toBe(true)

        // Verificar que o SideNav tem os elementos esperados
        expect(sideNav.find('.side-nav__logo').exists()).toBe(true)
        expect(sideNav.find('.side-nav__menu').exists()).toBe(true)

        // Verificar que o MainContent tem os elementos esperados
        expect(mainContent.find('.app-header').exists()).toBe(true)
    })
})
