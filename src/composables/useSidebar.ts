import { ref, computed, onMounted, onUnmounted } from 'vue'

const isCollapsed = ref(false)
const isMobile = ref(false)
const isDrawerOpen = ref(false)

export function useSidebar() {
    const checkIsMobile = () => {
        isMobile.value = window.innerWidth <= 768
        if (isMobile.value) {
            isCollapsed.value = true
            isDrawerOpen.value = false
        } else {
            isCollapsed.value = false
            isDrawerOpen.value = true
        }
    }

    const toggleSidebar = () => {
        if (isMobile.value) {
            isDrawerOpen.value = !isDrawerOpen.value
        } else {
            isCollapsed.value = !isCollapsed.value
        }
    }

    const closeDrawer = () => {
        if (isMobile.value) {
            isDrawerOpen.value = false
        }
    }

    const openDrawer = () => {
        if (isMobile.value) {
            isDrawerOpen.value = true
        }
    }

    const isVisible = computed(() => {
        if (isMobile.value) {
            return isDrawerOpen.value
        }
        return !isCollapsed.value
    })

    const sidebarClasses = computed(() => {
        return {
            'sidebar-collapsed': isCollapsed.value,
            'sidebar-mobile': isMobile.value,
            'sidebar-drawer-open': isMobile.value && isDrawerOpen.value,
            'sidebar-drawer-closed': isMobile.value && !isDrawerOpen.value
        }
    })

    const overlayClasses = computed(() => {
        return {
            'sidebar-overlay': true,
            'sidebar-overlay-visible': isMobile.value && isDrawerOpen.value
        }
    })

    onMounted(() => {
        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkIsMobile)
    })

    return {
        isCollapsed,
        isMobile,
        isDrawerOpen,
        isVisible,
        sidebarClasses,
        overlayClasses,
        toggleSidebar,
        closeDrawer,
        openDrawer
    }
}
