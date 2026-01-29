<script setup lang="ts">
interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const messages = ref<Message[]>([
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm your AI Coach. I have access to your HEXACO profile, 360 feedback, and development goals. How can I help you today?\n\nHere are some things I can help with:\n- Understanding your personality traits and how they affect your work\n- Interpreting feedback from your 360 reviews\n- Setting and tracking development goals\n- Suggesting resources for professional growth",
    timestamp: new Date()
  }
])

const inputMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const suggestedQuestions = [
  "What do my HEXACO results mean for my leadership style?",
  "How can I improve based on my 360 feedback?",
  "What goals should I set for next quarter?",
  "How do I balance my high agreeableness with being assertive?"
]

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const userMessage: Message = {
    id: messages.value.length + 1,
    role: 'user',
    content: inputMessage.value,
    timestamp: new Date()
  }
  messages.value.push(userMessage)
  inputMessage.value = ''
  isTyping.value = true

  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }

  await new Promise(resolve => setTimeout(resolve, 1500))

  const responses: Record<string, string> = {
    default: "Based on your HEXACO profile and recent 360 feedback, I can provide personalized insights. Your high Conscientiousness score (88%) indicates you're naturally organized and goal-oriented. Combined with your Agreeableness (85%), you're likely an excellent team player who delivers reliable results.\n\nHowever, this combination might sometimes lead to taking on too much to avoid disappointing others. Consider setting clearer boundaries while maintaining your collaborative nature.\n\nWould you like specific strategies for this?",
    leadership: "Your HEXACO results reveal a collaborative leadership style. With high Agreeableness (85%) and Conscientiousness (88%), you likely lead through trust and reliability rather than authority.\n\n**Strengths:**\n- Building consensus and team cohesion\n- Delivering consistent, high-quality work\n- Creating a supportive environment\n\n**Growth Areas:**\n- Practicing decisive leadership in ambiguous situations\n- Balancing team needs with strategic priorities\n\nWould you like exercises to develop more assertive leadership skills?",
    feedback: "Looking at your recent 360 feedback, here are the key themes:\n\n**What colleagues appreciate:**\n- Your reliability and follow-through\n- Willingness to help others\n- Clear communication\n\n**Areas for development:**\n- Speaking up more in meetings\n- Delegating instead of doing everything yourself\n- Sharing your ideas earlier in discussions\n\nThese align with your HEXACO profile - your high Agreeableness means you may defer to others. Let's work on strategies to share your valuable insights more confidently.",
    goals: "Based on your profile and current trajectory, here are recommended Q1 2026 goals:\n\n**1. Leadership Visibility**\nLead at least 2 team meetings per month and present your ideas first.\n\n**2. Delegation Practice**\nDelegate 3 tasks per week that you would normally do yourself.\n\n**3. Strategic Contribution**\nSchedule monthly 1:1s with your manager to discuss strategic initiatives.\n\n**4. Skill Development**\nComplete the \"Assertive Communication\" workshop by end of February.\n\nShall I help you break these down into weekly actions?"
  }

  let responseContent = responses.default
  const lowercaseMessage = userMessage.content.toLowerCase()

  if (lowercaseMessage.includes('leadership')) {
    responseContent = responses.leadership
  } else if (lowercaseMessage.includes('feedback') || lowercaseMessage.includes('360')) {
    responseContent = responses.feedback
  } else if (lowercaseMessage.includes('goal')) {
    responseContent = responses.goals
  }

  const aiMessage: Message = {
    id: messages.value.length + 1,
    role: 'assistant',
    content: responseContent,
    timestamp: new Date()
  }

  isTyping.value = false
  messages.value.push(aiMessage)

  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const askSuggested = (question: string) => {
  inputMessage.value = question
  sendMessage()
}
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-4xl font-semibold text-white dark:drop-shadow-lg" style="font-family: 'Saol Display', serif;">AI Coach</h1>
        <p class="text-white/70 mt-1">Your personalized development assistant</p>
      </div>
      <span class="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-2">
        <span class="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Online
      </span>
    </div>

    <!-- Chat Container -->
    <div class="glass flex-1 flex flex-col overflow-hidden">
      <!-- Messages -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-6">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex gap-4"
          :class="message.role === 'user' ? 'flex-row-reverse' : ''"
        >
          <!-- Avatar -->
          <div class="shrink-0">
            <div
              v-if="message.role === 'assistant'"
              class="size-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center"
            >
              <UIcon name="i-lucide-sparkles" class="size-5 text-white" />
            </div>
            <div
              v-else
              class="size-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-white text-sm font-medium"
            >
              AJ
            </div>
          </div>

          <!-- Message Bubble -->
          <div
            class="max-w-2xl rounded-2xl p-4"
            :class="message.role === 'user'
              ? 'bg-gradient-to-br from-cyan-500 to-teal-500 text-white'
              : 'bg-white/10 backdrop-blur-sm border border-white/10 text-white'"
          >
            <div
              class="prose prose-sm prose-invert"
              v-html="message.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"
            ></div>
            <p class="text-xs mt-2 opacity-60" :class="message.role === 'user' ? 'text-right' : ''">
              {{ message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex gap-4">
          <div class="size-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <UIcon name="i-lucide-sparkles" class="size-5 text-white" />
          </div>
          <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <div class="flex items-center gap-1">
              <span class="size-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="size-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="size-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Suggested Questions -->
      <div v-if="messages.length <= 1" class="px-6 pb-4">
        <p class="text-sm text-white/50 mb-3">Suggested questions:</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="question in suggestedQuestions"
            :key="question"
            @click="askSuggested(question)"
            class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm transition-all"
          >
            {{ question }}
          </button>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-white/10">
        <form @submit.prevent="sendMessage" class="flex items-center gap-3">
          <div class="flex-1 relative">
            <input
              v-model="inputMessage"
              type="text"
              placeholder="Ask your AI Coach anything..."
              class="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors">
              <UIcon name="i-lucide-mic" class="size-5" />
            </button>
          </div>
          <button
            type="submit"
            :disabled="!inputMessage.trim() || isTyping"
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <UIcon name="i-lucide-send" class="size-5" />
            Send
          </button>
        </form>
        <p class="text-xs text-white/40 mt-2 text-center">
          AI Coach has access to your HEXACO results, 360 feedback, and goals to provide personalized guidance.
        </p>
      </div>
    </div>
  </div>
</template>
