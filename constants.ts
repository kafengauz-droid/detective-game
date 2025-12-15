
import { Case, CaseDifficulty, CaseCategory, Formula, Achievement } from './types';

export const FORMULAS: Formula[] = [
    {
        id: 'classical',
        title: 'הסתברות קלאסית',
        expression: 'P(A) = n(A) / n(S)',
        description: 'מספר התוצאות הרצויות חלקי סך כל התוצאות האפשריות במרחב המדגם.',
        category: CaseCategory.CLASSICAL
    },
    {
        id: 'complement',
        title: 'הסתברות משלימה',
        expression: 'P(A\') = 1 - P(A)',
        description: 'ההסתברות שאירוע לא יקרה שווה לאחת פחות ההסתברות שהוא כן יקרה.',
        category: CaseCategory.CLASSICAL
    },
    {
        id: 'independent',
        title: 'אירועים בלתי תלויים',
        expression: 'P(A ∩ B) = P(A) × P(B)',
        description: 'ההסתברות ששני אירועים בלתי תלויים יקרו יחד היא מכפלת ההסתברויות שלהם.',
        category: CaseCategory.INDEPENDENT
    },
    {
        id: 'conditional',
        title: 'הסתברות מותנית',
        expression: 'P(A|B) = P(A ∩ B) / P(B)',
        description: 'ההסתברות ל-A בהינתן ש-B קרה.',
        category: CaseCategory.CONDITIONAL
    },
    {
        id: 'bayes',
        title: 'חוק בייס',
        expression: 'P(A|B) = [P(B|A) × P(A)] / P(B)',
        description: 'נוסחה לעדכון הסתברויות על בסיס מידע חדש.',
        category: CaseCategory.CONDITIONAL
    },
    {
        id: 'expectation',
        title: 'תוחלת',
        expression: 'E(X) = Σ [x × P(x)]',
        description: 'הממוצע המשוקלל של כל התוצאות האפשריות (רווח/הפסד * סיכוי).',
        category: CaseCategory.EXPECTATION
    },
    {
        id: 'binomial',
        title: 'התפלגות בינומית',
        expression: 'P(k) = C(n,k) × p^k × (1-p)^(n-k)',
        description: 'הסתברות ל-k הצלחות מתוך n ניסויים בלתי תלויים.',
        category: CaseCategory.BINOMIAL
    }
];

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_solve',
        title: 'בלש מתחיל',
        description: 'פתור את התיק הראשון שלך',
        icon: '🥉',
        condition: (p, c) => Object.values(c).filter(x => x.completed).length >= 1
    },
    {
        id: 'rich_detective',
        title: 'חוקר עשיר',
        description: 'צבור 1500 מטבעות',
        icon: '💰',
        condition: (p, c) => p.coins >= 1500
    },
    {
        id: 'halfway',
        title: 'אמצע הדרך',
        description: 'פתור 6 תיקים',
        icon: '⚖️',
        condition: (p, c) => Object.values(c).filter(x => x.completed).length >= 6
    },
    {
        id: 'master_mind',
        title: 'מוח קרימינלי',
        description: 'הגיע לרמה 10',
        icon: '🧠',
        condition: (p, c) => p.level >= 10
    },
    {
        id: 'legend',
        title: 'שרלוק הולמס הבא',
        description: 'פתור את כל 12 התיקים',
        icon: '👑',
        condition: (p, c) => Object.values(c).filter(x => x.completed).length >= 12
    }
];

