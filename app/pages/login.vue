<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  navigateTo('/dashboard')
}
</script>

<template>
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <img
        src="/HighCoherence_logo.svg"
        alt="High Coherence"
        class="h-12 mx-auto mb-4"
      />
      <p class="text-white/70 mt-1">Employee Development Platform</p>
    </div>

    <!-- Login Card -->
    <div class="glass p-8">
      <h2 class="text-xl font-semibold text-white mb-6">Welcome back</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-white/70 mb-2">Email</label>
          <UInput
            v-model="email"
            type="email"
            placeholder="you@company.com"
            icon="i-lucide-mail"
            size="lg"
            class="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
            :ui="{ base: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-cyan-500/50' }"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white/70 mb-2">Password</label>
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter your password"
            icon="i-lucide-lock"
            size="lg"
            class="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
            :ui="{ base: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-cyan-500/50' }"
          />
        </div>

        <div class="flex items-center justify-between">
          <UCheckbox v-model="rememberMe" label="Remember me" class="text-white/70" />
          <NuxtLink to="/forgot-password" class="text-sm text-cyan-400 hover:text-cyan-300">
            Forgot password?
          </NuxtLink>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_16px_0_rgba(6,182,212,0.3)] hover:shadow-[0_6px_20px_0_rgba(6,182,212,0.4)] active:scale-95 disabled:opacity-50"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <UIcon name="i-lucide-loader-2" class="size-5 animate-spin" />
            Signing in...
          </span>
          <span v-else>Sign in</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-white/60 text-sm">
          Don't have an account?
          <NuxtLink to="/signup" class="text-cyan-400 hover:text-cyan-300 font-medium">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- SSO Options -->
    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-white/20"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-transparent text-white/50">Or continue with</span>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <button class="flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300">
          <UIcon name="i-simple-icons-google" class="size-5" />
          Google
        </button>
        <button class="flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300">
          <UIcon name="i-simple-icons-microsoft" class="size-5" />
          Microsoft
        </button>
      </div>
    </div>
  </div>
</template>
