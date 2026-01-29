<script setup lang="ts">
// Goal types
type GoalType = 'personal' | 'corporate' | 'advancement'
type GoalStatus = 'not_started' | 'in_progress' | 'at_risk' | 'complete'

interface KeyResult {
  id: string
  description: string
  target: number
  current: number
  unit: string
}

interface Goal {
  id: string
  type: GoalType
  title: string
  description?: string
  progress: number
  status: GoalStatus
  dueDate?: string
  keyResults?: KeyResult[]
  pillar?: string
}

// Mock data for development
const corporateGoals = ref<Goal[]>([
  {
    id: '1',
    type: 'corporate',
    title: 'Ship v2.0 by March 15',
    description: 'Complete all feature development and QA for the 2.0 release',
    progress: 60,
    status: 'in_progress',
    dueDate: '2026-03-15',
    keyResults: [
      { id: 'kr1', description: 'Feature development complete', target: 100, current: 75, unit: '%' },
      { id: 'kr2', description: 'QA sign-off', target: 100, current: 40, unit: '%' },
      { id: 'kr3', description: 'Documentation updated', target: 100, current: 50, unit: '%' }
    ]
  },
  {
    id: '2',
    type: 'corporate',
    title: 'Q1 Revenue Target',
    description: 'Achieve quarterly revenue goals through sales and renewals',
    progress: 35,
    status: 'at_risk',
    dueDate: '2026-03-31',
    keyResults: [
      { id: 'kr4', description: 'New deals closed', target: 500000, current: 175000, unit: '$' },
      { id: 'kr5', description: 'Renewals completed', target: 300000, current: 120000, unit: '$' }
    ]
  },
  {
    id: '3',
    type: 'corporate',
    title: 'Reduce Bug Backlog',
    description: 'Clear critical and high-priority bugs from the backlog',
    progress: 80,
    status: 'in_progress',
    dueDate: '2026-02-28',
    keyResults: [
      { id: 'kr6', description: 'Critical bugs resolved', target: 15, current: 13, unit: '' },
      { id: 'kr7', description: 'High priority bugs resolved', target: 40, current: 30, unit: '' }
    ]
  }
])

const advancementGoal = ref<Goal | null>(null)
const personalGoal = ref<Goal | null>(null)

// UI State
const showNewGoalModal = ref(false)
const showGoalDetail = ref(false)
const selectedGoal = ref<Goal | null>(null)
const activeTab = ref<'all' | 'corporate' | 'personal' | 'advancement'>('all')

// Open goal detail
const openGoalDetail = (goal: Goal) => {
  selectedGoal.value = goal
  showGoalDetail.value = true
}

// Handle goal update
const handleGoalUpdate = (updatedGoal: Goal) => {
  const index = corporateGoals.value.findIndex(g => g.id === updatedGoal.id)
  if (index !== -1) {
    corporateGoals.value[index] = updatedGoal
  }
}

// Handle goal delete
const handleGoalDelete = (goalId: string) => {
  corporateGoals.value = corporateGoals.value.filter(g => g.id !== goalId)
}

// Handle new goal creation
const handleGoalCreate = (newGoal: Goal) => {
  if (newGoal.type === 'corporate') {
    corporateGoals.value.push(newGoal)
  } else if (newGoal.type === 'personal') {
    personalGoal.value = newGoal
  } else if (newGoal.type === 'advancement') {
    advancementGoal.value = newGoal
  }
}

