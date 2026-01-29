<script setup lang="ts">
const companyStats = [
  { label: 'Total Employees', value: '156', icon: 'i-lucide-users' },
  { label: 'Assessments Done', value: '142', change: '91% completion rate', icon: 'i-lucide-clipboard-check' },
  { label: 'Company Avg Score', value: '74', change: '+3 from last quarter', icon: 'i-lucide-bar-chart-3' },
  { label: 'Reviews In Progress', value: '23', icon: 'i-lucide-clock' }
]

const departmentScores = [
  { name: 'Engineering', avgScore: 78, employees: 45, color: '#2cd3ff' },
  { name: 'Product', avgScore: 82, employees: 28, color: '#00d2ad' },
  { name: 'Design', avgScore: 76, employees: 18, color: '#2cd3ff' },
  { name: 'Marketing', avgScore: 71, employees: 32, color: '#00d2ad' },
  { name: 'Sales', avgScore: 69, employees: 33, color: '#2cd3ff' }
]

const hexacoCompanyAverages = [
  { trait: 'Honesty-Humility', score: 72, color: '#00d2ad' },
  { trait: 'Emotionality', score: 58, color: '#2cd3ff' },
  { trait: 'Extraversion', score: 68, color: '#00d2ad' },
  { trait: 'Agreeableness', score: 75, color: '#2cd3ff' },
  { trait: 'Conscientiousness', score: 81, color: '#00d2ad' },
  { trait: 'Openness', score: 70, color: '#2cd3ff' }
]

const recentReports = [
  { id: 1, title: 'Q3 2025 Performance Summary', date: '2025-10-15' },
  { id: 2, title: 'Engineering Team 360 Review', date: '2025-10-01' },
  { id: 3, title: 'Company Culture Assessment', date: '2025-09-15' },
  { id: 4, title: 'Leadership Development Report', date: '2025-09-01' }
]

const insights = [
  { title: 'High Conscientiousness', description: 'Your organization scores above average in Conscientiousness (81%), indicating strong work ethic and reliability across teams.', type: 'positive', icon: 'i-lucide-trending-up' },
  { title: 'Emotionality Variance', description: 'There is significant variance in Emotionality scores across departments. Consider team-building activities to improve emotional support.', type: 'warning', icon: 'i-lucide-alert-triangle' },
  { title: 'Sales Team Engagement', description: 'Sales team shows lower engagement scores. Review workload distribution and recognition programs.', type: 'info', icon: 'i-lucide-lightbulb' }
]

const toast = useToast()

const exportReport = () => {
  toast.add({
    title: 'Exporting Report',
    description: 'Your report is being generated and will download shortly.',
    color: 'info',
    icon: 'i-lucide-download'
  })
}

const generateReport = () => {
  toast.add({
    title: 'Generating Report',
    description: 'A new report is being generated with the latest data.',
    color: 'success',
    icon: 'i-lucide-file-plus'
  })
}

const refreshInsights = () => {
  toast.add({
    title: 'Refreshing Insights',
    description: 'AI is analyzing the latest data for new insights.',
    color: 'info',
    icon: 'i-lucide-refresh-cw'
  })
}

