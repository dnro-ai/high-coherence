<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const collapsed = ref(false)

const navigation: NavigationMenuItem[][] = [[
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
  { label: 'Assessments', icon: 'i-lucide-clipboard-list', to: '/assessment' },
  { label: '360 Reviews', icon: 'i-lucide-users', to: '/reviews' },
  { label: 'Reports', icon: 'i-lucide-bar-chart-3', to: '/reports' },
  { label: 'AI Coach', icon: 'i-lucide-sparkles', to: '/coach' },
]]

const navItems = [
  { label: 'Dashboard', icon: '/dashboard-icon.svg', to: '/dashboard' },
  { label: 'Assessments', icon: '/assessments-icon.svg', to: '/assessment' },
  { label: '360 Reviews', icon: '/360-reviews-icon.svg', to: '/reviews' },
  { label: 'Reports', icon: '/reports-icon.svg', to: '/reports' },
  { label: 'AI Coach', icon: '/ai-coach-icon.svg', to: '/coach' },
]

const route = useRoute()

const isActive = (path: string) => {
  return route.path.startsWith(path)
}

const userMenu = [[
  { label: 'Settings', icon: 'i-lucide-settings', to: '/settings' },
  { label: 'Sign out', icon: 'i-lucide-log-out', click: () => navigateTo('/login') }
]]
</script>

<template>
  <div class="flex min-h-screen w-full bg-gradient-to-br from-blue-900 via-teal-700 to-cyan-600 text-white font-sans relative overflow-hidden">
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-cyan-400/20 rounded-full blur-3xl animate-blob" />
      <div class="absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-3xl animate-blob-delay" />
    </div>

    <!-- Sidebar -->
    <aside
      :class="[
        collapsed ? 'w-20' : 'w-64',
        'transition-all duration-300 border-r border-white/10 bg-black/10 backdrop-blur-2xl flex flex-col relative z-10'
      ]"
      style="box-shadow: 0 8px 32px 0 rgba(0,0,0,0.2);"
    >
      <!-- Header with Logo -->
      <div :class="collapsed ? 'p-4' : 'p-6'" class="flex items-center gap-2">
        <img
          v-if="!collapsed"
          src="/high-coherence-logo.png"
          alt="High Coherence"
          class="w-[70%] h-auto"
        />
        <button
          @click="collapsed = !collapsed"
          class="p-1 hover:bg-white/10 rounded-lg transition-all duration-200 mt-2.5 ml-5"
          :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <img
            src="/Sidebar_icon.svg"
            alt="Toggle sidebar"
            class="w-6 h-6 opacity-50 hover:opacity-80 transition-opacity"
          />
        </button>
      </div>

      <!-- Navigation -->
      <nav :class="collapsed ? 'px-2' : 'px-4'" class="flex-1 py-4 space-y-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group',
            collapsed ? 'justify-center' : '',
            isActive(item.to)
              ? 'bg-white/10 backdrop-blur-md text-white border border-white/20'
              : 'text-white/60 hover:bg-white/5 hover:text-white/90 border border-transparent'
          ]"
          :title="collapsed ? item.label : undefined"
        >
          <img
            :src="item.icon"
            :alt="item.label"
            :class="[
              'w-6 h-6 brightness-0 invert transition-all duration-300',
              isActive(item.to) ? 'nav-icon-active' : 'opacity-60 group-hover:opacity-90'
            ]"
          />
          <span v-if="!collapsed" class="text-sm font-medium">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- User Card -->
      <div v-if="!collapsed" class="p-6">
        <div class="user-card">
          <p class="text-xs text-cyan-300 font-bold uppercase mb-2 flex items-center gap-2">
            Alex Johnson
          </p>
          <p class="text-sm text-white/80 mb-4">Principal</p>
          <UDropdownMenu :items="userMenu">
            <button class="w-full py-2.5 bg-white/90 hover:bg-white text-teal-900 font-bold rounded-xl text-xs transition-all duration-300 shadow-[0_4px_16px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.3)] active:scale-95">
              Manage Account
            </button>
          </UDropdownMenu>
        </div>
      </div>

      <!-- Collapsed User Avatar -->
      <div v-if="collapsed" class="p-4">
        <UDropdownMenu :items="userMenu">
          <UAvatar text="AJ" size="sm" class="bg-gradient-to-br from-cyan-500 to-teal-500 cursor-pointer" />
        </UDropdownMenu>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 lg:p-12 overflow-y-auto relative z-10">
      <slot />
    </main>
  </div>
</template>
