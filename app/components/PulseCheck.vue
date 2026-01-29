<script setup lang="ts">
import { MOOD_CATEGORIES, MOOD_CAT_MAP } from '~/composables/useCoherenceScoring'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submit': [moods: string[], cats: { c: number; a: number; t: number }[]]
}>()

// Theme detection
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const selectedMoods = ref<string[]>([])

const quadrantConfig = {
  highNegative: {
    icon: 'i-lucide-flame',
    label: 'High Energy −',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-400/20',
    hoverBg: 'hover:bg-orange-500/20',
    iconColor: 'text-orange-400',
    selectedBg: 'bg-orange-400',
  },
  highPositive: {
    icon: 'i-lucide-zap',
    label: 'High Energy +',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-400/20',
    hoverBg: 'hover:bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    selectedBg: 'bg-emerald-400',
  },
  lowNegative: {
    icon: 'i-lucide-droplets',
    label: 'Low Energy −',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-400/20',
    hoverBg: 'hover:bg-blue-500/20',
    iconColor: 'text-blue-400',
    selectedBg: 'bg-blue-400',
  },
  lowPositive: {
    icon: 'i-lucide-heart',
    label: 'Low Energy +',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-400/20',
    hoverBg: 'hover:bg-teal-500/20',
    iconColor: 'text-teal-400',
    selectedBg: 'bg-teal-400',
  },
}

function handleMoodClick(mood: string) {
  if (selectedMoods.value.includes(mood)) {
    selectedMoods.value = selectedMoods.value.filter(m => m !== mood)
  } else if (selectedMoods.value.length < 2) {
    selectedMoods.value = [...selectedMoods.value, mood]
  }
}

function handleSubmit() {
  if (selectedMoods.value.length === 0) return
  const cats = selectedMoods.value.map(mood => MOOD_CAT_MAP[mood]).filter((cat): cat is { c: number; a: number; t: number } => !!cat)
  emit('submit', selectedMoods.value, cats)
  selectedMoods.value = []
  emit('update:modelValue', false)
}

function handleClose(value?: boolean) {
  // Handle both direct button clicks (no arg) and UModal close events (false)
  if (value !== true) {
    selectedMoods.value = []
    emit('update:modelValue', false)
  }
}

function closeModal() {
  selectedMoods.value = []
  emit('update:modelValue', false)
}

function isSelected(mood: string): boolean {
  return selectedMoods.value.includes(mood)
}

const selectionText = computed(() => {
  if (selectedMoods.value.length === 0) return 'No moods selected'
  return `Selected: ${selectedMoods.value.join(', ')}`
})
</script>

