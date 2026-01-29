/**
 * Pankseppian Affective Neuroscience Types
 * 
 * Based on Jaak Panksepp's seven primary emotional systems,
 * extended with PEACE as used in the CRATE framework.
 */

/**
 * The 7 primary emotional systems + Peace extension
 */
export type PankseppianAffect =
    | 'SEEKING'   // Curiosity, exploration, anticipation
    | 'RAGE'      // Anger, frustration, boundary violation
    | 'FEAR'      // Anxiety, apprehension, threat response
    | 'LUST'      // Desire, passion, attraction
    | 'CARE'      // Nurturing, attachment, empathy
    | 'PANIC'     // Separation distress, grief, loss
    | 'PLAY'      // Joy, social engagement, lightness
    | 'PEACE';    // Contentment, equanimity, groundedness

export type AffectValence = 'positive' | 'negative';

/**
 * Mapping of affects to their valence
 */
export const AFFECT_VALENCE: Record<PankseppianAffect, AffectValence> = {
    SEEKING: 'positive',
    RAGE: 'negative',
    FEAR: 'negative',
    LUST: 'positive',
    CARE: 'positive',
    PANIC: 'negative',
    PLAY: 'positive',
    PEACE: 'positive'
};

/**
 * Individual affect measurement
 */
export interface AffectProfile {
    affect: PankseppianAffect;
    /** Intensity from 0-100 */
    intensity: number;
    valence: AffectValence;
}

/**
 * Current emotional state with primary and secondary affects
 */
export interface EmotionalState {
    primary: AffectProfile;
    secondary?: AffectProfile;
    /** Current mood labels from mood check-in */
    moods: string[];
    timestamp: Date;
}

/**
 * Get the valence of an affect
 */
export function getAffectValence(affect: PankseppianAffect): AffectValence {
    return AFFECT_VALENCE[affect];
}

/**
 * Check if emotional state is predominantly positive
 */
export function isPositiveState(state: EmotionalState): boolean {
    if (state.primary.valence === 'negative') return false;
    if (state.secondary && state.secondary.valence === 'negative' && state.secondary.intensity > 50) {
        return false;
    }
    return true;
}

/**
 * Calculate overall emotional intensity
 */
export function calculateEmotionalIntensity(state: EmotionalState): number {
    if (!state.secondary) return state.primary.intensity;
    return (state.primary.intensity + state.secondary.intensity * 0.5) / 1.5;
}
