<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 via-teal-700 to-cyan-600 relative overflow-hidden">
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-cyan-400/20 rounded-full blur-3xl animate-blob" />
      <div class="absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] bg-blue-500/20 rounded-full blur-3xl animate-blob-delay" />
    </div>
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