export const CASES_DATA: Record<string, Case> = {
    // --- EASY (CLASSICAL) ---
    case_001: {
        id: "case_001",
        title: "צבע על הקיר",
        difficulty: CaseDifficulty.EASY,
        category: CaseCategory.CLASSICAL,
        timeLimit: 900,
        location: "downtown",
        description: "על קיר בית הספר הופיעה גרפיטי. המצלמה תיעדה אדם עם תיק גב כחול בשעה 23:00.",
        image: "🎨",
        unlockRequirements: { minSolvedCases: 0 },
        hints: [
            { level: 1, cost: 15, text: "חשב את סך כל התלמידים הרלוונטיים לאחר הפחתת אלו עם האליבי." },
            { level: 2, cost: 25, text: "אם ל-20 תלמידים *עם תיק כחול* יש אליבי, כמה נשארו ברשימת החשודים?" },
            { level: 3, cost: 40, text: "הנוסחה היא 1 חלקי (סך בעלי תיק כחול פחות בעלי אליבי)." }
        ],
        clues: [
            { id: "clue_1", type: "camera", title: "הקלטת מצלמה", icon: "📷", content: "המצלמה תיעדה אדם עם תיק גב כחול", data: { description: "בבית הספר 600 תלמידים. ל-45 תלמידים יש תיקי גב כחולים." } },
            { id: "clue_2", type: "alibi", title: "בדיקת אליבי", icon: "📋", content: "בדיקת אליבי לבעלי תיקים כחולים", data: { description: "מתוך בעלי התיק הכחול:\n15 היו באירוע כיתתי.\nל-5 נוספים יש אליבי מאומת בבית." } }
        ],
        suspects: [
            { id: "suspect_a", name: "אלכס כהן", age: 17, avatar: "👤", attributes: { "תיק גב": "כחול", "אליבי": "אין" } },
            { id: "suspect_b", name: "בוריס לוי", age: 16, avatar: "👤", attributes: { "תיק גב": "כחול", "אליבי": "יש" } }, 
            { id: "suspect_c", name: "ויקטור דוד", age: 17, avatar: "👤", attributes: { "תיק גב": "אדום", "אליבי": "יש" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.04,
            steps: [
                { step: 1, formula: "P(כחול) = 45/600", result: 0.075, explanation: "ההסתברות הראשונית ללא סינון." },
                { step: 2, formula: "חשודים רלוונטים = 45 - 20 = 25", result: 25, explanation: "מתוך 45 בעלי תיק, ל-20 (15+5) יש אליבי." },
                { step: 3, formula: "P(אשם) = 1/25 = 0.04", result: 0.04, explanation: "מתוך הקבוצה המצומצמת, לכל אחד סיכוי של 4%." }
            ],
            explanation: "אלכס הוא היחיד ברשימה שאין לו אליבי ויש לו תיק כחול. הוא חלק מהקבוצה של ה-25 החשודים."
        }
    },
    case_002: {
        id: "case_002",
        title: "הטלפון הנעלם",
        difficulty: CaseDifficulty.EASY,
        category: CaseCategory.CLASSICAL,
        timeLimit: 900,
        location: "downtown",
        description: "מחדר המורים נעלם טלפון יקר. באותו יום בחדר היו רק מורי מתמטיקה, פיזיקה והיסטוריה.",
        image: "📱",
        unlockRequirements: { minSolvedCases: 0 },
        hints: [
            { level: 1, cost: 15, text: "התמקד רק במורים שיש להם עט אדום." },
            { level: 2, cost: 25, text: "כמה מורים סה״כ מחזיקים בעט אדום בכל המחלקות?" },
            { level: 3, cost: 40, text: "הסתברות = (מורים במחלקה עם עט) / (סך הכל מורים עם עט)." }
        ],
        clues: [
            { id: "clue_1", type: "evidence", title: "רשימת מורים", icon: "📋", content: "רשימת כל המורים שהיו בחדר", data: { description: "מחלקת מתמטיקה: 8 מורים\nמחלקת פיזיקה: 5 מורים\nמחלקת היסטוריה: 7 מורים" } },
            { id: "clue_2", type: "evidence", title: "עט אדום", icon: "🖊️", content: "על הרצפה נמצא עט אדום מסוג Pilot", data: { description: "• 3 מורי מתמטיקה יש עטים כאלה\n• 1 מורה פיזיקה יש עט כזה\n• 2 מורי היסטוריה יש עטים כאלה" } }
        ],
        suspects: [
            { id: "suspect_a", name: "ד״ר שרה (נציגת מתמטיקה)", age: 35, avatar: "👩", attributes: { "מחלקה": "מתמטיקה", "עט אדום": "יש" } },
            { id: "suspect_b", name: "פרופ׳ דוד (נציג פיזיקה)", age: 42, avatar: "👨", attributes: { "מחלקה": "פיזיקה", "עט אדום": "יש" } },
            { id: "suspect_c", name: "מר יוסי (נציג היסטוריה)", age: 38, avatar: "👨", attributes: { "מחלקה": "היסטוריה", "עט אדום": "יש" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.50,
            steps: [
                { step: 1, formula: "סה״כ חשודים עם עט = 3+1+2 = 6", result: 6, explanation: "צמצום מרחב המדגם רק לבעלי עטים." },
                { step: 2, formula: "P(מתמטיקה | עט) = 3/6", result: 0.50, explanation: "חצי מבעלי העטים הם ממחלקה זו." },
                { step: 3, formula: "P(פיזיקה | עט) = 1/6", result: 0.16, explanation: "סיכוי נמוך משמעותית." }
            ],
            explanation: "ההסתברות שהגנב הוא מורה למתמטיקה (50%) גבוהה משמעותית מכל מחלקה אחרת."
        }
    },

    // --- MEDIUM (INDEPENDENT & CONDITIONAL) ---
    case_003: {
        id: "case_003",
        title: "הפריצה השקטה",
        difficulty: CaseDifficulty.MEDIUM,
        category: CaseCategory.INDEPENDENT,
        timeLimit: 1200,
        location: "hitech",
        description: "כספת בחברת הייטק נפרצה. הכספת מוגנת ע״י שני מנגנונים בלתי תלויים: סורק עין וקוד דיגיטלי.",
        image: "🔐",
        unlockRequirements: { minSolvedCases: 0 },
        hints: [
            { level: 1, cost: 15, text: "כדי לפרוץ, צריך לעבור את שתי המערכות בו זמנית." },
            { level: 2, cost: 25, text: "אם האירועים בלתי תלויים, מכפילים את הסיכויים שלהם." },
            { level: 3, cost: 40, text: "השווה: מה הסיכוי של מי שמנחש את שניהם, מול מי שיש לו כבר את הקוד?" }
        ],
        clues: [
            { id: "clue_1", type: "technical", title: "מפרט אבטחה", icon: "🛡️", content: "נתוני יצרן על כשלי אבטחה", data: { description: "• סיכוי לכשל בסורק עין: 1 ל-100 (0.01)\n• סיכוי לניחוש קוד: 1 ל-50 (0.02)" } },
            { id: "clue_2", type: "witness", title: "עדויות עובדים", icon: "🗣️", content: "חקירת הרקע של החשודים", data: { description: "רון: 'סתם לחצתי'.\nדן: האקר שידוע שפרץ את מסד הנתונים של הקודים (יש לו את הקוד).\nגל: עובד ניקיון." } }
        ],
        suspects: [
            { id: "suspect_a", name: "רון (מהמר)", age: 25, avatar: "🎲", attributes: { "מיומנות": "מזל בלבד", "קוד גישה": "אין" } },
            { id: "suspect_b", name: "דן (האקר)", age: 22, avatar: "💻", attributes: { "מיומנות": "פריצת קודים", "קוד גישה": "יש" } },
            { id: "suspect_c", name: "גל (מנקה)", age: 40, avatar: "🧹", attributes: { "מיומנות": "אין", "קוד גישה": "אין" } }
        ],
        solution: {
            guilty: "suspect_b",
            probability: 0.01,
            steps: [
                { step: 1, formula: "P(רון) = 0.01 * 0.02", result: 0.0002, explanation: "רון מסתמך על מזל בשתי המערכות." },
                { step: 2, formula: "P(דן) = 0.01 * 1.0", result: 0.01, explanation: "לדן יש את הקוד (100%), צריך רק מזל בסורק העין." },
                { step: 3, formula: "0.01 > 0.0002", result: "פי 50", explanation: "הסיכוי של דן גבוה משמעותית." }
            ],
            explanation: "מכיוון שדן עקף את מנגנון הקוד, הסיכוי שלו גבוה פי 50 משל האחרים."
        }
    },
    case_004: {
        id: "case_004",
        title: "החבלה ברכב",
        difficulty: CaseDifficulty.MEDIUM,
        category: CaseCategory.INDEPENDENT,
        timeLimit: 1200,
        location: "industrial",
        description: "מכונית מרוץ התרסקה כי גם הבלמים וגם ההגה כשלו בו זמנית. האם זה צירוף מקרים נדיר או חבלה?",
        image: "🏎️",
        unlockRequirements: { minSolvedCases: 0 },
        hints: [
            { level: 1, cost: 15, text: "חשב את ההסתברות ששתי התקלות יקרו במקרה בו זמנית." },
            { level: 2, cost: 25, text: "השתמש בנוסחת כפל מאורעות בלתי תלויים." },
            { level: 3, cost: 40, text: "אם התוצאה נמוכה מאוד, החשד לחבלה מכוונת עולה." }
        ],
        clues: [
            { id: "clue_1", type: "technical", title: "דוח מוסך", icon: "🔧", content: "הסתברות לתקלות בלאי רגילות", data: { description: "סיכוי לכשל בבלמים: 0.05 (5%)\nסיכוי לכשל בהגה: 0.02 (2%)" } },
            { id: "clue_2", type: "witness", title: "המכונאי", icon: "👨‍🔧", content: "עדות המכונאי הראשי", data: { description: "המכונאי המתחרה נראה מתעסק עם הרכב בלילה לפני המרוץ." } }
        ],
        suspects: [
            { id: "suspect_a", name: "צירוף מקרים", age: 0, avatar: "🎲", attributes: { "מניע": "אין" } },
            { id: "suspect_b", name: "מקס (מתחרה)", age: 30, avatar: "👿", attributes: { "מניע": "ניצחון", "גישה לרכב": "כן" } }
        ],
        solution: {
            guilty: "suspect_b",
            probability: 0.001,
            steps: [
                { step: 1, formula: "P(Brake) * P(Steering)", result: "נוסחה", explanation: "מאורעות בלתי תלויים" },
                { step: 2, formula: "0.05 * 0.02", result: 0.001, explanation: "סיכוי של 1 ל-1000 שזה קרה במקרה." },
                { step: 3, formula: "מסקנה", result: "חבלה", explanation: "הסבירות לחבלה גבוהה יותר מצירוף מקרים נדיר כזה." }
            ],
            explanation: "הסיכוי לתקלה כפולה הוא 0.1% בלבד. נוכחות המתחרה ליד הרכב הופכת את החבלה לאפשרות הסבירה."
        }
    },
    case_005: {
        id: "case_005",
        title: "הרעלת המזון",
        difficulty: CaseDifficulty.MEDIUM,
        category: CaseCategory.CONDITIONAL,
        timeLimit: 1200,
        location: "restaurant",
        description: "בחתונת העיר, 10 אורחים חשו ברע. הוגשו שתי מנות עיקריות: דג וסטייק. מי מהמנות הייתה מקולקלת?",
        image: "🍽️",
        unlockRequirements: { minSolvedCases: 0 },
        hints: [
            { level: 1, cost: 15, text: "אל תסתכל רק על מספר החולים, אלא על האחוזים מתוך מי שאכל." },
            { level: 2, cost: 25, text: "חשב P(Sick | Fish) ו-P(Sick | Steak)." },
            { level: 3, cost: 40, text: "חלק את מספר החולים שאכלו מנה מסוימת בסך כל האוכלים של אותה מנה." }
        ],
        clues: [
            { id: "clue_1", type: "statistics", title: "רשימת אורחים", icon: "📋", content: "מי אכל מה?", data: { description: "סה״כ אורחים: 100 (כל אורח בחר מנה אחת בלבד).\nאוכלי דג: 20.\nאוכלי סטייק: 80." } },
            { id: "clue_2", type: "results", title: "דוח רפואי", icon: "🤢", content: "מי חלה?", data: { description: "סה״כ חולים: 10.\nמתוך החולים: 8 אכלו דג, 2 אכלו סטייק." } }
        ],
        suspects: [
            { id: "suspect_a", name: "שף הדגים", age: 40, avatar: "🐟", attributes: { "מנה אחראית": "דג סלמון" } },
            { id: "suspect_b", name: "שף הבשרים", age: 45, avatar: "🥩", attributes: { "מנה אחראית": "סטייק אנטריקוט" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.40,
            steps: [
                { step: 1, formula: "P(Sick|Fish) = 8/20", result: 0.40, explanation: "40% מאוכלי הדג חלו." },
                { step: 2, formula: "P(Sick|Steak) = 2/80", result: 0.025, explanation: "רק 2.5% מאוכלי הסטייק חלו." },
                { step: 3, formula: "0.40 >> 0.025", result: "דג", explanation: "הדג הוא המקור המובהק להרעלה." }
            ],
            explanation: "למרות שרוב האורחים אכלו סטייק, אחוז התחלואה בקרב אוכלי הדג גבוה פי 16."
        }
    },
    case_006: {
        id: "case_006",
        title: "שוד בגשם",
        difficulty: CaseDifficulty.MEDIUM,
        category: CaseCategory.CONDITIONAL,
        timeLimit: 1300,
        location: "downtown",
        description: "שוד אירע ברחוב ראשי. העד טוען שירד גשם ולכן לא ראה טוב. הסטטיסטיקה מראה קשר בין גשם לשודים.",
        image: "🌧️",
        unlockRequirements: { minSolvedCases: 0 },
        hints: [
            { level: 1, cost: 15, text: "בדוק את מזג האוויר ואת ההסתברות לשוד בהינתן גשם." },
            { level: 2, cost: 25, text: "האם תנאי הגשם מתאימים לפרופיל של אחת הכנופיות?" },
            { level: 3, cost: 40, text: "השווה P(Robbery|Rain) ל-P(Robbery|Sun)." }
        ],
        clues: [
            { id: "clue_1", type: "statistics", title: "דוח משטרתי", icon: "📊", content: "סטטיסטיקת פשיעה שנתית", data: { description: "ביום גשום: סיכוי של 20% לשוד.\nביום שמש: סיכוי של 5% לשוד." } },
            { id: "clue_2", type: "system", title: "דיווח מטאורולוגי", icon: "🌦️", content: "נתוני מזג אוויר בזמן אמת", data: { description: "בשעת השוד נמדדו משקעים כבדים (גשם שוטף)." } }
        ],
        suspects: [
            { id: "suspect_a", name: "הכנופיה הרטובה", age: 20, avatar: "🧥", attributes: { "שיטה": "פועלים בגשם" } },
            { id: "suspect_b", name: "שודדי השמש", age: 25, avatar: "🕶️", attributes: { "שיטה": "פועלים בקיץ" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.20,
            steps: [
                { step: 1, formula: "P(Rob|Rain) = 0.2", result: 0.2, explanation: "נתון מהדוח." },
                { step: 2, formula: "P(Rob|Sun) = 0.05", result: 0.05, explanation: "נתון מהדוח." },
                { step: 3, formula: "מסקנה", result: "גשם", explanation: "הסבירות לשוד עולה פי 4 בגשם, מה שתומך בגרסת הכנופיה הרטובה." }
            ],
            explanation: "מזג האוויר המאומת (גשם) מעלה משמעותית את הסבירות לפעולה של 'הכנופיה הרטובה' לעומת כנופיות אחרות."
        }
    },

    // --- HARD (EXPECTATION & BINOMIAL) ---
    case_007: {
        id: "case_007",
        title: "ההצתה בחנות",
        difficulty: CaseDifficulty.HARD,
        category: CaseCategory.EXPECTATION,
        timeLimit: 1400,
        location: "commercial",
        description: "חנות אלקטרוניקה נשרפה יום אחרי שהבעלים הכפיל את הביטוח. האם זה משתלם לו כלכלית (תוחלת)?",
        image: "🔥",
        unlockRequirements: { minSolvedCases: 6 },
        hints: [
            { level: 1, cost: 15, text: "חשב את התוחלת (E) של הרווח מהשרפה." },
            { level: 2, cost: 25, text: "תוחלת = (סכום הביטוח) - (שווי הסחורה האמיתי)." },
            { level: 3, cost: 40, text: "אם התוחלת חיובית וגבוהה, יש מניע חזק." }
        ],
        clues: [
            { id: "clue_1", type: "document", title: "פוליסת ביטוח", icon: "📄", content: "פרטי הכיסוי הביטוחי", data: { description: "פיצוי במקרה שרפה: 2,000,000 ש״ח.\nעלות הפוליסה: 50,000 ש״ח." } },
            { id: "clue_2", type: "forensics", title: "דוח שמאי", icon: "🔍", content: "שווי החנות בפועל", data: { description: "סחורה במחסן: שווה רק 200,000 ש״ח (ישנה).\nחובות לספקים: 1,000,000 ש״ח." } }
        ],
        suspects: [
            { id: "suspect_a", name: "בעל החנות", age: 55, avatar: "👨‍💼", attributes: { "חובות": "גבוהים", "ביטוח": "חדש" } },
            { id: "suspect_b", name: "קצר חשמלי", age: 0, avatar: "⚡", attributes: { "הסתברות טבעית": "נמוכה" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.95,
            steps: [
                { step: 1, formula: "רווח = ביטוח - שווי", result: "חישוב", explanation: "2M - 0.2M = 1.8M רווח פוטנציאלי." },
                { step: 2, formula: "חובות = 1M", result: "כיסוי", explanation: "הרווח מכסה את כל החובות ומשאיר עודף משמעותי." },
                { step: 3, formula: "תוחלת פשע חיובית", result: "מניע", explanation: "המניע הכלכלי (Expectation) ברור ומובהק." }
            ],
            explanation: "השריפה הצילה את הבעלים מפשיטת רגל והניבה רווח עצום. התוחלת הכלכלית מצביעה בבירור על הצתה מכוונת."
        }
    },
    case_008: {
        id: "case_008",
        title: "מסלול המבריח",
        difficulty: CaseDifficulty.HARD,
        category: CaseCategory.EXPECTATION,
        timeLimit: 1400,
        location: "border",
        description: "מבריח יהלומים נתפס. הוא צריך לבחור בין שני נתיבי מילוט. איזה נתיב יבחר מבריח רציונלי?",
        image: "💎",
        unlockRequirements: { minSolvedCases: 6 },
        hints: [
            { level: 1, cost: 15, text: "חשב את 'ערך התוחלת' של כל נתיב." },
            { level: 2, cost: 25, text: "E = (רווח * סיכוי הצלחה) - (קנס * סיכוי תפיסה)." },
            { level: 3, cost: 40, text: "הנתיב עם הערך הגבוה יותר הוא הנתיב הנבחר." }
        ],
        clues: [
            { id: "clue_1", type: "map", title: "נתיב ההרים", icon: "🏔️", content: "קשה אך רווחי", data: { description: "שווי סחורה: 500,000.\nסיכוי הצלחה: 0.8.\nקנס בתפיסה: -100,000." } },
            { id: "clue_2", type: "map", title: "נתיב הים", icon: "🌊", content: "קל אך מסוכן", data: { description: "שווי סחורה: 500,000.\nסיכוי הצלחה: 0.5.\nקנס בתפיסה: -50,000." } }
        ],
        suspects: [
            { id: "suspect_a", name: "נתיב ההרים", age: 0, avatar: "🏔️", attributes: { "סיכון": "בינוני" } },
            { id: "suspect_b", name: "נתיב הים", age: 0, avatar: "🌊", attributes: { "סיכון": "גבוה" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.80,
            steps: [
                { step: 1, formula: "E(הרים) = 0.8*500k + 0.2*(-100k)", result: 380000, explanation: "400,000 - 20,000 = 380,000" },
                { step: 2, formula: "E(ים) = 0.5*500k + 0.5*(-50k)", result: 225000, explanation: "250,000 - 25,000 = 225,000" },
                { step: 3, formula: "380k > 225k", result: "הרים", explanation: "נתיב ההרים משתלם משמעותית יותר." }
            ],
            explanation: "מבריח רציונלי יבחר בנתיב ההרים שבו תוחלת הרווח גבוהה בכ-70% מנתיב הים."
        }
    },
    case_009: {
        id: "case_009",
        title: "המטבע המכושף",
        difficulty: CaseDifficulty.HARD,
        category: CaseCategory.BINOMIAL,
        timeLimit: 1500,
        location: "casino",
        description: "בקזינו נתפס שחקן שניצח 8 פעמים מתוך 10 בהטלת מטבע 'עץ או פלי', כשהוא תמיד מהמר על עץ. האם הוא רמאי?",
        image: "🎲",
        unlockRequirements: { minSolvedCases: 6 },
        hints: [
            { level: 1, cost: 15, text: "השתמש בנוסחת ברנולי (התפלגות בינומית) לחישוב הסיכוי." },
            { level: 2, cost: 25, text: "n=10 (מספר הניסויים), k=8 (הצלחות), p=0.5 (סיכוי להצלחה בודדת)." },
            { level: 3, cost: 40, text: "הנוסחה: C(10,8) * 0.5^8 * 0.5^2" }
        ],
        clues: [
            { id: "clue_1", type: "statistics", title: "היסטוריית משחק", icon: "📊", content: "תיעוד המשחקים של החשוד", data: { description: "החשוד שיחק סבב אחד של 10 הטלות.\nתוצאות: 8 עץ, 2 פלי." } },
            { id: "clue_2", type: "forensics", title: "בדיקת המטבע", icon: "🔬", content: "מעבדת המזפ בדקה את המטבע", data: { description: "המטבע נראה תקני, אך שקילה מדויקת מראה סטייה של 0.2 גרם." } }
        ],
        suspects: [
            { id: "suspect_a", name: "מר 'מזל'", age: 50, avatar: "🎩", attributes: { "טענה": "סתם מזל", "נצחונות": "8/10" } },
            { id: "suspect_b", name: "הדילר", age: 30, avatar: "🤵", attributes: { "טענה": "המטבע הוגן" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.044,
            steps: [
                { step: 1, formula: "n=10, k=8, p=0.5", result: "נתונים", explanation: "זיהוי הפרמטרים לנוסחת ברנולי." },
                { step: 2, formula: "C(10,8) = 45", result: 45, explanation: "מספר הצירופים האפשריים ל-8 הצלחות." },
                { step: 3, formula: "P = 45 * (0.5)^10", result: 0.0439, explanation: "הסיכוי שזה יקרה במקרה הוא כ-4.4% בלבד." }
            ],
            explanation: "הסיכוי לקבל 8 עצים מתוך 10 הטלות במטבע הוגן הוא נמוך מאוד. בשילוב עם הראיה הפיזית, זהו חשד סביר לרמאות."
        }
    },
    case_010: {
        id: "case_010",
        title: "הצלף המזויף",
        difficulty: CaseDifficulty.HARD,
        category: CaseCategory.BINOMIAL,
        timeLimit: 1500,
        location: "industrial",
        description: "מתנקש טוען שהוא צלף עלית (90% פגיעה). במטווח הוא פגע רק ב-2 מתוך 5 מטרות. האם הוא מתחזה?",
        image: "🎯",
        unlockRequirements: { minSolvedCases: 6 },
        hints: [
            { level: 1, cost: 15, text: "חשב את ההסתברות שצלף עם 90% דיוק יפגע רק פעמיים." },
            { level: 2, cost: 25, text: "n=5, k=2, p=0.9. חשב את P(k=2)." },
            { level: 3, cost: 40, text: "אם הסיכוי אפסי, הוא כנראה משקר לגבי היכולות שלו." }
        ],
        clues: [
            { id: "clue_1", type: "test", title: "תוצאות מטווח", icon: "🎯", content: "ביצועים בזמן אמת", data: { description: "יריות: 5. פגיעות: 2. החטאות: 3." } },
            { id: "clue_2", type: "document", title: "הצהרת יכולת", icon: "📄", content: "מה הוא טוען", data: { description: "אני פוגע ב-90% מהמקרים (p=0.9)." } }
        ],
        suspects: [
            { id: "suspect_a", name: "המתנקש", age: 30, avatar: "🔫", attributes: { "מיומנות מוצהרת": "90%" } },
            { id: "suspect_b", name: "הרוח", age: 0, avatar: "🌬️", attributes: { "השפעת רוח": "זניחה" } }
        ],
        solution: {
            guilty: "suspect_a",
            probability: 0.99,
            steps: [
                { step: 1, formula: "C(5,2) * 0.9^2 * 0.1^3", result: "נוסחה", explanation: "בינומי: 2 הצלחות, 3 כשלונות." },
                { step: 2, formula: "10 * 0.81 * 0.001", result: 0.0081, explanation: "הסיכוי שצלף כזה יפגע רק פעמיים הוא 0.8%." },
                { step: 3, formula: "מסקנה", result: "מתחזה", explanation: "זה כמעט בלתי אפשרי סטטיסטית. הוא משקר." }
            ],
            explanation: "ההסתברות שצלף ברמה כזו יחטיא כל כך הרבה היא אפסית (פחות מ-1%). הוא מתחזה."
        }
    },

    // --- EXPERT/MASTER (BAYES & COMBINED) ---
    case_011: {
        id: "case_011",
        title: "החפרפרת",
        difficulty: CaseDifficulty.EXPERT,
        category: CaseCategory.CONDITIONAL, // Bayes
        timeLimit: 1800,
        location: "police_hq",
        description: "בדיקת פוליגרף (דיוק 95%) זיהתה שוטר כמרגל. רק 1 מ-100 הוא באמת מרגל. האם המכשיר צודק?",
        image: "🕵️",
        unlockRequirements: { minSolvedCases: 10 },
        hints: [
            { level: 1, cost: 20, text: "הזהר מ'כשל התובע'. הרוב הגדול של הנבדקים הם חפים מפשע." },
            { level: 2, cost: 30, text: "השתמש בחוק בייס. חשב P(Spy|Positive)." },
            { level: 3, cost: 50, text: "מונה: P(Pos|Spy)*P(Spy). מכנה: סך כל החיוביים (אמת ושקר)." }
        ],
        clues: [
            { id: "clue_1", type: "system", title: "נתוני פוליגרף", icon: "📠", content: "מפרט טכני", data: { description: "רגישות (זיהוי מרגל): 95%.\nהתרעת שווא (זיהוי חף מפשע כמרגל): 5%." } },
            { id: "clue_2", type: "statistics", title: "מודיעין", icon: "📉", content: "שכיחות באוכלוסיה", data: { description: "1 מתוך 100 שוטרים הוא מרגל (0.01)." } },
            { id: "clue_3", type: "forensics", title: "ראיות דיגיטליות", icon: "💻", content: "פעילות חשודה", data: { description: "זוהתה העברה בנקאית מוצפנת למחשב בדרג פיקודי גבוה." } }
        ],
        suspects: [
            { id: "suspect_a", name: "השוטר אזולאי", age: 45, avatar: "👮", attributes: { "תוצאת פוליגרף": "חיובי (נכשל)", "ראיות נוספות": "אין" } },
            { id: "suspect_b", name: "המפקד ג'ק", age: 55, avatar: "🕵️‍♂️", attributes: { "תוצאת פוליגרף": "שלילי", "ראיות נוספות": "העברה בנקאית" } }
        ],
        solution: {
            guilty: "suspect_b",
            probability: 0.16,
            steps: [
                { step: 1, formula: "מונה = 0.95 * 0.01", result: 0.0095, explanation: "סיכוי להיות מרגל וגם להתגלות." },
                { step: 2, formula: "מכנה = 0.0095 + (0.05 * 0.99)", result: 0.059, explanation: "סך כל התוצאות החיוביות." },
                { step: 3, formula: "P = 0.0095 / 0.059", result: 0.161, explanation: "הסיכוי שאזולאי מרגל הוא רק 16%!" }
            ],
            explanation: "למרות הפוליגרף, הסטטיסטיקה מראה שרוב הסיכויים (84%) שזו אזעקת שווא. הראיות הדיגיטליות מצביעות על המפקד ג'ק."
        }
    },
    case_012: {
        id: "case_012",
        title: "השוד הגדול",
        difficulty: CaseDifficulty.MASTER,
        category: CaseCategory.COMBINED,
        timeLimit: 2000,
        location: "bank",
        description: "הכספת הגדולה נפרצה. הפורץ היה צריך לעבור שומר (בינומי), קוד (בלתי תלוי) וגלאי תנועה (מותנה). האם זה היה אדם אחד?",
        image: "🏦",
        unlockRequirements: { minSolvedCases: 10 },
        hints: [
            { level: 1, cost: 20, text: "זהו תרגיל מסכם. פרק את הבעיה לשלושה שלבים." },
            { level: 2, cost: 30, text: "חשב את ההסתברות המצטברת להצלחה בכל שלושת השלבים ברצף." },
            { level: 3, cost: 50, text: "הכפל: P(PassGuard) * P(Code) * P(Motion|Rain)." }
        ],
        clues: [
            { id: "clue_1", type: "system", title: "השומרים", icon: "👮‍♂️", content: "שלב א'", data: { description: "יש 3 שומרים. לכל שומר 50% סיכוי לישון. צריך שכולם ישנו. (0.5^3)." } },
            { id: "clue_2", type: "technical", title: "הקוד", icon: "⌨️", content: "שלב ב'", data: { description: "קוד 4 ספרות. הסיכוי לנחש: 1 ל-10,000." } },
            { id: "clue_3", type: "system", title: "הגלאי", icon: "🚨", content: "שלב ג'", data: { description: "גלאי תנועה. עובד ב-99% מהמקרים." } }
        ],
        suspects: [
            { id: "suspect_a", name: "הזאב הבודד", age: 30, avatar: "👤", attributes: { "צוות": "לבד" } },
            { id: "suspect_b", name: "צוות אושן", age: 40, avatar: "👥", attributes: { "צוות": "מומחים לכל שלב" } }
        ],
        solution: {
            guilty: "suspect_b",
            probability: 0.000001,
            steps: [
                { step: 1, formula: "P(Guards) = 0.5^3 = 0.125", result: 0.125, explanation: "סיכוי לעבור שומרים." },
                { step: 2, formula: "P(Code) = 0.0001", result: 0.0001, explanation: "סיכוי לנחש קוד." },
                { step: 3, formula: "P(Total) = 0.125 * 0.0001 * 0.01", result: "אפסי", explanation: "הסיכוי שאדם בודד יצליח בהכל שואף לאפס." }
            ],
            explanation: "הסתברותית, לא ייתכן שאדם אחד צלח את כל המכשולים במזל. נדרש צוות מיומן שפרץ את המערכות (או מבפנים)."
        }
    }
};
