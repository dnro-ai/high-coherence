<script setup lang="ts">
const activeTab = ref('employees')

// Employee data for admin view
const employees = ref([
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Engineer',
    department: 'Engineering',
    reviewsReceived: 5,
    avgScore: 4.2,
    completedReviews: true,
    canBePromoted: true,
    topStrength: 'Technical Excellence',
    improvementArea: 'Delegation'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Product Manager',
    department: 'Product',
    reviewsReceived: 4,
    avgScore: 4.5,
    completedReviews: true,
    canBePromoted: true,
    topStrength: 'Cross-team Collaboration',
    improvementArea: 'Time Management'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Designer',
    department: 'Design',
    reviewsReceived: 3,
    avgScore: 3.8,
    completedReviews: false,
    canBePromoted: false,
    topStrength: 'Creative Problem Solving',
    improvementArea: 'Communication'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Sales Lead',
    department: 'Sales',
    reviewsReceived: 6,
    avgScore: 4.0,
    completedReviews: true,
    canBePromoted: false,
    topStrength: 'Client Relations',
    improvementArea: 'Documentation'
  },
])

// Send invite modal
const showInviteModal = ref(false)
const selectedEmployee = ref<typeof employees.value[0] | null>(null)
const inviteForm = ref({
  emails: '',
  reviewType: 'peer'
})
const sendingInvites = ref(false)

const openInviteModal = (employee: typeof employees.value[0]) => {
  selectedEmployee.value = employee
  inviteForm.value = { emails: '', reviewType: 'peer' }
  showInviteModal.value = true
}

const toast = useToast()

const sendInvites = async () => {
  if (!selectedEmployee.value || !inviteForm.value.emails) return

  sendingInvites.value = true
  const emails = inviteForm.value.emails.split(',').map(e => e.trim()).filter(e => e)

  // Simulate sending - in production this would call the API
  await new Promise(resolve => setTimeout(resolve, 1500))

  toast.add({
    title: 'Invites Sent',
    description: `Review invites sent to ${emails.length} recipient${emails.length > 1 ? 's' : ''} for ${selectedEmployee.value.name}`,
    color: 'success',
    icon: 'i-lucide-check-circle'
  })

  sendingInvites.value = false
  showInviteModal.value = false
}

// Detailed results modal
const showResultsModal = ref(false)
const selectedEmployeeResults = ref<typeof employees.value[0] | null>(null)

const mockDetailedResults = {
  performance: { avg: 4.2, breakdown: [4, 5, 4, 4, 4] },
  collaboration: { avg: 4.5, breakdown: [5, 4, 5, 4, 5] },
  leadership: { avg: 3.8, breakdown: [4, 3, 4, 4, 4] },
  comments: {
    strengths: [
      'Excellent technical skills and problem-solving ability',
      'Always willing to help team members',
      'Delivers high-quality work consistently'
    ],
    improvements: [
      'Could delegate more tasks to junior team members',
      'Sometimes takes on too much work',
      'Could improve documentation habits'
    ],
    recommendations: [
      'Consider leadership training program',
      'Pair with mentor for management skills',
      'Shadow a senior lead for delegation techniques'
    ]
  }
}

const openResultsModal = (employee: typeof employees.value[0]) => {
  selectedEmployeeResults.value = employee
  showResultsModal.value = true
}

const getScoreColor = (score: number) => {
  if (score >= 4.5) return 'emerald'
  if (score >= 3.5) return 'cyan'
  if (score >= 2.5) return 'amber'
  return 'rose'
}

