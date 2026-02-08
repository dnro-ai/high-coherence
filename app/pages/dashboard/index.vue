<script setup lang="ts">
const { user } = useAuth()
const supabase = useSupabaseClient()

const profile = ref<{ full_name: string; role: string; department: string } | null>(null)

watch(user, async (u) => {
  if (u) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, role, department')
      .eq('id', u.id)
      .single()
    profile.value = data
  }
}, { immediate: true })

const userProfile = computed(() => ({
  name: profile.value?.full_name || user.value?.email || 'User',
  role: profile.value?.role || 'Member',
  department: profile.value?.department || ''
}))

const coherenceScore = 86
const catScores = {
  clarity: 90,
  agency: 81,
  trust: 53
}

// Demo stability value (would come from scoring system in production)
const stabilityScore = ref(82)
const showPulseCheck = ref(false)
const lastMood = ref('')

function openPulseCheck() {
  showPulseCheck.value = true
}

function handleMoodSubmit(moods: string[], cats: { c: number; a: number; t: number }[]) {
  lastMood.value = moods.join(', ')
  // In production, this would save to backend and update scores
}

const hexacoScores = [
  { trait: 'Honesty-Humility', score: 89, color: '#0c886f' }, // H - Teal
  { trait: 'Emotionality', score: 75, color: '#ff8a4a' },     // E - Orange
  { trait: 'Extraversion', score: 71, color: '#041d2a' },     // X - Navy
  { trait: 'Agreeableness', score: 85, color: '#ffa93f' },    // A - Amber
  { trait: 'Conscientiousness', score: 88, color: '#345d76' },// C - Blue-gray
  { trait: 'Openness', score: 74, color: '#5be8ff' }          // O - Cyan
]

const recentActivities = [
  { title: 'Assessment Completed', time: '5 months ago', icon: 'i-lucide-clock' },
  { title: '360 Review Submitted', time: '3 months ago', icon: 'i-lucide-users' },
  { title: 'Goal Achieved', time: '3 months ago', icon: 'i-lucide-check-circle-2' },
  { title: 'Progress Milestone', time: '3 months ago', icon: 'i-lucide-trending-up' }
]

const recommendations = [
  { title: 'Develop leadership communication' },
  { title: 'Enhance team collaboration skills' },
  { title: 'Focus on emotional intelligence' },
  { title: 'Set new quarterly objectives' }
]

