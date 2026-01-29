/**
 * CAT Coherence Scoring Types
 * 
 * The CAT framework measures three dimensions of psychological coherence:
 * - Clarity: Mental clarity and understanding
 * - Agency: Sense of control and self-efficacy
 * - Trust: Trust in self, others, and the process
 */

export interface CATProfile {
    /** Mental clarity score (-3 to +3 or normalized 0-100) */
    clarity: number;
    /** Sense of control/efficacy (-3 to +3 or normalized 0-100) */
    agency: number;
    /** Trust in self/world/process (-3 to +3 or normalized 0-100) */
    trust: number;
}

/**
 * Extended CAT with emotional/hedonic/social components
 * Used for more granular coherence assessment
 */
export interface CATEHSProfile extends CATProfile {
    /** Energy/Activation level */
    energy: number;
    /** Hedonic tone (pleasure/displeasure) */
    hedonic: number;
    /** Social connection/isolation */
    social: number;
}

/**
 * Normalize CAT scores from -3/+3 scale to 0-100
 */
export function normalizeCATScore(score: number): number {
    return Math.round(((score + 3) / 6) * 100);
}

/**
 * Convert 0-100 normalized score back to -3/+3 scale
 */
export function denormalizeCATScore(normalized: number): number {
    return (normalized / 100) * 6 - 3;
}

/**
 * Calculate overall coherence from CAT profile
 */
export function calculateCoherence(profile: CATProfile): number {
    return (profile.clarity + profile.agency + profile.trust) / 3;
}
