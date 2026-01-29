/**
 * Archetype Definitions Data
 * 
 * Auto-generated from CRATE_Archetype_Brief_v1.5.rtf
 */

import type { ArchetypeId, ArchetypeDefinition } from '../types';

export const ARCHETYPES: Record<ArchetypeId, ArchetypeDefinition> = {
    architect: {
        id: 'architect',
        name: "The Architect",
        category: 'STATIC',
        function: "Builds systems for the future",
        primaryAffects: ["CARE", "SEEKING"],
        states: {
            HIGH: {
                label: "The Visionary Builder Creates",
                description: "elegant, lasting systems that serve others and stand the test of time. Balances perfection with pragmatism. Builds cathedrals.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Systems Thinker Competent",
                description: "organizer who designs structures and processes. Reliable planner. Gets things built.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Perfectionist Analysis",
                description: "paralysis. Never ships. Rigid controller who mistakes the map for the territory. Builds prisons.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "conscientiousness": 0.8, "openness": 0.8, "honestyHumility": 0.5 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Emperor (constructive) |",
        _enneagramMapping: "1, 5"
    },
    guardian: {
        id: 'guardian',
        name: "The Guardian",
        category: 'STATIC',
        function: "Protects boundaries and maintains safety",
        primaryAffects: ["RAGE", "FEAR"],
        states: {
            HIGH: {
                label: "The Wise Protector Knows",
                description: "what's worth defending and what to let go. Holds boundaries with strength and discernment. Shields without smothering.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Watchkeeper Reliable",
                description: "defender of people and principles. Maintains safety. Holds the line when needed.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Paranoid Sees",
                description: "threats everywhere. Walls everyone out. Controlling. Mistakes vigilance for wisdom. Builds fortresses against imaginary enemies.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "emotionality": 0.8, "conscientiousness": 0.8, "honestyHumility": 0.5, "agreeableness": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Emperor (defensive) + Justice |",
        _enneagramMapping: "6, 8"
    },
    nurturer: {
        id: 'nurturer',
        name: "The Nurturer",
        category: 'STATIC',
        function: "Tends bonds and cares for others",
        primaryAffects: ["CARE"],
        states: {
            HIGH: {
                label: "The Empowering Caregiver Gives",
                description: "in ways that strengthen others' autonomy. Nurtures growth, not dependency. Loves without losing self.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Warm Presence Supportive",
                description: ", attentive to others' needs. Creates comfort and belonging. Takes care of people.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Martyr Codependent",
                description: "Gives to control or to be needed. Resentful when unreciprocated. Loses self in others' needs.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "emotionality": 0.8, "agreeableness": 0.8, "honestyHumility": 0.5 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Empress |",
        _enneagramMapping: "2"
    },
    steward: {
        id: 'steward',
        name: "The Steward",
        category: 'STATIC',
        function: "Preserves resources and maintains value",
        primaryAffects: ["CARE", "FEAR"],
        states: {
            HIGH: {
                label: "The Wise Keeper Ensures",
                description: "sustainability for all. Manages resources with long-term vision. Preserves what matters, releases what doesn't.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Responsible Manager Reliable",
                description: "custodian of resources, systems, and assets. Maintains what's been built. Keeps the lights on.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Hoarder Scarcity",
                description: "mindset. Hoards resources. Penny-wise, pound-foolish. Blocks investment out of fear. Confuses frugality with wisdom.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "honestyHumility": 0.8, "conscientiousness": 0.8, "emotionality": 0.5 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Hierophant (preservation) |",
        _enneagramMapping: "6"
    },
    teacher: {
        id: 'teacher',
        name: "The Teacher",
        category: 'STATIC',
        function: "Transmits truth and clarifies understanding",
        primaryAffects: ["CARE", "SEEKING"],
        states: {
            HIGH: {
                label: "The Illuminator Empowers",
                description: "others to think for themselves. Transmits wisdom that transforms. Makes the complex clear and alive.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Clear Explainer Patient",
                description: "instructor. Shares knowledge effectively. Helps others understand and grow.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Indoctrinator Dogmatic",
                description: "Preachy. 'I know better than you.' Confuses teaching with controlling. Creates followers, not thinkers.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "conscientiousness": 0.8, "openness": 0.8, "honestyHumility": 0.5, "agreeableness": 0.5 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Hierophant (transmission) |",
        _enneagramMapping: "1"
    },
    tamer: {
        id: 'tamer',
        name: "The Tamer",
        category: 'STATIC',
        function: "Gentles through presence, calms chaos",
        primaryAffects: ["CARE", "PLAY"],
        states: {
            HIGH: {
                label: "The Peaceful Warrior Powerful",
                description: "stillness that transforms tension without force. Courage through patience. Tames lions with presence, not dominance.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Calm Presence De",
                description: "escalates naturally. Brings groundedness to chaotic situations. Steady in the storm.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Doormat Passive",
                description: "Conflict-avoidant at all costs. Peace-at-any-price. Enables dysfunction by refusing to engage. Mistakes numbness for serenity.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "agreeableness": 0.8, "honestyHumility": 0.5, "openness": 0.5, "emotionality": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Strength |",
        _enneagramMapping: "9"
    },
    pioneer: {
        id: 'pioneer',
        name: "The Pioneer",
        category: 'DYNAMIC',
        function: "Explores unknown territory, breaks new ground",
        primaryAffects: ["SEEKING"],
        states: {
            HIGH: {
                label: "The Trailblazer Courageous",
                description: "explorer who opens frontiers for others to follow. Breaks new ground with purpose. Adventure in service of discovery.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Adventurer Pushes",
                description: "into new territory. Comfortable with uncertainty. Keeps things moving forward.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Escapist Can",
                description: "'t commit. Always chasing the next horizon. Abandons what's built. Mistakes running from for running toward.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "extraversion": 0.8, "openness": 0.8, "emotionality": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Fool + Chariot |",
        _enneagramMapping: "7, 8"
    },
    strategist: {
        id: 'strategist',
        name: "The Strategist",
        category: 'DYNAMIC',
        function: "Maps optimal paths and calculates routes",
        primaryAffects: ["SEEKING"],
        states: {
            HIGH: {
                label: "The Master Navigator Finds",
                description: "the path no one else sees. Brilliant tactical and strategic mind in service of meaningful goals.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Effective Planner Calculates",
                description: "routes. Weighs options. Finds efficient paths forward. Gets from A to B.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Manipulator Over",
                description: "plans, never acts. Uses strategy as defense against uncertainty. Chess-player who treats people as pieces.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "conscientiousness": 0.8, "openness": 0.8, "extraversion": 0.5 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Magician (planning) |",
        _enneagramMapping: "3, 5"
    },
    activist: {
        id: 'activist',
        name: "The Activist",
        category: 'DYNAMIC',
        function: "Removes obstacles and fights for change",
        primaryAffects: ["RAGE"],
        states: {
            HIGH: {
                label: "The Righteous Warrior Channels",
                description: "anger into justice. Fights the right battles for the right reasons. Removes real obstacles. Changes what needs changing.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Determined Fighter Pushes",
                description: "through resistance. Advocates for what matters. Doesn't back down easily.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Destroyer Angry",
                description: "at everything. Burns bridges indiscriminately. Can't distinguish worthy",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "honestyHumility": 0.8, "conscientiousness": 0.8, "openness": 0.5, "agreeableness": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Chariot (combat) |",
        _enneagramMapping: "8, 1"
    },
    networker: {
        id: 'networker',
        name: "The Networker",
        category: 'DYNAMIC',
        function: "Weaves connections and creates opportunity",
        primaryAffects: ["CARE", "SEEKING"],
        states: {
            HIGH: {
                label: "The Generous Connector Creates",
                description: "value by bringing the right people together. Builds bridges that benefit everyone. Weaves communities.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Social Weaver Naturally",
                description: "connects people and opportunities. Builds and maintains relationships. Knows who to call.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Collector Transactional",
                description: "Collects people as assets. Superficial relationships. Can't go deep. Confuses contacts for connections.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "extraversion": 0.8, "agreeableness": 0.8, "openness": 0.8 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Lovers (social aspect) |",
        _enneagramMapping: "2, 7"
    },
    trickster: {
        id: 'trickster',
        name: "The Trickster",
        category: 'DYNAMIC',
        function: "Disrupts stagnation and injects necessary chaos",
        primaryAffects: ["SEEKING", "PLAY"],
        states: {
            HIGH: {
                label: "The Sacred Fool Speaks",
                description: "truth through humor. Breaks necessary rules for liberation. Disrupts stagnation in service of growth. The holy jester.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Playful Disruptor Questions",
                description: "assumptions. Pokes holes in certainty. Keeps things from getting too rigid. Makes people laugh.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Chaos Agent Destroys",
                description: "without purpose. Cruel humor. Can't be serious when it matters. Mistakes destruction for freedom.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "openness": 0.8, "extraversion": 0.5, "honestyHumility": -0.6, "conscientiousness": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Wheel of Fortune + Fool (shadow) |",
        _enneagramMapping: "7"
    },
    lover: {
        id: 'lover',
        name: "The Lover",
        category: 'DYNAMIC',
        function: "Bonds through desire, creates union",
        primaryAffects: ["CARE", "LUST"],
        states: {
            HIGH: {
                label: "The Sacred Partner Creates",
                description: "profound union that transforms both parties. Loves without losing self. Bonding as mutual awakening.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Passionate Connector Builds",
                description: "intimacy. Draws people close. Creates warmth and attraction. Bonds deeply.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Obsessive Possessive",
                description: "Loses self in other. Seductive manipulation. Confuses intensity for intimacy. Love as consumption.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "emotionality": 0.8, "extraversion": 0.8, "agreeableness": 0.8, "openness": 0.8 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Lovers |",
        _enneagramMapping: "2, 4, 9"
    },
    alchemist: {
        id: 'alchemist',
        name: "The Alchemist",
        category: 'UPDATER',
        function: "Transmutes loss into new form",
        primaryAffects: ["SEEKING", "PANIC", "GRIEF"],
        states: {
            HIGH: {
                label: "The Transmuter Transforms",
                description: "suffering into wisdom and growth for self and others. Finds gold in the ashes. The wound becomes the gift.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Processor Metabolizes",
                description: "loss and difficulty. Finds meaning in pain. Moves through rather than around.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Wound",
                description: "Dweller Wallows in pain. Addicted to crisis. Manufactures suffering to feel alive. Identity fused with trauma.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "emotionality": 0.8, "openness": 0.8, "agreeableness": 0.5 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Death |",
        _enneagramMapping: "4"
    },
    mystic: {
        id: 'mystic',
        name: "The Mystic",
        category: 'UPDATER',
        function: "Sees hidden patterns and holds paradox",
        primaryAffects: ["SEEKING"],
        states: {
            HIGH: {
                label: "The Seer Sees",
                description: "through to truth and brings back insight that transforms. Holds paradox without collapse. Pattern recognition in service of wisdom.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Pattern",
                description: "Seer Perceives what others miss. Intuitive. Comfortable with mystery and ambiguity. Sees the code beneath.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Lost One Disconnected",
                description: "from reality. Cryptic. Paranoid pattern-matching. Sees patterns that aren't there. Wisdom as escape.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "openness": 0.8, "conscientiousness": 0.5, "extraversion": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "High Priestess + Moon |",
        _enneagramMapping: "5, 4"
    },
    sage: {
        id: 'sage',
        name: "The Sage",
        category: 'UPDATER',
        function: "Holds the long view and accepts endings",
        primaryAffects: [],
        states: {
            HIGH: {
                label: "The Wise Elder Helps",
                description: "others accept what is and see what truly matters. Holds perspective that transcends urgency. Wisdom in service of life.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Long",
                description: "View Thinker Patient perspective. Sees beyond the immediate. Knows what passes and what endures.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Detached One Uses",
                description: "wisdom as superiority. Checked out of life. Nihilistic. Mistakes withdrawal for transcendence.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "honestyHumility": 0.8, "openness": 0.8, "conscientiousness": 0.5, "emotionality": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Hermit |",
        _enneagramMapping: "5, 9"
    },
    healer: {
        id: 'healer',
        name: "The Healer",
        category: 'UPDATER',
        function: "Restores wholeness after crisis",
        primaryAffects: ["CARE"],
        states: {
            HIGH: {
                label: "The Restorer Facilitates",
                description: "genuine healing through presence and skill. Restores wholeness without creating dependency. The wounded healer.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Tender Tends",
                description: "wounds physical, emotional, relational. Supports recovery. Creates conditions for healing.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Fixer Fixes",
                description: "people who don't want fixing. Needs others broken to feel useful. Creates dependency. Healing as control.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "emotionality": 0.8, "agreeableness": 0.8, "openness": 0.8 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Star |",
        _enneagramMapping: "2, 9"
    },
    artist: {
        id: 'artist',
        name: "The Artist",
        category: 'UPDATER',
        function: "Expresses from depth, creates from wound",
        primaryAffects: ["CARE", "PANIC", "GRIEF"],
        states: {
            HIGH: {
                label: "The Authentic Creator Transforms",
                description: "inner experience into work that awakens others. Creates truth, not performance. Art as transmission.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Expressive One Makes",
                description: "meaning through form. Channels feeling into creation. Gives shape to the ineffable.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Performer Self",
                description: "indulgent. Creates for attention, not truth. Confuses drama for depth. Navel-gazing as art.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "emotionality": 0.8, "openness": 0.8, "conscientiousness": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "None (pure creative force) |",
        _enneagramMapping: "4"
    },
    shapeshifter: {
        id: 'shapeshifter',
        name: "The Shapeshifter",
        category: 'UPDATER',
        function: "Transforms self to adapt to any situation",
        primaryAffects: ["SEEKING", "PLAY"],
        states: {
            HIGH: {
                label: "The Fluid Master Becomes",
                description: "what any situation needs without losing core. Adaptive genius. Water that fits any container yet remains water.",
                guidance: "TBD",
                nudges: []
            },
            BASE: {
                label: "The Adapter Flexible",
                description: "responder. Adjusts to context. Survives and thrives through change. Reads the room.",
                guidance: "TBD",
                nudges: []
            },
            LOW: {
                label: "The Chameleon No",
                description: "core self. Changes to please. Manipulates through mirroring. Can't be pinned down because there's nothing there.",
                guidance: "Check your blindspots.",
                nudges: []
            }
        },
        hexacoCorrelates: { "openness": 0.8, "extraversion": 0.5, "agreeableness": 0.5, "conscientiousness": -0.6 },
        catProfile: { clarity: 0, agency: 0, trust: 0 },
        _tarotMapping: "Wheel of Fortune (adaptation) |",
        _enneagramMapping: "3, 9"
    },
};


export function getArchetype(id: ArchetypeId): ArchetypeDefinition {
    return ARCHETYPES[id];
}

export function getArchetypesByCategory(category: ArchetypeDefinition['category']): ArchetypeDefinition[] {
    return Object.values(ARCHETYPES).filter(a => a.category === category);
}
