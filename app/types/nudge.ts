/**
 * Nudge Recommendation Types
 * 
 * Nudges are context-aware suggestions delivered to users
 * based on their current archetype and coherence state.
 */

export type NudgeCategory =
    | 'reflection'   // Introspective prompts
    | 'action'       // Behavioral suggestions
    | 'connection'   // Social/relational nudges
    | 'reframe'      // Cognitive reframing
    | 'grounding'    // Present-moment awareness
    | 'activation';  // Energy/motivation boosters

export type NudgeUrgency = 'low' | 'medium' | 'high';

/**
 * A single nudge recommendation
 */
export interface NudgeRecommendation {
    id: string;
    category: NudgeCategory;
    title: string;
    content: string;
    /** Why this nudge is relevant for the current state */
    rationale?: string;
    /** How urgent is this nudge */
    urgency: NudgeUrgency;
    /** Traits this nudge targets */
    targetTraits?: string[];
}

/**
 * Nudge delivery context
 */
export interface NudgeContext {
    archetypeId: string;
    coherenceState: 'HIGH' | 'BASE' | 'LOW';
    currentMoods?: string[];
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
}

/**
 * Select appropriate nudges for a given context
 */
export function selectNudges(
    availableNudges: NudgeRecommendation[],
    context: NudgeContext,
    maxNudges = 3
): NudgeRecommendation[] {
    // For LOW state, prioritize high-urgency nudges
    if (context.coherenceState === 'LOW') {
        const highUrgency = availableNudges.filter(n => n.urgency === 'high');
        if (highUrgency.length >= maxNudges) {
            return highUrgency.slice(0, maxNudges);
        }
    }

    // Otherwise return first available up to max
    return availableNudges.slice(0, maxNudges);
}
