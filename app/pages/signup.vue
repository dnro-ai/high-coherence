<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const { signup } = useAuth()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const success = ref(false)

const handleSignup = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  loading.value = true
  try {
    await signup(email.value, password.value, fullName.value)
    success.value = true
  } catch (err: any) {
    errorMessage.value = err.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
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

    <!-- Success State -->
    <div v-if="success" class="glass p-8 text-center">
      <div class="size-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6">
        <UIcon name="i-lucide-mail-check" class="size-8 text-white" />
      </div>
      <h2 class="text-xl font-semibold text-white mb-3">Check your email</h2>
      <p class="text-white/70 text-sm mb-6">
        We've sent a confirmation link to <strong class="text-white">{{ email }}</strong>. Click the link to activate your account.
      </p>
      <NuxtLink to="/login" class="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
        Back to sign in
      </NuxtLink>
    </div>

    <!-- Signup Form -->
    <div v-else class="glass p-8">
      <h2 class="text-xl font-semibold text-white mb-6">Create your account</h2>

      <div v-if="errorMessage" class="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm mb-5">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSignup" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-white/70 mb-2">Full name</label>
          <UInput
            v-model="fullName"
            type="text"
            placeholder="Your full name"
            icon="i-lucide-user"
            size="lg"
            required
            class="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
            :ui="{ base: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-cyan-500/50' }"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white/70 mb-2">Email</label>
          <UInput
            v-model="email"
            type="email"
            placeholder="you@company.com"
            icon="i-lucide-mail"
            size="lg"
            required
            class="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
            :ui="{ base: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-cyan-500/50' }"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white/70 mb-2">Password</label>
          <UInput
            v-model="password"
            type="password"
            placeholder="Create a password"
            icon="i-lucide-lock"
            size="lg"
            required
            class="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
            :ui="{ base: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-cyan-500/50' }"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white/70 mb-2">Confirm password</label>
          <UInput
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            icon="i-lucide-lock"
            size="lg"
            required
            class="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
            :ui="{ base: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-cyan-500/50' }"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_16px_0_rgba(6,182,212,0.3)] hover:shadow-[0_6px_20px_0_rgba(6,182,212,0.4)] active:scale-95 disabled:opacity-50"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <UIcon name="i-lucide-loader-2" class="size-5 animate-spin" />
            Creating account...
          </span>
          <span v-else>Create account</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-white/60 text-sm">
          Already have an account?
          <NuxtLink to="/login" class="text-cyan-400 hover:text-cyan-300 font-medium">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
