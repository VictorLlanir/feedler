import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// Mock do router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App,
      children: [
        { path: '', component: { template: '<div>Default Page</div>' } }
      ]
    }
  ]
})

describe('App', () => {
  it('deve renderizar router-view corretamente', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: ['RouterView']
      }
    })

    const routerView = wrapper.findComponent({ name: 'RouterView' })
    expect(routerView.exists()).toBe(true)
  })

  it('deve ter a estrutura HTML correta', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: ['RouterView']
      }
    })

    // Verifica se o template está sendo renderizado
    expect(wrapper.html()).toContain('<router-view')
  })
})
