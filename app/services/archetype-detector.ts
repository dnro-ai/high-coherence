/**
 * Archetype Detector Service
 * 
 * Detects and scores archetypes based on HEXACO profile,
 * emotional state, and CAT coherence scores.
 */

import type {
    ArchetypeId,
    ArchetypeDefinition,
    CoherenceState,
    HexacoProfile,
    HexacoTrait,
    EmotionalState,
    CATProfile,
    PankseppianAffect
} from '../types';

/**
 * Archetype scoring result
 */
export interface ArchetypeScore {
    archetypeId: ArchetypeId;
    score: number;
    confidence: number;
}

/**
 * Full detection result
 */
export interface DetectionResult {
    primary: ArchetypeScore;
    secondary: ArchetypeScore[];
    coherenceState: CoherenceState;
    timestamp: Date;
}

/**
 * Archetype Detector - determines user's archetype from input data
 */
export class ArchetypeDetector {
    private archetypeDefinitions: Map<ArchetypeId, ArchetypeDefinition>;

    constructor(definitions: Record<ArchetypeId, ArchetypeDefinition>) {
        this.archetypeDefinitions = new Map(Object.entries(definitions) as [ArchetypeId, ArchetypeDefinition][]);
    }

    /**
     * Detect archetype from HEXACO personality profile
     */
    detectFromHexaco(profile: HexacoProfile): ArchetypeScore[] {
        const scores: ArchetypeScore[] = [];

        const entries = Array.from(this.archetypeDefinitions.entries());
        for (const [id, definition] of entries) {
            const score = this.calculateHexacoScore(profile, definition.hexacoCorrelates);
            scores.push({
                archetypeId: id,
                score,
                confidence: this.scoreToConfidence(score)
            });
        }

        // Sort by score descending
        return scores.sort((a, b) => b.score - a.score);
    }

    /**
     * Refine archetype scores based on current emotional state
     */
    refineWithEmotionalState(
        baseScores: ArchetypeScore[],
        emotionalState: EmotionalState
    ): ArchetypeScore[] {
        return baseScores.map(score => {
            const definition = this.archetypeDefinitions.get(score.archetypeId);
            if (!definition) return score;

            // Boost score if primary affect matches archetype's affects
            const affectBoost = this.calculateAffectBoost(
                emotionalState.primary.affect,
                definition.primaryAffects
            );

            return {
                ...score,
                score: score.score + affectBoost,
                confidence: this.scoreToConfidence(score.score + affectBoost)
            };
        }).sort((a, b) => b.score - a.score);
    }

    /**
     * Determine coherence state from CAT scores
     */
    determineCoherenceState(catScores: CATProfile): CoherenceState {
        const { clarity, agency, trust } = catScores;
        const average = (clarity + agency + trust) / 3;

        // Using -3 to +3 scale
        if (average >= 1.5 && clarity > 0 && agency > 0 && trust > 0) {
            return 'HIGH';
        }
        if (average <= -1 || clarity <= -2 || agency <= -2 || trust <= -2) {
            return 'LOW';
        }
        return 'BASE';
    }

    /**
     * Full detection combining all inputs
     */
    detect(
        hexacoProfile: HexacoProfile,
        emotionalState?: EmotionalState,
        catScores?: CATProfile
    ): DetectionResult {
        // Get base scores from HEXACO
        let scores = this.detectFromHexaco(hexacoProfile);

        // Refine with emotional state if available
        if (emotionalState) {
            scores = this.refineWithEmotionalState(scores, emotionalState);
        }

        // Determine coherence state
        const coherenceState = catScores
            ? this.determineCoherenceState(catScores)
            : 'BASE';

        // Guard against empty scores (shouldn't happen in practice)
        if (scores.length === 0) {
            throw new Error('No archetype definitions available for scoring');
        }

        return {
            primary: scores[0]!,
            secondary: scores.slice(1, 4), // Top 3 secondary
            coherenceState,
            timestamp: new Date()
        };
    }

    // ============================================
    // Private helpers
    // ============================================

    private calculateHexacoScore(
        profile: HexacoProfile,
        correlates: Partial<Record<HexacoTrait, number>>
    ): number {
        let totalScore = 0;
        let weightSum = 0;

        const traits: HexacoTrait[] = [
            'honesty', 'emotionality', 'extraversion',
            'agreeableness', 'conscientiousness', 'openness'
        ];

        for (const trait of traits) {
            const weight = correlates[trait];
            if (weight !== undefined) {
                // Normalize profile score from 0-100 to -1 to 1
                const normalizedProfile = (profile[trait] - 50) / 50;
                // Score is product of weight and normalized profile value
                totalScore += weight * normalizedProfile;
                weightSum += Math.abs(weight);
            }
        }

        // Return weighted average, scaled to 0-100
        return weightSum > 0
            ? ((totalScore / weightSum) + 1) * 50
            : 50;
    }

    private calculateAffectBoost(
        currentAffect: PankseppianAffect,
        archetypeAffects: PankseppianAffect[]
    ): number {
        // Primary match = +10 points, secondary = +5
        if (archetypeAffects[0] === currentAffect) return 10;
        if (archetypeAffects.includes(currentAffect)) return 5;
        return 0;
    }

    private scoreToConfidence(score: number): number {
        // Convert score to confidence percentage
        // Score of 50 = 50% confidence, 75 = 75%, etc.
        return Math.max(0, Math.min(100, score));
    }
}

/**
 * Singleton instance factory
 */
let detectorInstance: ArchetypeDetector | null = null;

export function getArchetypeDetector(
    definitions: Record<ArchetypeId, ArchetypeDefinition>
): ArchetypeDetector {
    if (!detectorInstance) {
        detectorInstance = new ArchetypeDetector(definitions);
    }
    return detectorInstance;
}
