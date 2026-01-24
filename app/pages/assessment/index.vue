<script setup lang="ts">
// CRATE COHERE Assessment v2.0
// 48 Questions | ~15 minutes

interface MultipleChoiceQuestion {
  id: number
  text: string
  type: 'multiple-choice'
  options: { value: string; label: string }[]
}

interface RatingQuestion {
  id: number
  text: string
  type: 'rating'
}

type Question = MultipleChoiceQuestion | RatingQuestion

interface Section {
  id: string
  title: string
  subtitle: string
  questions: Question[]
}

const sections: Section[] = [
  {
    id: 'gathering',
    title: 'At a Gathering',
    subtitle: "Imagine you've arrived at a social event where you know a few people but not everyone...",
    questions: [
      {
        id: 1,
        text: "When you first walk in, you're most likely to:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Find someone you know and settle into a real conversation' },
          { value: 'B', label: "Scan the room to get a sense of the vibe and who's here" },
          { value: 'C', label: 'Introduce yourself to someone new who looks interesting' },
          { value: 'D', label: 'Find a useful role—help with drinks, greet newcomers, something active' }
        ]
      },
      {
        id: 2,
        text: 'A heated debate breaks out nearby. You:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Listen carefully to understand both sides before saying anything' },
          { value: 'B', label: 'Jump in if you have a strong opinion worth sharing' },
          { value: 'C', label: 'Try to find common ground or de-escalate the tension' },
          { value: 'D', label: 'Find it energizing and enjoy the intellectual sparring' }
        ]
      },
      {
        id: 3,
        text: "Someone shares that they're going through a hard time. Your instinct is to:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "Ask questions to really understand what's happening" },
          { value: 'B', label: 'Offer practical suggestions or resources that might help' },
          { value: 'C', label: "Simply listen and let them know you're there for them" },
          { value: 'D', label: 'Share a similar experience to help them feel less alone' }
        ]
      },
      {
        id: 4,
        text: '"I often leave social events feeling energized rather than drained."',
        type: 'rating'
      },
      {
        id: 5,
        text: '"I find small talk uncomfortable—I\'d rather skip to deeper topics."',
        type: 'rating'
      },
      {
        id: 6,
        text: "By the end of a good gathering, you hope you've:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Made a genuine connection with at least one person' },
          { value: 'B', label: 'Learned something new or had your thinking challenged' },
          { value: 'C', label: 'Helped make the event better for others somehow' },
          { value: 'D', label: 'Had fun and felt fully present in the moment' }
        ]
      }
    ]
  },
  {
    id: 'work',
    title: 'At Work',
    subtitle: 'Imagine a typical week at work (or in your main productive activity)...',
    questions: [
      {
        id: 7,
        text: 'When starting a new project, you prefer to:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Map out a clear plan before taking any action' },
          { value: 'B', label: 'Dive in and figure it out as you go' },
          { value: 'C', label: "Talk to others who've done something similar first" },
          { value: 'D', label: 'Experiment with a few quick approaches to see what works' }
        ]
      },
      {
        id: 8,
        text: 'Your work environment is suddenly disrupted by major changes. You:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "Feel anxious until you understand exactly what's happening" },
          { value: 'B', label: 'See it as an opportunity and start thinking about possibilities' },
          { value: 'C', label: "Check in with colleagues to see how everyone's doing" },
          { value: 'D', label: 'Focus on what you can control and take immediate action' }
        ]
      },
      {
        id: 9,
        text: '"I work best when I have clear deadlines and structure."',
        type: 'rating'
      },
      {
        id: 10,
        text: '"I\'d rather ask for forgiveness than permission."',
        type: 'rating'
      },
      {
        id: 11,
        text: 'When you receive critical feedback, your first reaction is usually:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "To analyze whether it's accurate and useful" },
          { value: 'B', label: 'A flash of defensiveness before you settle down' },
          { value: 'C', label: 'Curiosity about what you can learn from it' },
          { value: 'D', label: 'Concern about what it means for the relationship' }
        ]
      },
      {
        id: 12,
        text: 'The type of work that makes you lose track of time:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Deep analysis or solving complex problems' },
          { value: 'B', label: 'Building or creating something tangible' },
          { value: 'C', label: 'Collaborating closely with others on a shared goal' },
          { value: 'D', label: 'Exploring new ideas or learning new skills' }
        ]
      },
      {
        id: 13,
        text: '"I find it hard to rest until a task is fully complete."',
        type: 'rating'
      },
      {
        id: 14,
        text: '"I need to trust my colleagues before I can do my best work."',
        type: 'rating'
      }
    ]
  },
  {
    id: 'relationships',
    title: 'In Close Relationships',
    subtitle: 'Think about your closest relationships—romantic partner, best friends, family...',
    questions: [
      {
        id: 15,
        text: 'In a disagreement with someone you love, you typically:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Need time alone to process before you can talk productively' },
          { value: 'B', label: "Want to talk it through immediately until it's resolved" },
          { value: 'C', label: 'Focus on preserving the relationship over winning the point' },
          { value: 'D', label: 'Try to understand their perspective even when you disagree' }
        ]
      },
      {
        id: 16,
        text: 'What makes you feel most loved?',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'When someone truly understands how you think' },
          { value: 'B', label: 'When someone shows up and does things to support you' },
          { value: 'C', label: 'When someone is physically present and affectionate' },
          { value: 'D', label: 'When someone accepts you exactly as you are' }
        ]
      },
      {
        id: 17,
        text: '"I tend to give more than I receive in relationships."',
        type: 'rating'
      },
      {
        id: 18,
        text: '"I find it hard to ask for help, even from people who love me."',
        type: 'rating'
      },
      {
        id: 19,
        text: 'When a close friend is making a choice you think is a mistake, you:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "Share your honest concerns directly, even if it's uncomfortable" },
          { value: 'B', label: 'Ask questions to help them think it through themselves' },
          { value: 'C', label: "Support them regardless—it's their life to live" },
          { value: 'D', label: 'Offer to help them explore options before deciding' }
        ]
      },
      {
        id: 20,
        text: '"I open up slowly—people have to earn my trust over time."',
        type: 'rating'
      },
      {
        id: 21,
        text: 'Your relationship superpower is probably:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "Loyalty—once I'm in, I'm in completely" },
          { value: 'B', label: 'Insight—I notice things others miss' },
          { value: 'C', label: 'Energy—I bring excitement and new experiences' },
          { value: 'D', label: 'Presence—I make people feel truly seen' }
        ]
      }
    ]
  },
  {
    id: 'learning',
    title: 'When Learning',
    subtitle: 'Think about how you approach learning something new—a skill, a subject, a hobby...',
    questions: [
      {
        id: 22,
        text: 'When you encounter a topic that fascinates you, you typically:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Go deep—read everything, watch videos, become semi-expert' },
          { value: 'B', label: 'Learn just enough to try it, then learn more as needed' },
          { value: 'C', label: 'Find someone who knows about it and learn through conversation' },
          { value: 'D', label: 'Sample broadly—you love knowing a little about many things' }
        ]
      },
      {
        id: 23,
        text: '"I need to understand WHY something works, not just HOW."',
        type: 'rating'
      },
      {
        id: 24,
        text: '"I learn best by doing, even if I make mistakes along the way."',
        type: 'rating'
      },
      {
        id: 25,
        text: "When you're stuck on something difficult, your first move is usually to:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Step away and let your unconscious work on it' },
          { value: 'B', label: 'Push harder—persistence usually breaks through' },
          { value: 'C', label: 'Ask someone who might know or find a different resource' },
          { value: 'D', label: 'Try a completely different approach' }
        ]
      },
      {
        id: 26,
        text: '"I\'m bothered when I don\'t fully understand something."',
        type: 'rating'
      },
      {
        id: 27,
        text: 'Your ideal learning environment would be:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Solo with excellent resources and time to think' },
          { value: 'B', label: 'A workshop where you build something real' },
          { value: 'C', label: 'A cohort of peers learning and discussing together' },
          { value: 'D', label: 'One-on-one with an expert mentor' }
        ]
      }
    ]
  },
  {
    id: 'pressure',
    title: 'Under Pressure',
    subtitle: "Imagine you're facing significant stress—deadline pressure, uncertainty, conflict...",
    questions: [
      {
        id: 28,
        text: 'When overwhelmed, your body typically:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Gets tense—tight shoulders, clenched jaw, restless' },
          { value: 'B', label: 'Shuts down—tired, foggy, hard to move' },
          { value: 'C', label: "Gets buzzy—racing thoughts, can't settle" },
          { value: 'D', label: 'Varies a lot depending on the type of stress' }
        ]
      },
      {
        id: 29,
        text: '"Pressure brings out my best performance."',
        type: 'rating'
      },
      {
        id: 30,
        text: "When you're stressed, you're most likely to reach out to:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'No one—you need to figure it out yourself first' },
          { value: 'B', label: 'One trusted person who really gets you' },
          { value: 'C', label: 'Whoever might have useful information or help' },
          { value: 'D', label: 'Several people—connection helps you regulate' }
        ]
      },
      {
        id: 31,
        text: 'What helps you recover from stress most effectively?',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Time alone to process and recharge' },
          { value: 'B', label: 'Physical activity or being in nature' },
          { value: 'C', label: 'Quality time with people you love' },
          { value: 'D', label: 'Getting absorbed in a project or creative work' }
        ]
      },
      {
        id: 32,
        text: '"I tend to worry about things that might never happen."',
        type: 'rating'
      },
      {
        id: 33,
        text: '"When things go wrong, my first instinct is to take action."',
        type: 'rating'
      },
      {
        id: 34,
        text: 'After a crisis passes, you usually:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Analyze what happened to prevent it next time' },
          { value: 'B', label: "Move on quickly—what's done is done" },
          { value: 'C', label: 'Check in with others who were affected' },
          { value: 'D', label: 'Need time to emotionally process before returning to normal' }
        ]
      }
    ]
  },
  {
    id: 'inner-life',
    title: 'Your Inner Life',
    subtitle: 'These questions are about your relationship with yourself—your thoughts, feelings, and sense of meaning...',
    questions: [
      {
        id: 35,
        text: 'When you imagine your best possible future, what matters most?',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Mastery—being really good at something meaningful' },
          { value: 'B', label: 'Impact—having made a difference in the world' },
          { value: 'C', label: 'Connection—being surrounded by people you love' },
          { value: 'D', label: 'Freedom—being able to live on your own terms' }
        ]
      },
      {
        id: 36,
        text: '"I have a clear sense of what I\'m here to do."',
        type: 'rating'
      },
      {
        id: 37,
        text: '"I often feel like there\'s a version of myself I haven\'t fully become yet."',
        type: 'rating'
      },
      {
        id: 38,
        text: "What's your relationship with uncertainty?",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'I find it uncomfortable and try to resolve it quickly' },
          { value: 'B', label: "I've learned to tolerate it, though I don't love it" },
          { value: 'C', label: "I find it exciting—that's where possibility lives" },
          { value: 'D', label: 'It depends entirely on what the uncertainty is about' }
        ]
      },
      {
        id: 39,
        text: '"I\'m harder on myself than anyone else is."',
        type: 'rating'
      },
      {
        id: 40,
        text: 'When you feel truly alive, you\'re usually:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'In the middle of solving a hard problem' },
          { value: 'B', label: "Creating something that didn't exist before" },
          { value: 'C', label: 'Deeply connected with someone you love' },
          { value: 'D', label: 'Fully present in your body—moving, sensing, being' }
        ]
      }
    ]
  },
  {
    id: 'shadow',
    title: "When You're Not At Your Best",
    subtitle: "Everyone has patterns that emerge when they're depleted, stressed, or scared. These questions help us understand yours—not to judge, but to help you catch them earlier.",
    questions: [
      {
        id: 41,
        text: "When you're running on empty, you're most likely to convince yourself that:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "You just need to figure out one more thing, then you'll feel ready to act" },
          { value: 'B', label: "You're not running away—you're exploring options / keeping things open" },
          { value: 'C', label: "Everyone else is the problem—they're not seeing what you see" },
          { value: 'D', label: "They need you—you can't stop now, even if it's costing you" }
        ]
      },
      {
        id: 42,
        text: "People who know you well would say that when you're stressed, you tend to:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "Disappear—get quiet, withdraw, stop sharing what's really going on" },
          { value: 'B', label: 'Get rigid—hold tighter to plans, routines, or rules' },
          { value: 'C', label: 'Get scattered—start new things, change direction, struggle to finish' },
          { value: 'D', label: 'Over-function—take on more, help more, say yes when you should say no' }
        ]
      },
      {
        id: 43,
        text: '"I sometimes keep moving specifically to avoid feeling something I don\'t want to feel."',
        type: 'rating'
      },
      {
        id: 44,
        text: '"I sometimes research or analyze specifically to delay making a decision I\'m afraid to make."',
        type: 'rating'
      },
      {
        id: 45,
        text: '"I sometimes take care of others specifically to avoid focusing on my own needs."',
        type: 'rating'
      },
      {
        id: 46,
        text: 'When you look back at times things went wrong, you most often realize you:',
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Knew something was off but kept analyzing instead of acting' },
          { value: 'B', label: 'Knew something was off but kept moving instead of stopping to feel it' },
          { value: 'C', label: 'Knew something was off but kept giving instead of protecting yourself' },
          { value: 'D', label: 'Knew something was off but convinced yourself you were being paranoid' }
        ]
      },
      {
        id: 47,
        text: "How quickly do you usually notice when you've slipped into an unhelpful pattern?",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: "I often don't notice until someone else points it out or something breaks" },
          { value: 'B', label: "I notice eventually, but usually after I've already done some damage" },
          { value: 'C', label: "I can usually catch it in the moment, though I don't always stop" },
          { value: 'D', label: 'I catch it early and can usually course-correct before it becomes a problem' }
        ]
      },
      {
        id: 48,
        text: "When someone accurately names a pattern you'd rather not see in yourself, your first reaction is usually:",
        type: 'multiple-choice',
        options: [
          { value: 'A', label: 'Deflection—change the subject or explain why this situation is different' },
          { value: 'B', label: 'Defensiveness—feel criticized, push back, maybe get sharp' },
          { value: 'C', label: 'Collapse—feel ashamed, agree too quickly, turn it against yourself' },
          { value: 'D', label: 'Recognition—uncomfortable but curious, maybe a nervous laugh' }
        ]
      }
    ]
  }
]

