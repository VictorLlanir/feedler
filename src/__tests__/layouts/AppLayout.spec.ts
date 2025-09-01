import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../../layouts/AppLayout.vue'
import SideNav from '../../layouts/SideNav.vue'
import MainContent from '../../layouts/MainContent.vue'

// Mock do router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            redirect: '/today',
            children: [
                { path: '/today', component: { template: '<div>Today Page</div>' }, meta: { title: 'Hoje' } },
                { path: '/add-feeds', component: { template: '<div>Add Feeds</div>' }, meta: { title: 'Adicionar feeds' } },
                { path: '/search', component: { template: '<div>Search</div>' }, meta: { title: 'Buscar' } },
                { path: '/favorites', component: { template: '<div>Favorites</div>' }, meta: { title: 'Favoritos' } },
                { path: '/read-later', component: { template: '<div>Read Later</div>' }, meta: { title: 'Ler mais tarde' } },
                { path: '/recently-read', component: { template: '<div>Recently Read</div>' }, meta: { title: 'Lidos recentemente' } }
            ]
        }
    ]
})

describe('AppLayout', () => {
    it('deve renderizar SideNav e MainContent', () => {
        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        const sideNav = wrapper.findComponent(SideNav)
        const mainContent = wrapper.findComponent(MainContent)

        expect(sideNav.exists()).toBe(true)
        expect(mainContent.exists()).toBe(true)
    })

    it('deve ter a estrutura de layout correta', () => {
        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        // Verifica se os componentes filhos estão presentes
        expect(wrapper.findComponent(SideNav).exists()).toBe(true)
        expect(wrapper.findComponent(MainContent).exists()).toBe(true)
    })

    it('deve integrar corretamente com vue-router', async () => {
        await router.push('/today')
        await router.isReady()

        const wrapper = mount(AppLayout, {
            global: {
                plugins: [router],
                stubs: ['RouterView']
            }
        })

        // Verifica se o router está funcionando
        expect(wrapper.vm.$route.path).toBe('/today')
    })
})