const stats = [
  { label: 'Total Employees', value: employees.value.length, icon: 'i-lucide-users' },
  { label: 'Reviews Completed', value: employees.value.filter(e => e.completedReviews).length, icon: 'i-lucide-check-circle' },
  { label: 'Promotion Ready', value: employees.value.filter(e => e.canBePromoted).length, icon: 'i-lucide-trending-up' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-white drop-shadow-lg">360 Reviews</h1>
        <p class="text-white/70 mt-1">Manage anonymous feedback and view aggregated results</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="glass p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white/60">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-white mt-1">{{ stat.value }}</p>
          </div>
          <div class="size-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
            <UIcon :name="stat.icon" class="size-6 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2">
      <button
        @click="activeTab = 'employees'"
        :class="[
          'px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300',
          activeTab === 'employees'
            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        ]"
      >
        Employee Results
      </button>
      <button
        @click="activeTab = 'pending'"
        :class="[
          'px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300',
          activeTab === 'pending'
            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        ]"
      >
        Pending Reviews
      </button>
    </div>

    <!-- Employee Results Table -->
    <div v-if="activeTab === 'employees'" class="glass p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-white">Aggregated Review Results</h2>
        <p class="text-sm text-white/50">Anonymous feedback summary per employee</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-3 px-4 text-sm font-medium text-white/60">Employee</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-white/60">Reviews</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-white/60">Avg Score</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-white/60">Top Strength</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-white/60">Focus Area</th>
              <th class="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
              <th class="text-right py-3 px-4 text-sm font-medium text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="emp in employees"
              :key="emp.id"
              class="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-teal-500/30 border border-cyan-500/30 flex items-center justify-center text-white text-sm font-medium">
                    {{ emp.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <p class="font-medium text-white">{{ emp.name }}</p>
                    <p class="text-sm text-white/50">{{ emp.role }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-white">{{ emp.reviewsReceived }}</span>
              </td>
              <td class="py-4 px-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getScoreColor(emp.avgScore) === 'emerald' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    getScoreColor(emp.avgScore) === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                    getScoreColor(emp.avgScore) === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  ]"
                >
                  {{ emp.avgScore.toFixed(1) }} / 5
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-white/80">{{ emp.topStrength }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-white/80">{{ emp.improvementArea }}</span>
              </td>
              <td class="py-4 px-4">
                <span
                  v-if="emp.canBePromoted"
                  class="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                >
                  Promotion Ready
                </span>
                <span
                  v-else
                  class="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/60 border border-white/20"
                >
                  In Progress
                </span>
              </td>
              <td class="py-4 px-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openInviteModal(emp)"
                    class="px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm flex items-center gap-2"
                  >
                    <UIcon name="i-lucide-mail" class="size-4" />
                    Send Invite
                  </button>
                  <button
                    @click="openResultsModal(emp)"
                    class="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-sm flex items-center gap-2"
                  >
                    <UIcon name="i-lucide-bar-chart-3" class="size-4" />
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pending Reviews -->
    <div v-else class="glass p-6">
      <h2 class="text-lg font-semibold text-white mb-6">Pending Review Invites</h2>

      <div class="text-center py-12 text-white/50">
        <UIcon name="i-lucide-inbox" class="size-12 mx-auto mb-4 text-white/30" />
        <p>No pending invites to track</p>
        <p class="text-sm mt-1">Send review invites from the Employee Results tab</p>
      </div>
    </div>

    <!-- Send Invite Modal -->
    <UModal v-model:open="showInviteModal">
      <template #content>
        <div class="p-6 max-h-[85vh] overflow-y-auto bg-gradient-to-br from-blue-900/95 via-teal-800/95 to-cyan-700/95 backdrop-blur-xl rounded-2xl border border-white/20">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">Send Review Invites</h2>
            <button @click="showInviteModal = false" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <UIcon name="i-lucide-x" class="size-5 text-white/60" />
            </button>
          </div>

          <div v-if="selectedEmployee" class="space-y-6">
            <div class="glass p-4 flex items-center gap-3">
              <UIcon name="i-lucide-shield" class="size-5 text-cyan-400" />
              <div>
                <p class="text-white text-sm font-medium">Anonymous Reviews</p>
                <p class="text-white/60 text-xs">Recipients will provide anonymous feedback. Their identity will not be linked to their responses.</p>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <p class="text-sm text-white/50">Requesting feedback for:</p>
              <p class="font-semibold text-white">{{ selectedEmployee.name }}</p>
              <p class="text-sm text-white/50">{{ selectedEmployee.role }} - {{ selectedEmployee.department }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-white/70 mb-2">Reviewer Emails</label>
              <p class="text-xs text-white/50 mb-2">Separate multiple emails with commas</p>
              <UTextarea
                v-model="inviteForm.emails"
                placeholder="reviewer1@company.com, reviewer2@company.com"
                :rows="3"
                class="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-white/70 mb-2">Review Type</label>
              <USelect
                v-model="inviteForm.reviewType"
                :items="[
                  { label: 'Peer Review', value: 'peer' },
                  { label: 'Manager Review', value: 'manager' },
                  { label: 'Direct Report Review', value: 'direct-report' }
                ]"
                class="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div class="flex justify-end gap-3">
              <button @click="showInviteModal = false" class="px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                Cancel
              </button>
              <button
                :disabled="!inviteForm.emails || sendingInvites"
                @click="sendInvites"
                class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <UIcon v-if="sendingInvites" name="i-lucide-loader-2" class="size-4 animate-spin" />
                <UIcon v-else name="i-lucide-send" class="size-4" />
                Send Invites
              </button>
            </div>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Detailed Results Modal -->
    <UModal v-model:open="showResultsModal" :ui="{ width: 'max-w-3xl' }">
      <template #content>
        <div class="p-6 max-h-[85vh] overflow-y-auto bg-gradient-to-br from-blue-900/95 via-teal-800/95 to-cyan-700/95 backdrop-blur-xl rounded-2xl border border-white/20">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-semibold text-white">Review Results</h2>
              <p class="text-white/50" v-if="selectedEmployeeResults">{{ selectedEmployeeResults.name }}</p>
            </div>
            <button @click="showResultsModal = false" class="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <UIcon name="i-lucide-x" class="size-5 text-white/60" />
            </button>
          </div>

          <div v-if="selectedEmployeeResults" class="space-y-6">
            <!-- Score Summary -->
            <div class="grid grid-cols-3 gap-4">
              <div class="glass p-4 text-center">
                <p class="text-3xl font-bold text-white">{{ mockDetailedResults.performance.avg }}</p>
                <p class="text-sm text-white/50">Performance</p>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500" :style="{ width: `${mockDetailedResults.performance.avg * 20}%` }" />
                </div>
              </div>
              <div class="glass p-4 text-center">
                <p class="text-3xl font-bold text-white">{{ mockDetailedResults.collaboration.avg }}</p>
                <p class="text-sm text-white/50">Collaboration</p>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500" :style="{ width: `${mockDetailedResults.collaboration.avg * 20}%` }" />
                </div>
              </div>
              <div class="glass p-4 text-center">
                <p class="text-3xl font-bold text-white">{{ mockDetailedResults.leadership.avg }}</p>
                <p class="text-sm text-white/50">Leadership</p>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div class="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" :style="{ width: `${mockDetailedResults.leadership.avg * 20}%` }" />
                </div>
              </div>
            </div>

            <!-- Anonymous Feedback -->
            <div class="space-y-4">
              <h3 class="font-semibold text-white">Anonymous Feedback Summary</h3>

              <div class="glass p-4">
                <h4 class="font-medium text-emerald-400 mb-2 flex items-center gap-2">
                  <UIcon name="i-lucide-thumbs-up" class="size-4" />
                  Key Strengths
                </h4>
                <ul class="space-y-2">
                  <li v-for="(strength, i) in mockDetailedResults.comments.strengths" :key="i" class="text-sm text-white/80 flex items-start gap-2">
                    <span class="text-emerald-500 mt-1">-</span>
                    {{ strength }}
                  </li>
                </ul>
              </div>

              <div class="glass p-4">
                <h4 class="font-medium text-amber-400 mb-2 flex items-center gap-2">
                  <UIcon name="i-lucide-target" class="size-4" />
                  Areas for Improvement
                </h4>
                <ul class="space-y-2">
                  <li v-for="(item, i) in mockDetailedResults.comments.improvements" :key="i" class="text-sm text-white/80 flex items-start gap-2">
                    <span class="text-amber-500 mt-1">-</span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="glass p-4">
                <h4 class="font-medium text-cyan-400 mb-2 flex items-center gap-2">
                  <UIcon name="i-lucide-lightbulb" class="size-4" />
                  Recommendations & Tips
                </h4>
                <ul class="space-y-2">
                  <li v-for="(rec, i) in mockDetailedResults.comments.recommendations" :key="i" class="text-sm text-white/80 flex items-start gap-2">
                    <span class="text-cyan-500 mt-1">-</span>
                    {{ rec }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Promotion Recommendation -->
            <div
              v-if="selectedEmployeeResults.canBePromoted"
              class="glass p-4 flex items-center gap-3 border-emerald-500/30"
            >
              <UIcon name="i-lucide-award" class="size-5 text-emerald-400" />
              <div>
                <p class="text-emerald-400 text-sm font-medium">Recommended for Promotion</p>
                <p class="text-white/60 text-xs">Based on aggregated feedback, this employee demonstrates consistent high performance and is ready for increased responsibility.</p>
              </div>
            </div>
            <div
              v-else
              class="glass p-4 flex items-center gap-3 border-amber-500/30"
            >
              <UIcon name="i-lucide-clock" class="size-5 text-amber-400" />
              <div>
                <p class="text-amber-400 text-sm font-medium">Development in Progress</p>
                <p class="text-white/60 text-xs">This employee shows promise but needs more time to develop in key areas before promotion consideration.</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
