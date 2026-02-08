<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    // The @nuxtjs/supabase module handles the auth callback automatically
    // by detecting the hash fragment with access_token
    // We just need to wait briefly and redirect
    await new Promise(resolve => setTimeout(resolve, 1500))
    navigateTo('/dashboard')
  } catch (err: any) {
    errorMessage.value = err.message || 'Something went wrong during confirmation.'
    loading.value = false
  }
})
</script>

<template>
  <div class="w-full max-w-md text-center">
    <div class="glass p-8">
      <div v-if="loading" class="py-8">
        <UIcon name="i-lucide-loader-2" class="size-10 text-cyan-400 animate-spin mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-white mb-2">Confirming your account...</h2>
        <p class="text-white/70 text-sm">You'll be redirected to your dashboard shortly.</p>
      </div>

      <div v-else class="py-8">
        <div class="size-16 mx-auto rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-alert-circle" class="size-8 text-red-400" />
        </div>
        <h2 class="text-xl font-semibold text-white mb-3">Confirmation failed</h2>
        <p class="text-white/70 text-sm mb-6">{{ errorMessage }}</p>
        <NuxtLink to="/login" class="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
          Back to sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
