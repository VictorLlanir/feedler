import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import MenuItem from '../../../layouts/components/MenuItem.vue'

// Mock do router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/test', component: { template: '<div>Test</div>' } }
    ]
})

describe('MenuItem', () => {
    const defaultProps = {
        text: 'Test Item',
        icon: 'test.svg',
        link: '/test',
        isActive: false
    }

    it('deve renderizar corretamente com props básicas', () => {
        const wrapper = mount(MenuItem, {
            props: defaultProps,
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const link = wrapper.findComponent({ name: 'RouterLink' })
        expect(link.exists()).toBe(true)
        expect(link.props('to')).toBe('/test')
    })

    it('deve exibir o texto correto', () => {
        const wrapper = mount(MenuItem, {
            props: defaultProps,
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const span = wrapper.find('span')
        expect(span.text()).toBe('Test Item')
    })

    it('deve renderizar o ícone com caminho correto', () => {
        const wrapper = mount(MenuItem, {
            props: defaultProps,
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe('/src/assets/icons/test.svg')
        expect(img.attributes('alt')).toBe('Test Item')
    })

    it('deve aplicar classe ativa quando isActive é true', () => {
        const wrapper = mount(MenuItem, {
            props: { ...defaultProps, isActive: true },
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const link = wrapper.findComponent({ name: 'RouterLink' })
        expect(link.classes()).toContain('is-active')
    })

    it('não deve aplicar classe ativa quando isActive é false', () => {
        const wrapper = mount(MenuItem, {
            props: { ...defaultProps, isActive: false },
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const link = wrapper.findComponent({ name: 'RouterLink' })
        expect(link.classes()).not.toContain('is-active')
    })

    it('deve ter a estrutura HTML correta', () => {
        const wrapper = mount(MenuItem, {
            props: defaultProps,
            global: {
                plugins: [router],
                stubs: ['RouterLink']
            }
        })

        const li = wrapper.find('li')
        expect(li.classes()).toContain('menu-item')

        const link = wrapper.findComponent({ name: 'RouterLink' })
        const img = wrapper.find('img')
        const span = wrapper.find('span')

        expect(link.exists()).toBe(true)
        expect(img.exists()).toBe(true)
        expect(span.exists()).toBe(true)
    })
})
