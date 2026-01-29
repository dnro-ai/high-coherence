<script setup lang="ts">
interface KeyResult {
  id: string
  description: string
  target: number
  current: number
  unit: string
}

interface Goal {
  id: string
  type: 'personal' | 'corporate' | 'advancement'
  title: string
  description?: string
  progress: number
  status: 'not_started' | 'in_progress' | 'at_risk' | 'complete'
  dueDate?: string
  keyResults?: KeyResult[]
  pillar?: string
}

const props = defineProps<{
  goal: Goal | null
}>()

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{
  (e: 'update', goal: Goal): void
  (e: 'delete', goalId: string): void
}>()

// Theme detection
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Local copy for editing
const editingGoal = ref<Goal | null>(null)

// Watch for goal changes and create local copy
watch(() => props.goal, (newGoal) => {
  if (newGoal) {
    editingGoal.value = JSON.parse(JSON.stringify(newGoal))
  }
}, { immediate: true })

// Status options
const statusOptions = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'in_progress', label: 'On Track' },
  { value: 'at_risk', label: 'At Risk' },
  { value: 'complete', label: 'Complete' }
]

// Format currency
const formatValue = (value: number, unit: string) => {
  if (unit === '$') return `$${value.toLocaleString()}`
  if (unit === '%') return `${value}%`
  return value.toString()
}

// Calculate days remaining
const getDaysRemaining = (dueDate: string) => {
  const due = new Date(dueDate)
  const now = new Date()
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return 'Overdue'
  if (diff === 0) return 'Due today'
  if (diff === 1) return '1 day left'
  return `${diff} days left`
}

// Update key result value
const updateKeyResult = (krId: string, field: 'current' | 'target', value: number) => {
  if (!editingGoal.value?.keyResults) return
  const kr = editingGoal.value.keyResults.find(k => k.id === krId)
  if (kr) {
    kr[field] = value
    // Recalculate overall progress
    const total = editingGoal.value.keyResults.reduce((sum, k) => sum + (k.current / k.target), 0)
    editingGoal.value.progress = Math.round((total / editingGoal.value.keyResults.length) * 100)
  }
}

// Save changes
const saveGoal = () => {
  if (editingGoal.value) {
    emit('update', editingGoal.value)
    open.value = false
  }
}

// Delete goal
const deleteGoal = () => {
  if (editingGoal.value) {
    emit('delete', editingGoal.value.id)
    open.value = false
  }
}

// Get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'at_risk': return 'text-amber-400'
    case 'complete': return 'text-emerald-400'
    case 'in_progress': return 'text-cyan-400'
    default: return 'text-white/50'
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{
      overlay: 'backdrop-blur-md bg-black/50',
      content: 'bg-transparent ring-0 shadow-none max-w-2xl w-full max-h-[90vh]'
    }"
  >
    <template #content>
      <div 
        v-if="editingGoal" 
        :class="[
          'backdrop-blur-xl border rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto',
          isDark 
            ? 'bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-white/20' 
            : 'bg-white/95 border-slate-200'
        ]"
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-6">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                {{ editingGoal.type }} Goal
              </span>
              <span
                v-if="editingGoal.dueDate"
                class="text-xs text-white/50"
              >
                • {{ getDaysRemaining(editingGoal.dueDate) }}
              </span>
            </div>
            <input
              v-model="editingGoal.title"
              class="text-2xl font-bold text-white bg-transparent border-none outline-none w-full focus:ring-0 p-0"
              placeholder="Goal title"
            />
          </div>
          <button
            @click="open = false"
            class="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <UIcon name="i-lucide-x" class="size-5 text-white/50" />
          </button>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 block">
            Description
          </label>
          <textarea
            v-model="editingGoal.description"
            rows="2"
            class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white/80 text-sm resize-none focus:outline-none focus:border-cyan-500/50"
            placeholder="What does success look like?"
          />
        </div>

        <!-- Status & Progress Row -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 block">
              Status
            </label>
            <select
              v-model="editingGoal.status"
              class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500/50"
            >
              <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                {{ status.label }}
              </option>
            </select>
          </div>
          <div>
            <label class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 block">
              Due Date
            </label>
            <input
              v-model="editingGoal.dueDate"
              type="date"
              class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        <!-- Overall Progress -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <label class="text-xs text-white/50 uppercase tracking-wider font-semibold">
              Overall Progress
            </label>
            <span class="text-lg font-bold text-white">{{ editingGoal.progress }}%</span>
          </div>
          <div class="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-500"
              :style="{ width: `${editingGoal.progress}%` }"
            />
          </div>
        </div>

        <!-- Key Results -->
        <div v-if="editingGoal.keyResults && editingGoal.keyResults.length > 0" class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <label class="text-xs text-white/50 uppercase tracking-wider font-semibold">
              Key Results
            </label>
            <button class="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              <UIcon name="i-lucide-plus" class="size-3" />
              Add Key Result
            </button>
          </div>
          
          <div class="space-y-3">
            <div
              v-for="kr in editingGoal.keyResults"
              :key="kr.id"
              class="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div class="flex items-start justify-between mb-3">
                <input
                  v-model="kr.description"
                  class="text-sm text-white bg-transparent border-none outline-none flex-1 focus:ring-0"
                  placeholder="Key result description"
                />
                <button class="p-1 hover:bg-white/10 rounded-lg ml-2">
                  <UIcon name="i-lucide-trash-2" class="size-4 text-white/30 hover:text-red-400" />
                </button>
              </div>
              
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <div class="flex items-center justify-between text-xs text-white/50 mb-1">
                    <span>Current</span>
                    <span>Target: {{ formatValue(kr.target, kr.unit) }}</span>
                  </div>
                  <input
                    :value="kr.current"
                    @input="updateKeyResult(kr.id, 'current', Number(($event.target as HTMLInputElement).value))"
                    type="number"
                    class="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div class="w-24">
                  <div class="text-xs text-white/50 mb-1">Progress</div>
                  <div class="text-lg font-bold text-cyan-400">
                    {{ Math.round((kr.current / kr.target) * 100) }}%
                  </div>
                </div>
              </div>
              
              <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-3">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"
                  :style="{ width: `${Math.min((kr.current / kr.target) * 100, 100)}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            @click="deleteGoal"
            class="text-sm text-red-400 hover:text-red-300 flex items-center gap-2"
          >
            <UIcon name="i-lucide-trash-2" class="size-4" />
            Delete Goal
          </button>
          
          <div class="flex gap-3">
            <UButton
              @click="open = false"
              variant="ghost"
              class="text-white/70 hover:text-white hover:bg-white/10"
            >
              Cancel
            </UButton>
            <UButton
              @click="saveGoal"
              class="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold rounded-xl px-6"
            >
              Save Changes
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