const totalQuestions = 48
const currentSectionIndex = ref(0)
const currentQuestionIndex = ref(0)
const answers = ref<Record<number, string | number>>({})
const isStarted = ref(false)
const isCompleted = ref(false)

const currentSection = computed(() => sections[currentSectionIndex.value])
const currentQuestion = computed(() => currentSection.value.questions[currentQuestionIndex.value])

const answeredCount = computed(() => Object.keys(answers.value).length)
const progress = computed(() => Math.round((answeredCount.value / totalQuestions) * 100))

const ratingOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
]

const selectAnswer = (value: string | number) => {
  answers.value[currentQuestion.value.id] = value

  // Auto-advance after a brief delay
  setTimeout(() => {
    if (currentQuestionIndex.value < currentSection.value.questions.length - 1) {
      currentQuestionIndex.value++
    } else if (currentSectionIndex.value < sections.length - 1) {
      currentSectionIndex.value++
      currentQuestionIndex.value = 0
    } else {
      isCompleted.value = true
    }
  }, 300)
}

const goToPrevious = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  } else if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--
    currentQuestionIndex.value = sections[currentSectionIndex.value].questions.length - 1
  }
}

const canGoBack = computed(() => {
  return currentSectionIndex.value > 0 || currentQuestionIndex.value > 0
})

