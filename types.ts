
export enum CaseDifficulty {
    EASY = 1,
    MEDIUM = 2,
    HARD = 3,
    EXPERT = 4,
    MASTER = 5
}

export enum CaseCategory {
    CLASSICAL = "classical_probability",
    INDEPENDENT = "independent_events",
    CONDITIONAL = "conditional_probability",
    EXPECTATION = "expectation",
    BINOMIAL = "binomial",
    COMBINED = "combined"
}

export interface Clue {
    id: string;
    type: 'camera' | 'alibi' | 'evidence' | 'witness' | 'technical' | 'statistics' | 'results' | 'test' | 'database' | 'forensics' | 'pattern' | 'motive' | 'synthesis' | 'rules' | 'system' | 'witnesses' | 'document' | 'map';
    title: string;
    icon: string;
    content: string;
    data?: {
        description: string;
    };
}

export interface Suspect {
    id: string;
    name: string;
    age: number;
    avatar: string;
    attributes: Record<string, string | boolean | number>;
}

export interface Hint {
    level: 1 | 2 | 3;
    cost: number;
    text: string;
}

export interface Case {
    id: string;
    title: string;
    difficulty: CaseDifficulty;
    category: CaseCategory;
    timeLimit: number;
    location: string;
    description: string;
    image: string;
    clues: Clue[];
    suspects: Suspect[];
    hints: Hint[]; // New: Hint system
    unlockRequirements?: { // New: Progression system
        minSolvedCases: number;
    };
    solution: {
        guilty: string;
        probability: number;
        steps: { step: number; formula: string; result: number | string; explanation: string }[];
        explanation: string;
    };
}

export interface PlayerState {
    name: string;
    rank: string;
    coins: number;
    level: number;
    xp: number;
    unlockedAchievements: string[];
}

export interface CaseProgress {
    timeLeft: number;
    unlockedHints: number[];
    notebookContent: string;
    suspectProbabilities: Record<string, number>;
    revealedClues: number;
}

export interface CaseState {
    completed: boolean;
    score: number;
    attempts: number;
    progress?: CaseProgress; // Persist data between sessions
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    condition: (player: PlayerState, cases: Record<string, CaseState>) => boolean;
}

export interface Formula {
    id: string;
    title: string;
    expression: string;
    description: string;
    category: CaseCategory;
}
