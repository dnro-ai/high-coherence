<script setup lang="ts">
const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{
  (e: 'create', goal: any): void
}>()

// Form state
const goalType = ref<'corporate' | 'personal' | 'advancement'>('corporate')
const title = ref('')
const description = ref('')
const dueDate = ref('')
const keyResults = ref([
  { id: 'kr-1', description: '', target: 100, unit: '%' }
])

// Goal type descriptions
const typeDescriptions = {
  corporate: 'Work outcomes aligned with company objectives. Visible to your manager.',
  personal: 'Inner development work. Private to you, syncs with phone app.',
  advancement: 'Career trajectory and aspirations. Private, discuss in 1:1s.'
}

// Unit options for key results
const unitOptions = [
  { value: '%', label: 'Percent' },
  { value: '$', label: 'Currency' },
  { value: '', label: 'Number' }
]

// Add key result
const addKeyResult = () => {
  keyResults.value.push({
    id: `kr-${Date.now()}`,
    description: '',
    target: 100,
    unit: '%'
  })
}

// Remove key result
const removeKeyResult = (id: string) => {
  keyResults.value = keyResults.value.filter(kr => kr.id !== id)
}

// Create goal
const createGoal = () => {
  const goal = {
    id: `goal-${Date.now()}`,
    type: goalType.value,
    title: title.value,
    description: description.value,
    progress: 0,
    status: 'not_started' as const,
    dueDate: dueDate.value || undefined,
    keyResults: goalType.value === 'corporate' 
      ? keyResults.value.filter(kr => kr.description).map(kr => ({
          ...kr,
          current: 0
        }))
      : undefined
  }
  
  emit('create', goal)
  resetForm()
  open.value = false
}

// Reset form
const resetForm = () => {
  title.value = ''
  description.value = ''
  dueDate.value = ''
  goalType.value = 'corporate'
  keyResults.value = [{ id: 'kr-1', description: '', target: 100, unit: '%' }]
}

// Pillar options for personal goals
const pillarOptions = [
  { value: 'clarity', label: 'Clarity', icon: 'i-lucide-brain' },
  { value: 'agency', label: 'Agency', icon: 'i-lucide-zap' },
  { value: 'trust', label: 'Trust', icon: 'i-lucide-heart' }
]

