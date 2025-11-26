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
      <div class="size-14 mx-auto rounded-xl bg-blue-600 flex items-center justify-center mb-4">
        <UIcon name="i-lucide-activity" class="size-7 text-white" />
      </div>
      <h1 class="text-2xl font-bold text-gray-900">High Coherence</h1>
      <p class="text-gray-500 mt-1">Employee Development Platform</p>
    </div>

    <!-- Login Card -->
    <UCard class="bg-white shadow-lg" :ui="{ body: 'p-8' }">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Welcome back</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <UFormField label="Email" name="email">
          <UInput
            v-model="email"
            type="email"
            placeholder="you@company.com"
            icon="i-lucide-mail"
            size="lg"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter your password"
            icon="i-lucide-lock"
            size="lg"
          />
        </UFormField>

        <div class="flex items-center justify-between">
          <UCheckbox v-model="rememberMe" label="Remember me" />
          <NuxtLink to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-700">
            Forgot password?
          </NuxtLink>
        </div>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="loading"
        >
          Sign in
        </UButton>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gray-600 text-sm">
          Don't have an account?
          <NuxtLink to="/signup" class="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </UCard>

    <!-- SSO Options -->
    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-gray-50 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <UButton color="neutral" variant="outline" size="lg" class="bg-white">
          <UIcon name="i-simple-icons-google" class="size-5 mr-2" />
          Google
        </UButton>
        <UButton color="neutral" variant="outline" size="lg" class="bg-white">
          <UIcon name="i-simple-icons-microsoft" class="size-5 mr-2" />
          Microsoft
        </UButton>
      </div>
    </div>
  </div>
</template>