const downloadReport = (report: typeof recentReports[0]) => {
  toast.add({
    title: 'Downloading',
    description: `${report.title} is being downloaded.`,
    color: 'success',
    icon: 'i-lucide-download'
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-semibold text-white dark:drop-shadow-lg" style="font-family: 'Saol Display', serif;">Reports & Analytics</h1>
        <p class="text-white/70 mt-1">Company-wide performance insights and summaries</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="exportReport"
          class="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <UIcon name="i-lucide-download" class="size-4" />
          Export Report
        </button>
        <button
          @click="generateReport"
          class="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <UIcon name="i-lucide-plus" class="size-4" />
          Generate Report
        </button>
      </div>
    </div>

    <!-- Company Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in companyStats"
        :key="stat.label"
        class="glass p-5"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white/60">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-white mt-1">{{ stat.value }}</p>
          </div>
          <div class="size-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
            <UIcon :name="stat.icon" class="size-6 text-cyan-400" />
          </div>
        </div>
        <p v-if="stat.change" class="text-xs text-cyan-400 mt-2">{{ stat.change }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Department Performance -->
      <div class="lg:col-span-2 glass p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-white">Department Performance</h2>
          <button class="px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm">
            View All
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="dept in departmentScores"
            :key="dept.name"
            class="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div
                  class="size-10 rounded-xl flex items-center justify-center"
                  :style="{ backgroundColor: `${dept.color}20`, border: `1px solid ${dept.color}40` }"
                >
                  <UIcon name="i-lucide-users" class="size-5" :style="{ color: dept.color }" />
                </div>
                <div>
                  <h3 class="font-semibold text-white">{{ dept.name }}</h3>
                  <p class="text-sm text-white/50">{{ dept.employees }} employees</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-white">{{ dept.avgScore }}</p>
                <p class="text-xs text-white/50">avg score</p>
              </div>
            </div>
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000"
                :style="{
                  width: `${dept.avgScore}%`,
                  background: `linear-gradient(to right, ${dept.color}, ${dept.color}cc)`,
                  boxShadow: `0 0 10px ${dept.color}50`
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Company HEXACO Profile -->
      <div class="glass p-6">
        <h2 class="text-lg font-semibold text-white mb-6">Company HEXACO Profile</h2>

        <div class="space-y-4">
          <div v-for="trait in hexacoCompanyAverages" :key="trait.trait">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm text-white/70">{{ trait.trait.split('-')[0] }}</span>
              <span class="text-sm font-semibold text-white">{{ trait.score }}%</span>
            </div>
            <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000"
                :style="{
                  width: `${trait.score}%`,
                  background: `linear-gradient(to right, ${trait.color}, ${trait.color}cc)`,
                  boxShadow: `0 0 8px ${trait.color}50`
                }"
              />
            </div>
          </div>
        </div>

        <div class="border-t border-white/10 my-6"></div>

        <div>
          <h3 class="font-medium text-white mb-3">What This Means</h3>
          <p class="text-sm text-white/70 leading-relaxed">
            Your organization demonstrates strong conscientiousness and agreeableness, indicating a collaborative and reliable workforce. Consider initiatives to boost openness for more innovation.
          </p>
        </div>
      </div>
    </div>

    <!-- Insights & Reports -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- AI Insights -->
      <div class="glass p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-white">AI-Generated Insights</h2>
          <button
            @click="refreshInsights"
            class="px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm flex items-center gap-2"
          >
            <UIcon name="i-lucide-refresh-cw" class="size-4" />
            Refresh
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="insight in insights"
            :key="insight.title"
            class="p-4 rounded-xl border"
            :class="[
              insight.type === 'positive' ? 'bg-emerald-500/10 border-emerald-500/30' :
              insight.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' :
              'bg-cyan-500/10 border-cyan-500/30'
            ]"
          >
            <div class="flex items-start gap-3">
              <UIcon
                :name="insight.icon"
                class="size-5 mt-0.5 shrink-0"
                :class="[
                  insight.type === 'positive' ? 'text-emerald-400' :
                  insight.type === 'warning' ? 'text-amber-400' :
                  'text-cyan-400'
                ]"
              />
              <div>
                <h4
                  class="font-medium mb-1"
                  :class="[
                    insight.type === 'positive' ? 'text-emerald-400' :
                    insight.type === 'warning' ? 'text-amber-400' :
                    'text-cyan-400'
                  ]"
                >
                  {{ insight.title }}
                </h4>
                <p class="text-sm text-white/70 leading-relaxed">{{ insight.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Reports -->
      <div class="glass p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-white">Recent Reports</h2>
          <button class="px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm">
            View All
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="report in recentReports"
            :key="report.id"
            class="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10"
          >
            <div class="flex items-center gap-4">
              <div class="size-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
                <UIcon name="i-lucide-file-text" class="size-5 text-cyan-400" />
              </div>
              <div>
                <h3 class="font-medium text-white">{{ report.title }}</h3>
                <p class="text-sm text-white/50">{{ report.date }}</p>
              </div>
            </div>
            <button
              @click="downloadReport(report)"
              class="p-2 text-white/50 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-all"
            >
              <UIcon name="i-lucide-download" class="size-5" />
            </button>
          </div>
        </div>

        <button class="w-full mt-4 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-xl transition-all flex items-center justify-center gap-2">
          <UIcon name="i-lucide-folder-open" class="size-4" />
          Browse All Reports
        </button>
      </div>
    </div>
  </div>
</template>