const selectedPillar = ref('clarity')
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{
      overlay: 'backdrop-blur-md bg-black/50',
      content: 'bg-transparent ring-0 shadow-none max-w-2xl w-full'
    }"
  >
    <template #content>
      <div class="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-white mb-1">New Goal</h2>
          <p class="text-sm text-white/50">Set a clear objective to track your progress</p>
        </div>
        <button
          @click="open = false"
          class="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <UIcon name="i-lucide-x" class="size-5 text-white/50" />
        </button>
      </div>

      <!-- Goal Type Selection -->
      <div class="mb-6">
        <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-3 block">
          Goal Type
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="type in ['corporate', 'personal', 'advancement'] as const"
            :key="type"
            @click="goalType = type"
            :class="[
              'p-4 rounded-xl border transition-all duration-200 text-left',
              goalType === type
                ? 'bg-cyan-500/20 border-cyan-500/50'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            ]"
          >
            <div class="flex items-center gap-2 mb-2">
              <UIcon
                :name="type === 'corporate' ? 'i-lucide-target' : type === 'personal' ? 'i-lucide-heart' : 'i-lucide-rocket'"
                :class="[
                  'size-5',
                  goalType === type ? 'text-cyan-400' : 'text-white/50'
                ]"
              />
              <span :class="['text-sm font-semibold', goalType === type ? 'text-white' : 'text-white/70']">
                {{ type.charAt(0).toUpperCase() + type.slice(1) }}
              </span>
            </div>
            <p class="text-xs text-white/40 leading-relaxed">
              {{ type === 'corporate' ? 'Visible to manager' : 'Private to you' }}
            </p>
          </button>
        </div>
        <p class="text-xs text-white/40 mt-2 italic">
          {{ typeDescriptions[goalType] }}
        </p>
      </div>

      <!-- Title -->
      <div class="mb-4">
        <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 block">
          Goal Title
        </label>
        <input
          v-model="title"
          type="text"
          class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500/50 placeholder:text-white/30"
          placeholder="e.g., Ship v2.0 by March 15"
        />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 block">
          Description
        </label>
        <textarea
          v-model="description"
          rows="2"
          class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white/80 text-sm resize-none focus:outline-none focus:border-cyan-500/50 placeholder:text-white/30"
          placeholder="What does success look like?"
        />
      </div>

      <!-- Due Date -->
      <div class="mb-6">
        <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 block">
          Due Date
        </label>
        <input
          v-model="dueDate"
          type="date"
          class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500/50"
        />
      </div>

      <!-- Pillar Selection (Personal Goals Only) -->
      <div v-if="goalType === 'personal'" class="mb-6">
        <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-3 block">
          Linked Pillar
        </label>
        <div class="flex gap-3">
          <button
            v-for="pillar in pillarOptions"
            :key="pillar.value"
            @click="selectedPillar = pillar.value"
            :class="[
              'flex-1 p-3 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2',
              selectedPillar === pillar.value
                ? 'bg-teal-500/20 border-teal-500/50'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            ]"
          >
            <UIcon
              :name="pillar.icon"
              :class="[
                'size-5',
                selectedPillar === pillar.value ? 'text-teal-400' : 'text-white/50'
              ]"
            />
            <span :class="['text-sm font-medium', selectedPillar === pillar.value ? 'text-white' : 'text-white/70']">
              {{ pillar.label }}
            </span>
          </button>
        </div>
      </div>

      <!-- Key Results (Corporate Goals Only) -->
      <div v-if="goalType === 'corporate'" class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <label class="text-xs text-white/50 uppercase tracking-wider font-semibold">
            Key Results
          </label>
          <button
            @click="addKeyResult"
            class="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <UIcon name="i-lucide-plus" class="size-3" />
            Add Key Result
          </button>
        </div>
        
        <div class="space-y-3">
          <div
            v-for="(kr, index) in keyResults"
            :key="kr.id"
            class="bg-white/5 rounded-xl p-4 border border-white/10"
          >
            <div class="flex items-start gap-3">
              <span class="text-xs text-white/40 font-semibold mt-3">KR{{ index + 1 }}</span>
              <div class="flex-1 space-y-3">
                <input
                  v-model="kr.description"
                  type="text"
                  class="w-full bg-transparent border-b border-white/10 pb-2 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-white/30"
                  placeholder="e.g., Complete all feature development"
                />
                <div class="flex gap-3">
                  <div class="flex-1">
                    <label class="text-xs text-white/40 mb-1 block">Target</label>
                    <input
                      v-model="kr.target"
                      type="number"
                      class="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div class="w-32">
                    <label class="text-xs text-white/40 mb-1 block">Unit</label>
                    <select
                      v-model="kr.unit"
                      class="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                    >
                      <option v-for="unit in unitOptions" :key="unit.value" :value="unit.value">
                        {{ unit.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                v-if="keyResults.length > 1"
                @click="removeKeyResult(kr.id)"
                class="p-1 hover:bg-white/10 rounded-lg mt-2"
              >
                <UIcon name="i-lucide-x" class="size-4 text-white/30 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4 border-t border-white/10">
        <UButton
          @click="open = false"
          variant="ghost"
          class="text-white/70 hover:text-white hover:bg-white/10"
        >
          Cancel
        </UButton>
        <UButton
          @click="createGoal"
          :disabled="!title"
          class="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold rounded-xl px-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Goal
        </UButton>
      </div>
      </div>
    </template>
  </UModal>
</template>