// Status colors and labels
const statusConfig = {
  not_started: { label: 'Not Started', color: 'text-white/50', bg: 'bg-white/10' },
  in_progress: { label: 'On Track', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  at_risk: { label: 'At Risk', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  complete: { label: 'Complete', color: 'text-emerald-400', bg: 'bg-emerald-500/20' }
}

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

// Get progress bar color based on status
const getProgressColor = (status: GoalStatus) => {
  if (status === 'at_risk') return 'from-amber-500 to-orange-500'
  if (status === 'complete') return 'from-emerald-500 to-green-500'
  return 'from-cyan-500 to-teal-500'
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-4xl font-semibold text-white mb-1 dark:drop-shadow-lg" style="font-family: 'Saol Display', serif;">Goals</h1>
        <p class="text-white/70 text-sm">Track your objectives and key results</p>
      </div>
      <UButton
        @click="showNewGoalModal = true"
        size="lg"
        class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold rounded-full flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-300 active:scale-95"
      >
        <UIcon name="i-lucide-plus" class="size-5" />
        New Goal
      </UButton>
    </header>

    <!-- Tab Filter -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="tab in ['all', 'corporate', 'personal', 'advancement'] as const"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          activeTab === tab
            ? 'bg-white/20 text-white border border-white/30'
            : 'text-white/60 hover:text-white hover:bg-white/10'
        ]"
      >
        {{ tab === 'all' ? 'All Goals' : tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </div>

    <!-- Corporate Goals Section -->
    <section v-if="activeTab === 'all' || activeTab === 'corporate'" class="space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 rounded-xl bg-cyan-500/20 backdrop-blur-sm">
          <UIcon name="i-lucide-target" class="size-5 text-cyan-400" />
        </div>
        <h2 class="text-xl font-bold text-white">Corporate Goals</h2>
        <span class="text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full">
          {{ corporateGoals.length }} active
        </span>
      </div>

      <!-- Goal Cards -->
      <div class="space-y-4">
        <div
          v-for="goal in corporateGoals"
          :key="goal.id"
          @click="openGoalDetail(goal)"
          class="glass p-6 rounded-2xl cursor-pointer hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-white">{{ goal.title }}</h3>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full font-medium',
                    statusConfig[goal.status].bg,
                    statusConfig[goal.status].color
                  ]"
                >
                  {{ statusConfig[goal.status].label }}
                </span>
              </div>
              <p class="text-sm text-white/60">{{ goal.description }}</p>
            </div>
            <div class="text-right">
              <span class="text-2xl font-bold text-white">{{ goal.progress }}%</span>
              <p v-if="goal.dueDate" class="text-xs text-white/50 mt-1">
                {{ getDaysRemaining(goal.dueDate) }}
              </p>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              :class="['h-full rounded-full bg-gradient-to-r transition-all duration-500', getProgressColor(goal.status)]"
              :style="{ width: `${goal.progress}%` }"
            />
          </div>

          <!-- Key Results -->
          <div v-if="goal.keyResults && goal.keyResults.length > 0" class="space-y-3">
            <p class="text-xs text-white/50 uppercase tracking-wider font-semibold">Key Results</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="kr in goal.keyResults"
                :key="kr.id"
                class="bg-white/5 rounded-xl p-3 border border-white/10"
              >
                <p class="text-xs text-white/70 mb-2">{{ kr.description }}</p>
                <div class="flex items-end justify-between">
                  <span class="text-lg font-bold text-white">
                    {{ formatValue(kr.current, kr.unit) }}
                  </span>
                  <span class="text-xs text-white/50">
                    / {{ formatValue(kr.target, kr.unit) }}
                  </span>
                </div>
                <div class="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"
                    :style="{ width: `${(kr.current / kr.target) * 100}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advancement Goals Section (Empty State) -->
    <section v-if="activeTab === 'all' || activeTab === 'advancement'" class="space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 rounded-xl bg-purple-500/20 backdrop-blur-sm">
          <UIcon name="i-lucide-rocket" class="size-5 text-purple-400" />
        </div>
        <h2 class="text-xl font-bold text-white">Advancement Goals</h2>
      </div>

      <div v-if="!advancementGoal" class="glass p-8 rounded-2xl border-2 border-dashed border-white/20">
        <div class="text-center">
          <UIcon name="i-lucide-compass" class="size-10 text-white/30 mx-auto mb-3" />
          <h3 class="text-lg font-semibold text-white/80 mb-2">Where are you headed?</h3>
          <p class="text-sm text-white/50 mb-4 max-w-md mx-auto">
            Set a big-picture career goal. This is private to you, but consider discussing it with your manager in your next 1:1.
          </p>
          <UButton
            variant="ghost"
            class="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <UIcon name="i-lucide-plus" class="size-4 mr-2" />
            Set Advancement Goal
          </UButton>
        </div>
      </div>
    </section>

    <!-- Personal Goals Section (Empty State) -->
    <section v-if="activeTab === 'all' || activeTab === 'personal'" class="space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="p-2 rounded-xl bg-teal-500/20 backdrop-blur-sm">
          <UIcon name="i-lucide-heart" class="size-5 text-teal-400" />
        </div>
        <h2 class="text-xl font-bold text-white">Personal Goals</h2>
        <span class="text-xs text-white/40 italic">Private • Syncs with phone app</span>
      </div>

      <div v-if="!personalGoal" class="glass p-8 rounded-2xl border-2 border-dashed border-white/20">
        <div class="text-center">
          <UIcon name="i-lucide-sparkles" class="size-10 text-white/30 mx-auto mb-3" />
          <h3 class="text-lg font-semibold text-white/80 mb-2">Inner development matters too</h3>
          <p class="text-sm text-white/50 mb-4 max-w-md mx-auto">
            Set a personal growth goal linked to Clarity, Agency, or Trust. Only you can see this.
          </p>
          <UButton
            variant="ghost"
            class="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <UIcon name="i-lucide-plus" class="size-4 mr-2" />
            Set Personal Goal
          </UButton>
        </div>
      </div>
    </section>

    <!-- Team Summary (Manager View) -->
    <section class="glass p-6 rounded-2xl">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <UIcon name="i-lucide-users" class="size-5 text-white/70" />
          </div>
          <h3 class="text-lg font-semibold text-white">Team Goal Progress</h3>
        </div>
        <UButton
          variant="ghost"
          size="sm"
          class="text-white/50 hover:text-white hover:bg-white/10"
        >
          View Team Details
          <UIcon name="i-lucide-arrow-right" class="size-4 ml-2" />
        </UButton>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-white/5 rounded-xl">
          <p class="text-3xl font-bold text-white mb-1">8</p>
          <p class="text-xs text-white/50">Team Members</p>
        </div>
        <div class="text-center p-4 bg-white/5 rounded-xl">
          <p class="text-3xl font-bold text-emerald-400 mb-1">12</p>
          <p class="text-xs text-white/50">Goals On Track</p>
        </div>
        <div class="text-center p-4 bg-white/5 rounded-xl">
          <p class="text-3xl font-bold text-amber-400 mb-1">3</p>
          <p class="text-xs text-white/50">Goals At Risk</p>
        </div>
        <div class="text-center p-4 bg-white/5 rounded-xl">
          <p class="text-3xl font-bold text-cyan-400 mb-1">67%</p>
          <p class="text-xs text-white/50">Avg Completion</p>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <GoalDetailModal
      v-model="showGoalDetail"
      :goal="selectedGoal"
      @update="handleGoalUpdate"
      @delete="handleGoalDelete"
    />
    
    <NewGoalModal
      v-model="showNewGoalModal"
      @create="handleGoalCreate"
    />
  </div>
</template>