const getCurrentAnswer = computed(() => {
  return answers.value[currentQuestion.value.id]
})

// Calculate overall question number
const overallQuestionNumber = computed(() => {
  let count = 0
  for (let i = 0; i < currentSectionIndex.value; i++) {
    count += sections[i].questions.length
  }
  return count + currentQuestionIndex.value + 1
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-4xl font-bold text-white drop-shadow-lg">CRATE COHERE Assessment</h1>
      <p class="text-white/70 mt-1">48 Questions | ~15 minutes</p>
    </div>

    <!-- Assessment Container -->
    <div class="glass p-8">
      <!-- Not Started State -->
      <div v-if="!isStarted && !isCompleted" class="text-center py-12 max-w-2xl mx-auto">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-6 glow-cyan">
          <UIcon name="i-lucide-brain" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-white mb-4">Initial Assessment Questionnaire</h2>
        <p class="text-white/70 mb-6">
          This questionnaire helps us understand how you naturally navigate the world. There are no right or wrong answers. Choose what feels most true for you, not what you think you should say.
        </p>
        <p class="text-white/60 text-sm mb-8">
          The questions are organized into scenarios across different life domains. For each scenario, you'll either choose the response that fits you best or rate how much you agree with a statement.
        </p>

        <div class="glass p-4 mb-8 flex items-center gap-3 justify-center">
          <UIcon name="i-lucide-lightbulb" class="size-5 text-cyan-400" />
          <p class="text-white/80 text-sm">
            <strong class="text-cyan-400">Tip:</strong> Go with your first instinct. Overthinking usually leads away from accuracy, not toward it.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div v-for="section in sections" :key="section.id" class="glass p-3 rounded-xl">
            <p class="text-white text-xs font-medium truncate">{{ section.title }}</p>
            <p class="text-white/50 text-xs">{{ section.questions.length }} questions</p>
          </div>
        </div>

        <button
          @click="isStarted = true"
          class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_16px_0_rgba(6,182,212,0.3)] active:scale-95"
        >
          Begin Assessment
        </button>
      </div>

      <!-- Assessment In Progress -->
      <div v-else-if="isStarted && !isCompleted" class="max-w-2xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-white/70">Progress</span>
            <span class="text-sm text-white/50">{{ answeredCount }} / {{ totalQuestions }} ({{ progress }}%)</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-300" :style="{ width: `${progress}%` }" />
          </div>
        </div>

        <!-- Section Header -->
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-2">
            <span class="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs">
              Section {{ currentSectionIndex + 1 }} of {{ sections.length }}
            </span>
            <span class="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-medium">
              {{ currentSection.title }}
            </span>
          </div>
          <p class="text-white/60 text-sm italic">{{ currentSection.subtitle }}</p>
        </div>

        <!-- Question Number -->
        <div class="flex items-center gap-2 mb-4">
          <span class="text-white/50 text-sm">Question {{ overallQuestionNumber }}</span>
        </div>

        <!-- Question Card -->
        <div class="glass p-6 mb-6 animate-fade-in-up" :key="currentQuestion.id">
          <p class="text-lg text-white font-medium leading-relaxed">
            {{ currentQuestion.text }}
          </p>
        </div>

        <!-- Answer Options -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="space-y-3">
          <button
            v-for="option in (currentQuestion as MultipleChoiceQuestion).options"
            :key="option.value"
            @click="selectAnswer(option.value)"
            class="w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-start gap-3"
            :class="getCurrentAnswer === option.value
              ? 'border-cyan-500 bg-cyan-500/20 shadow-lg glow-cyan'
              : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/5 bg-white/5'"
          >
            <span
              class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              :class="getCurrentAnswer === option.value ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60'"
            >
              {{ option.value }}
            </span>
            <span class="text-white/90 text-sm leading-relaxed">{{ option.label }}</span>
          </button>
        </div>

        <div v-else class="grid grid-cols-5 gap-3">
          <button
            v-for="option in ratingOptions"
            :key="option.value"
            @click="selectAnswer(option.value)"
            class="p-4 rounded-xl border-2 transition-all duration-200 text-center"
            :class="getCurrentAnswer === option.value
              ? 'border-cyan-500 bg-cyan-500/20 shadow-lg glow-cyan'
              : 'border-white/20 hover:border-cyan-400/50 hover:bg-white/5 bg-white/5'"
          >
            <div class="text-2xl font-bold text-white mb-1">{{ option.value }}</div>
            <div class="text-xs text-white/50 leading-tight">{{ option.label }}</div>
          </button>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-8">
          <button
            :disabled="!canGoBack"
            @click="goToPrevious"
            class="px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <UIcon name="i-lucide-arrow-left" class="size-4" />
            Previous
          </button>
          <button @click="isStarted = false" class="px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            Save & Exit
          </button>
        </div>
      </div>

      <!-- Completed State -->
      <div v-else class="text-center py-12 max-w-2xl mx-auto">
        <div class="size-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6">
          <UIcon name="i-lucide-check" class="size-10 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">Assessment Complete!</h2>
        <p class="text-white/70 max-w-lg mx-auto mb-4">
          Your CRATE COHERE assessment has been submitted. We're analyzing your responses to identify your archetype, coherence patterns, and personalized insights.
        </p>
        <p class="text-white/50 text-sm mb-8">
          Results will be available in your dashboard shortly.
        </p>

        <div class="glass p-6 mb-8 text-left">
          <h3 class="text-white font-semibold mb-3">What happens next?</h3>
          <ul class="space-y-2 text-white/70 text-sm">
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-sparkles" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Your primary archetype and current state will be identified
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-activity" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Your Clarity, Agency, and Trust (C/A/T) scores will be calculated
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-shield" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Shadow patterns that may emerge under stress will be mapped
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-target" class="size-4 text-cyan-400 mt-0.5 shrink-0" />
              Personalized recommendations will be generated
            </li>
          </ul>
        </div>

        <div class="flex items-center justify-center gap-4">
          <NuxtLink to="/dashboard" class="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all">
            View Dashboard
          </NuxtLink>
          <NuxtLink to="/coach" class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl transition-all">
            Talk to AI Coach
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
