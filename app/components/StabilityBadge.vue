<script setup lang="ts">
import { getStabilityLevel, type StabilityLevel } from '~/composables/useCoherenceScoring'

const props = defineProps<{
  stability: number
}>()

const stabilityLevel = computed<StabilityLevel>(() => getStabilityLevel(props.stability))

const config = computed(() => {
  switch (stabilityLevel.value) {
    case 'Stable':
      return {
        icon: 'i-lucide-shield-check',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20',
        borderColor: 'border-emerald-400/30'
      }
    case 'Variable':
      return {
        icon: 'i-lucide-activity',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/20',
        borderColor: 'border-amber-400/30'
      }
    case 'Volatile':
      return {
        icon: 'i-lucide-alert-triangle',
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/20',
        borderColor: 'border-rose-400/30'
      }
  }
})
</script>

<template>
  <div
    :class="[
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm',
      config.bgColor,
      config.borderColor,
      config.color
    ]"
  >
    <UIcon :name="config.icon" class="size-3.5" />
    <span>{{ stabilityLevel }}</span>
  </div>
</template>
