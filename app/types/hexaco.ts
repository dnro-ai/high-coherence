/**
 * HEXACO Personality Framework Types
 * 
 * HEXACO is a six-factor model of personality structure:
 * - H: Honesty-Humility
 * - E: Emotionality
 * - X: Extraversion
 * - A: Agreeableness
 * - C: Conscientiousness
 * - O: Openness to Experience
 */

export type HexacoTrait =
    | 'honesty'          // H - Honesty-Humility
    | 'emotionality'     // E - Emotionality
    | 'extraversion'     // X - Extraversion
    | 'agreeableness'    // A - Agreeableness
    | 'conscientiousness'// C - Conscientiousness
    | 'openness';        // O - Openness to Experience

export type TraitLevel = 'high' | 'low' | 'neutral';

/**
 * Full HEXACO personality profile with normalized scores
 */
export interface HexacoProfile {
    /** Honesty-Humility: sincerity, fairness, greed avoidance, modesty */
    honesty: number;
    /** Emotionality: fearfulness, anxiety, dependence, sentimentality */
    emotionality: number;
    /** Extraversion: social self-esteem, social boldness, sociability, liveliness */
    extraversion: number;
    /** Agreeableness: forgiveness, gentleness, flexibility, patience */
    agreeableness: number;
    /** Conscientiousness: organization, diligence, perfectionism, prudence */
    conscientiousness: number;
    /** Openness: aesthetic appreciation, inquisitiveness, creativity, unconventionality */
    openness: number;
}

/**
 * Get the level (high/low/neutral) for a trait score
 */
export function getTraitLevel(score: number): TraitLevel {
    if (score >= 65) return 'high';
    if (score <= 35) return 'low';
    return 'neutral';
}

/**
 * Get dominant traits (highest scoring) from a profile
 */
export function getDominantTraits(profile: HexacoProfile, threshold = 60): HexacoTrait[] {
    const traits: HexacoTrait[] = ['honesty', 'emotionality', 'extraversion', 'agreeableness', 'conscientiousness', 'openness'];
    return traits.filter(trait => profile[trait] >= threshold);
}

/**
 * Get the primary and secondary traits from a profile
 */
export function getPrimarySecondaryTraits(profile: HexacoProfile): { primary: HexacoTrait; secondary?: HexacoTrait } {
    const traits: HexacoTrait[] = ['honesty', 'emotionality', 'extraversion', 'agreeableness', 'conscientiousness', 'openness'];
    const sorted = traits.sort((a, b) => profile[b] - profile[a]);
    return {
        primary: sorted[0],
        secondary: sorted[1]
    };
}
