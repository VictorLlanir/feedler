import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../../../layouts/components/AppHeader.vue'

describe('AppHeader', () => {
    it('deve renderizar o título passado como prop', () => {
        const wrapper = mount(AppHeader, {
            props: { title: 'Página de Teste' }
        })

        const title = wrapper.find('h3')
        expect(title.text()).toBe('Página de Teste')
    })

    it('deve renderizar o subtítulo estático', () => {
        const wrapper = mount(AppHeader, {
            props: { title: 'Test' }
        })

        const subtitle = wrapper.find('small')
        expect(subtitle.text()).toBe('Posts de todos os feeds para hoje')
    })

    it('deve renderizar o campo de pesquisa', () => {
        const wrapper = mount(AppHeader, {
            props: { title: 'Test' }
        })

        const input = wrapper.find('input[type="text"]')
        expect(input.exists()).toBe(true)
        expect(input.attributes('placeholder')).toBe('Pesquisar')
        expect(input.classes()).toContain('app-header__actions__input')
    })

    it('deve renderizar o botão de refresh com ícone correto', () => {
        const wrapper = mount(AppHeader, {
            props: { title: 'Test' }
        })

        const refreshButton = wrapper.find('.app-header__actions__button-icon')
        expect(refreshButton.exists()).toBe(true)

        const img = refreshButton.find('img')
        expect(img.attributes('src')).toBe('/src/assets/icons/refresh.svg')
        expect(img.attributes('alt')).toBe('Atualizar')
    })

    it('deve renderizar o botão "Adicionar feed"', () => {
        const wrapper = mount(AppHeader, {
            props: { title: 'Test' }
        })

        const addButton = wrapper.find('.app-header__actions__button')
        expect(addButton.exists()).toBe(true)
        expect(addButton.text()).toBe('Adicionar feed')
    })

    it('deve ter a estrutura de layout correta', () => {
        const wrapper = mount(AppHeader, {
            props: { title: 'Test' }
        })

        const header = wrapper.find('.app-header')
        expect(header.classes()).toContain('app-header')

        const titleSection = wrapper.find('.app-header__title')
        expect(titleSection.exists()).toBe(true)

        const actionsSection = wrapper.find('.app-header__actions')
        expect(actionsSection.exists()).toBe(true)
    })

    it('deve aplicar estilos corretos aos elementos', () => {
        const wrapper = mount(AppHeader, {
            props: { title: 'Test' }
        })

        const header = wrapper.find('.app-header')
        expect(header.classes()).toContain('app-header')

        const input = wrapper.find('input')
        expect(input.classes()).toContain('app-header__actions__input')
    })
})
