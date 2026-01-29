<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const collapsed = ref(false)
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => colorMode.value === 'dark')

const navigation: NavigationMenuItem[][] = [[
  { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
  { label: 'Assessments', icon: 'i-lucide-clipboard-list', to: '/assessment' },
  { label: '360 Reviews', icon: 'i-lucide-users', to: '/reviews' },
  { label: 'Reports', icon: 'i-lucide-bar-chart-3', to: '/reports' },
  { label: 'AI Coach', icon: 'i-lucide-sparkles', to: '/coach' },
]]

const navItems = [
  { label: 'Dashboard', icon: '/dashboard-icon.svg', to: '/dashboard' },
  { label: 'Goals', icon: 'i-lucide-target', to: '/goals', isLucide: true },
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
  <div class="flex min-h-screen w-full font-sans relative overflow-hidden">
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div :class="['absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-3xl animate-blob', isDark ? 'bg-cyan-400/20' : 'bg-cyan-400/30']" />
      <div :class="['absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full blur-3xl animate-blob-delay', isDark ? 'bg-blue-500/20' : 'bg-teal-400/30']" />
    </div>

    <!-- Sidebar -->
    <aside
      :class="[
        collapsed ? 'w-20' : 'w-64',
        'transition-all duration-300 border-r flex flex-col relative z-10',
        isDark ? 'border-white/10 bg-black/10' : 'border-slate-200/50 bg-white/30'
      ]"
      style="backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); box-shadow: 0 8px 32px 0 rgba(0,0,0,0.1);"
    >
      <!-- Header with Logo -->
      <div :class="collapsed ? 'p-4' : 'p-6'" class="flex items-center justify-center">
        <img
          v-if="!collapsed"
          src="/high-coherence-logo.png"
          alt="High Coherence"
          :class="['w-[70%] h-auto', !isDark && 'brightness-0']"
        />
        <div
          v-else
          :class="['w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold', isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/10 text-cyan-600']"
        >
          C
        </div>
      </div>

      <!-- Navigation -->
      <nav :class="collapsed ? 'px-2' : 'px-4'" class="flex-1 py-4 space-y-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group border',
            collapsed ? 'justify-center' : '',
            isActive(item.to)
              ? isDark 
                ? 'bg-white/10 backdrop-blur-md text-white border-white/20'
                : 'bg-white/60 backdrop-blur-md text-slate-900 border-white/80'
              : isDark
                ? 'text-white/60 hover:bg-white/5 hover:text-white/90 border-transparent'
                : 'text-slate-600 hover:bg-white/40 hover:text-slate-900 border-transparent'
          ]"
          :title="collapsed ? item.label : undefined"
        >
          <UIcon
            v-if="item.isLucide"
            :name="item.icon"
            :class="[
              'size-6 transition-all duration-300',
              isActive(item.to) 
                ? 'text-cyan-500' 
                : isDark ? 'opacity-60 group-hover:opacity-90' : 'opacity-50 group-hover:opacity-80'
            ]"
          />
          <img
            v-else
            :src="item.icon"
            :alt="item.label"
            :class="[
              'w-6 h-6 transition-all duration-300',
              isDark ? 'brightness-0 invert' : 'brightness-0',
              isActive(item.to) ? 'nav-icon-active' : 'opacity-60 group-hover:opacity-90'
            ]"
          />
          <span v-if="!collapsed" class="text-sm font-medium">{{ item.label }}</span>
        </NuxtLink>
      </nav>


      <!-- User Card -->
      <div v-if="!collapsed" class="p-6">
        <div :class="[
          'p-5 rounded-2xl backdrop-blur-xl border',
          isDark 
            ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border-cyan-400/30' 
            : 'bg-white/60 border-white/80'
        ]" style="box-shadow: 0 8px 32px 0 rgba(6, 182, 212, 0.15);">
          <p :class="['text-xs font-bold uppercase mb-2 flex items-center gap-2', isDark ? 'text-cyan-300' : 'text-cyan-600']">
            Alex Johnson
          </p>
          <p :class="['text-sm mb-4', isDark ? 'text-white/80' : 'text-slate-600']">Principal</p>
          <UDropdownMenu :items="userMenu">
            <button :class="[
              'w-full py-2.5 font-bold rounded-xl text-xs transition-all duration-300 active:scale-95',
              isDark 
                ? 'bg-white/90 hover:bg-white text-teal-900 shadow-[0_4px_16px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.3)]'
                : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg hover:shadow-xl'
            ]">
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
    <main class="flex-1 pt-6 px-8 pb-8 lg:pt-8 lg:px-12 lg:pb-12 overflow-y-auto relative z-10">
      <!-- Top Icons Bar -->
      <div class="flex items-center gap-2 mb-4">
        <button
          @click="collapsed = !collapsed"
          :class="[
            'p-2 rounded-xl transition-all duration-300',
            isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-slate-900/10 text-slate-500'
          ]"
          :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <UIcon name="i-lucide-panel-left-close" class="size-5" />
        </button>
        <button
          @click="toggleTheme"
          :class="[
            'p-2 rounded-xl transition-all duration-300',
            isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-slate-900/10 text-slate-500'
          ]"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <UIcon
            :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
            class="size-5"
          />
        </button>
      </div>
      <slot />
    </main>
  </div>
</template>

