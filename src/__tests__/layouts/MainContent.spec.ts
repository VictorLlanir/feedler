import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '../../layouts/MainContent.vue'
import AppHeader from '../../layouts/components/AppHeader.vue'

// Mock do router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/today',
            component: { template: '<div>Today Content</div>' },
            meta: { title: 'Hoje' }
        },
        {
            path: '/favorites',
            component: { template: '<div>Favorites Content</div>' },
            meta: { title: 'Favoritos' }
        }
    ]
})

describe('MainContent', () => {
    it('deve renderizar AppHeader com o título correto da rota', async () => {
        router.push('/today')
        await router.isReady()

        const wrapper = mount(MainContent, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        const appHeader = wrapper.findComponent(AppHeader)
        expect(appHeader.exists()).toBe(true)
        expect(appHeader.props('title')).toBe('Hoje')
    })

    it('deve atualizar o título quando a rota muda', async () => {
        await router.push('/today')
        await router.isReady()

        const wrapper = mount(MainContent, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        let appHeader = wrapper.findComponent(AppHeader)
        expect(appHeader.props('title')).toBe('Hoje')

        // Mudar rota
        await router.push('/favorites')
        await router.isReady()

        // Re-renderizar para capturar mudança
        await wrapper.vm.$nextTick()

        appHeader = wrapper.findComponent(AppHeader)
        expect(appHeader.props('title')).toBe('Favoritos')
    })

    it('deve renderizar router-view', () => {
        const wrapper = mount(MainContent, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        const routerView = wrapper.findComponent({ name: 'RouterView' })
        expect(routerView.exists()).toBe(true)
    })

    it('deve aplicar estilos corretos ao container', () => {
        const wrapper = mount(MainContent, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        const main = wrapper.find('.main-content')
        expect(main.exists()).toBe(true)
        expect(main.classes()).toContain('main-content')
    })
})