const stats = {
  reviewsCompleted: { value: 20, progress: 80 },
  goalsProgress: { value: 41, progress: 41 }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-4xl font-semibold text-white mb-1 dark:drop-shadow-lg" style="font-family: 'Saol Display', serif;">Good Morning, {{ userProfile.name.split(' ')[0] }}</h1>
        <p class="text-white/70 text-sm">Track your progress and insights</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton
          @click="openPulseCheck"
          size="lg"
          class="px-6 py-3 bg-[#5be8ff] hover:bg-[#5be8ff]/80 text-[#041d2a] dark:bg-[#041d2a] dark:hover:bg-[#041d2a]/80 dark:text-white font-semibold rounded-full flex items-center gap-2 shadow-lg shadow-cyan-500/10 border border-white/10 transition-all duration-300 active:scale-95"
        >
          <UIcon name="i-lucide-zap" class="size-5 text-[#041d2a] dark:text-white" />
          Pulse Check
        </UButton>
        <UButton
          to="/coach"
          size="lg"
          class="px-6 py-3 bg-white/20 backdrop-blur-xl hover:bg-white/30 text-white font-semibold rounded-full flex items-center gap-2 border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-300 active:scale-95"
        >
          Talk to AI Coach
        </UButton>
      </div>
    </header>

    <!-- PulseCheck Modal -->
    <PulseCheck v-model="showPulseCheck" @submit="handleMoodSubmit" />

    <!-- Main Dashboard Grid - COHERENCE + C/A/T Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Side - COHERENCE Score + Archetype -->
      <div class="glass p-8">
        <div class="flex items-start gap-8">
          <!-- Large COHERENCE Circle -->
          <div class="flex flex-col items-center">
            <div class="metric-circle-large flex flex-col items-center justify-center mb-3">
              <UIcon name="i-lucide-crown" class="size-5 text-white/50 mb-1" />
              <span class="text-5xl font-bold text-white">{{ coherenceScore }}</span>
            </div>
            <span class="text-sm text-white/70 uppercase tracking-wider font-semibold mb-2">Coherence</span>
            <StabilityBadge :stability="stabilityScore" />
          </div>

          <!-- COHERENCE Description -->
          <div class="flex-1 space-y-4">
            <p class="text-white/80 text-sm leading-relaxed">
              Your overall Coherence is high but Trust is low, so this might be a good time to tackle deep work or initiation projects.
            </p>

            <!-- Archetype Section -->
            <div class="flex items-start gap-4 pt-4 border-t border-white/10">
              <img src="/strategist_icon.svg" alt="Strategist" class="w-16 h-16 rounded-xl brightness-0 invert" />
              <div class="flex-1">
                <p class="text-xs text-white/60 uppercase tracking-wider mb-1">You are currently embodying the</p>
                <h4 class="text-lg font-bold text-white mb-2">STRATEGIST <span class="text-xs font-normal text-cyan-400">in an INTEGRATED state.</span></h4>
                <p class="text-white/70 text-xs leading-relaxed">
                  This means that you will be particularly apt at big-picture work, including setting goals and planning contingencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - C/A/T Circles + Stats -->
      <div class="space-y-6">
        <!-- C/A/T Metric Circles -->
        <div class="flex justify-start gap-6">
          <div class="flex flex-col items-center">
            <div class="metric-circle w-20 h-20 mb-2">
              <UIcon name="i-lucide-crown" class="size-3.5 text-white/50 mb-0.5" />
              <span class="text-2xl font-bold text-white">{{ catScores.clarity }}</span>
            </div>
            <span class="text-xs text-white/70 uppercase tracking-wider">Clarity</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="metric-circle w-20 h-20 mb-2">
              <UIcon name="i-lucide-arrow-up" class="size-3.5 text-white/50 mb-0.5" />
              <span class="text-2xl font-bold text-white">{{ catScores.agency }}</span>
            </div>
            <span class="text-xs text-white/70 uppercase tracking-wider">Agency</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="metric-circle w-20 h-20 mb-2">
              <UIcon name="i-lucide-arrow-down" class="size-3.5 text-white/50 mb-0.5" />
              <span class="text-2xl font-bold text-white">{{ catScores.trust }}</span>
            </div>
            <span class="text-xs text-white/70 uppercase tracking-wider">Trust</span>
          </div>
        </div>

        <!-- Stats Cards Row -->
        <div class="grid grid-cols-2 gap-4">
          <div class="glass p-5 rounded-2xl">
            <p class="text-xs uppercase tracking-wider font-semibold text-white/70 mb-2">Reviews Completed</p>
            <h3 class="text-3xl font-bold text-white mb-2">{{ stats.reviewsCompleted.value }}</h3>
            <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-hexaco-h to-hexaco-o rounded-full transition-all duration-1000"
                :style="{ width: `${stats.reviewsCompleted.progress}%` }"
              />
            </div>
            <p class="text-xs text-white/50 mt-2">{{ stats.reviewsCompleted.progress }}% completion rate</p>
          </div>
          <div class="glass p-5 rounded-2xl">
            <p class="text-xs uppercase tracking-wider font-semibold text-white/70 mb-2">Goals Progress</p>
            <h3 class="text-3xl font-bold text-white mb-2">{{ stats.goalsProgress.value }}</h3>
            <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-hexaco-h to-hexaco-o rounded-full transition-all duration-1000"
                :style="{ width: `${stats.goalsProgress.progress}%` }"
              />
            </div>
            <p class="text-xs text-white/50 mt-2">On track for this quarter</p>
          </div>
        </div>
      </div>
    </div>

    <!-- HEXACO Profile Section -->
    <section class="glass p-8">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h3 class="text-xl font-bold text-white mb-1">Your COHERE Assessments</h3>
          <p class="text-white/70 text-sm">Personality assessment results</p>
        </div>
        <UButton variant="ghost" size="sm" class="text-white/50 hover:text-white hover:bg-white/10">
          <UIcon name="i-lucide-more-vertical" class="size-5" />
        </UButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div v-for="trait in hexacoScores" :key="trait.trait" class="space-y-3">
          <div class="flex justify-between items-center text-sm">
            <div class="flex items-center gap-3">
              <div
                class="w-4 h-4 rounded-lg"
                :style="{ backgroundColor: trait.color, boxShadow: `0 0 10px ${trait.color}80` }"
              />
              <span class="text-white/90 font-medium">{{ trait.trait }}</span>
            </div>
            <span class="text-white font-semibold">{{ trait.score }}%</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill transition-all duration-1000"
              :style="{
                width: `${trait.score}%`,
                background: `linear-gradient(to right, ${trait.color}, ${trait.color}cc)`
              }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Grid - Activity & Recommendations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Activity -->
      <section class="glass p-7">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Recent Activity</h3>
          <UIcon name="i-lucide-search" class="size-5 text-white/50 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div class="space-y-2">
          <div
            v-for="activity in recentActivities"
            :key="activity.title"
            class="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10"
          >
            <div class="flex items-center gap-4">
              <div class="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm text-hexaco-o border border-white/10">
                <UIcon :name="activity.icon" class="size-4" />
              </div>
              <div>
                <h4 class="text-sm font-medium text-white">{{ activity.title }}</h4>
                <p class="text-xs text-white/50 mt-0.5">{{ activity.time }}</p>
              </div>
            </div>
            <UIcon name="i-lucide-chevron-right" class="size-5 text-white/30 group-hover:text-hexaco-o transition-colors" />
          </div>
        </div>
      </section>

      <!-- Personalized Recommendations -->
      <section class="glass p-7">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Recommendations</h3>
          <UIcon name="i-lucide-message-square" class="size-5 text-white/50 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div class="space-y-2">
          <div
            v-for="rec in recommendations"
            :key="rec.title"
            class="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10"
          >
            <div class="flex items-center gap-4">
              <div class="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm text-white/60 border border-white/10">
                <UIcon name="i-lucide-file-text" class="size-4" />
              </div>
              <h4 class="text-sm font-medium text-white/90">{{ rec.title }}</h4>
            </div>
            <UIcon name="i-lucide-chevron-right" class="size-5 text-white/30 group-hover:text-cyan-400 transition-colors" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