<template>
  <UModal 
    :open="modelValue" 
    @update:open="handleClose"
    :ui="{
      overlay: 'bg-black/50 backdrop-blur-sm',
      content: 'max-w-3xl w-full bg-transparent ring-0 shadow-none rounded-none p-0 sm:p-0',
    }"
  >
    <template #content>
      <div 
        :class="[
          'backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden',
          isDark 
            ? 'bg-[#041d2a] border-white/10' 
            : 'bg-white/95 border-slate-200'
        ]"
      >
        <!-- Header -->
        <div 
          :class="[
            'flex items-center justify-between px-6 py-4 border-b',
            isDark ? 'border-white/10' : 'border-slate-200'
          ]"
        >
          <div>
            <h2 :class="['text-xl font-bold', isDark ? 'text-white' : 'text-slate-900']">Pulse Check</h2>
            <p :class="['text-sm mt-1', isDark ? 'text-white/60' : 'text-slate-500']">
              Select up to 2 moods that describe how you're feeling. Tap again to deselect.
            </p>
          </div>
          <button
            @click="closeModal"
            :class="[
              'p-2 rounded-xl transition-colors',
              isDark ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
            ]"
          >
            <UIcon name="i-lucide-x" class="size-5" />
          </button>
        </div>

        <!-- Mood Grid - Order: High Neg, High Pos, Low Neg, Low Pos -->
        <div class="px-6 py-4 grid grid-cols-2 gap-3">
          <!-- High Negative -->
          <div :class="['p-3 rounded-xl border', quadrantConfig.highNegative.bgColor, quadrantConfig.highNegative.borderColor]">
            <div :class="['flex items-center gap-2 mb-3', quadrantConfig.highNegative.iconColor]">
              <UIcon :name="quadrantConfig.highNegative.icon" class="size-4" />
              <span class="text-xs font-semibold uppercase tracking-wider">{{ quadrantConfig.highNegative.label }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="mood in MOOD_CATEGORIES.highNegative"
                :key="mood"
                @click="handleMoodClick(mood)"
                :class="[
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isSelected(mood)
                    ? `${quadrantConfig.highNegative.selectedBg} text-gray-900 scale-105 shadow-lg`
                    : isDark ? `bg-white/10 text-white/80 ${quadrantConfig.highNegative.hoverBg} hover:text-white` : `bg-slate-100 text-slate-600 ${quadrantConfig.highNegative.hoverBg} hover:text-slate-900`
                ]"
              >
                {{ mood }}
              </button>
            </div>
          </div>

          <!-- High Positive -->
          <div :class="['p-3 rounded-xl border', quadrantConfig.highPositive.bgColor, quadrantConfig.highPositive.borderColor]">
            <div :class="['flex items-center gap-2 mb-3', quadrantConfig.highPositive.iconColor]">
              <UIcon :name="quadrantConfig.highPositive.icon" class="size-4" />
              <span class="text-xs font-semibold uppercase tracking-wider">{{ quadrantConfig.highPositive.label }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="mood in MOOD_CATEGORIES.highPositive"
                :key="mood"
                @click="handleMoodClick(mood)"
                :class="[
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isSelected(mood)
                    ? `${quadrantConfig.highPositive.selectedBg} text-gray-900 scale-105 shadow-lg`
                    : isDark ? `bg-white/10 text-white/80 ${quadrantConfig.highPositive.hoverBg} hover:text-white` : `bg-slate-100 text-slate-600 ${quadrantConfig.highPositive.hoverBg} hover:text-slate-900`
                ]"
              >
                {{ mood }}
              </button>
            </div>
          </div>

          <!-- Low Negative -->
          <div :class="['p-3 rounded-xl border', quadrantConfig.lowNegative.bgColor, quadrantConfig.lowNegative.borderColor]">
            <div :class="['flex items-center gap-2 mb-3', quadrantConfig.lowNegative.iconColor]">
              <UIcon :name="quadrantConfig.lowNegative.icon" class="size-4" />
              <span class="text-xs font-semibold uppercase tracking-wider">{{ quadrantConfig.lowNegative.label }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="mood in MOOD_CATEGORIES.lowNegative"
                :key="mood"
                @click="handleMoodClick(mood)"
                :class="[
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isSelected(mood)
                    ? `${quadrantConfig.lowNegative.selectedBg} text-gray-900 scale-105 shadow-lg`
                    : isDark ? `bg-white/10 text-white/80 ${quadrantConfig.lowNegative.hoverBg} hover:text-white` : `bg-slate-100 text-slate-600 ${quadrantConfig.lowNegative.hoverBg} hover:text-slate-900`
                ]"
              >
                {{ mood }}
              </button>
            </div>
          </div>

          <!-- Low Positive -->
          <div :class="['p-3 rounded-xl border', quadrantConfig.lowPositive.bgColor, quadrantConfig.lowPositive.borderColor]">
            <div :class="['flex items-center gap-2 mb-3', quadrantConfig.lowPositive.iconColor]">
              <UIcon :name="quadrantConfig.lowPositive.icon" class="size-4" />
              <span class="text-xs font-semibold uppercase tracking-wider">{{ quadrantConfig.lowPositive.label }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="mood in MOOD_CATEGORIES.lowPositive"
                :key="mood"
                @click="handleMoodClick(mood)"
                :class="[
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isSelected(mood)
                    ? `${quadrantConfig.lowPositive.selectedBg} text-gray-900 scale-105 shadow-lg`
                    : isDark ? `bg-white/10 text-white/80 ${quadrantConfig.lowPositive.hoverBg} hover:text-white` : `bg-slate-100 text-slate-600 ${quadrantConfig.lowPositive.hoverBg} hover:text-slate-900`
                ]"
              >
                {{ mood }}
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 flex items-center justify-between">
          <span :class="['text-sm', isDark ? 'text-white/50' : 'text-slate-500']">{{ selectionText }}</span>
          <div class="flex items-center gap-3">
            <button
              @click="closeModal"
              :class="['px-4 py-2 text-sm transition-colors', isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900']"
            >
              Cancel
            </button>
            <button
              @click="handleSubmit"
              :disabled="selectedMoods.length === 0"
              :class="[
                'px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                selectedMoods.length > 0
                  ? 'bg-[#5be8ff] hover:bg-[#5be8ff]/80 text-[#041d2a] dark:bg-[#041d2a] dark:hover:bg-[#041d2a]/80 dark:text-white shadow-lg hover:shadow-cyan-500/25 active:scale-95'
                  : isDark ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              ]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
