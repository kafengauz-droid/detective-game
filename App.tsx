
import React, { useState, useEffect } from 'react';
import { CASES_DATA, ACHIEVEMENTS } from './constants';
import { PlayerState, CaseState, CaseProgress } from './types';
import SplashScreen from './components/SplashScreen';
import CityMap from './components/CityMap';
import CaseDescription from './components/CaseDescription';
import InvestigationScreen from './components/InvestigationScreen';
import ResultScreen from './components/ResultScreen';
import AchievementsModal from './components/AchievementsModal';
import SettingsModal from './components/SettingsModal';

const INITIAL_PLAYER_STATE: PlayerState = { 
    name: "בלש מתחיל", 
    rank: "טירון", 
    coins: 100, 
    level: 1, 
    xp: 0,
    unlockedAchievements: [] 
};

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'map' | 'caseDescription' | 'investigation' | 'result'>('splash');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  
  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [devMode, setDevMode] = useState(false);

  // Player State with XP and Levels
  const [player, setPlayer] = useState<PlayerState>(() => {
    const saved = localStorage.getItem('detective-player');
    return saved ? JSON.parse(saved) : INITIAL_PLAYER_STATE;
  });

  const [cases, setCases] = useState<Record<string, CaseState>>(() => {
    const saved = localStorage.getItem('detective-cases');
    if (saved) return JSON.parse(saved);
    return Object.keys(CASES_DATA).reduce((acc, key) => ({ ...acc, [key]: { completed: false, score: 0, attempts: 0 } }), {});
  });

  const [investigationResult, setInvestigationResult] = useState<any>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('detective-player', JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem('detective-cases', JSON.stringify(cases));
  }, [cases]);

  // Check achievements whenever player or cases change
  useEffect(() => {
    const newlyUnlocked: string[] = [];
    const updatedUnlocked = [...player.unlockedAchievements];

    ACHIEVEMENTS.forEach(ach => {
        if (!updatedUnlocked.includes(ach.id) && ach.condition(player, cases)) {
            updatedUnlocked.push(ach.id);
            newlyUnlocked.push(ach.title);
        }
    });

    if (newlyUnlocked.length > 0) {
        setPlayer(prev => ({ ...prev, unlockedAchievements: updatedUnlocked }));
        setNewAchievements(newlyUnlocked);
        setTimeout(() => setNewAchievements([]), 5000);
    }
  }, [player.coins, player.level, cases]);

  // Rank Logic
  const calculateRank = (level: number) => {
      if (level < 3) return "טירון";
      if (level < 5) return "בלש";
      if (level < 8) return "מפקח";
      if (level < 10) return "רב פקד";
      return "מפכ״ל";
  };

  const handleStart = () => setScreen('map');
  const handleSelectCase = (caseId: string) => { setSelectedCase(caseId); setScreen('caseDescription'); };
  const handleStartInvestigation = () => setScreen('investigation');

  // New: Save progress when exiting investigation
  const handleSaveAndBack = (progress: CaseProgress) => {
    if (selectedCase) {
        setCases(prev => ({
            ...prev,
            [selectedCase]: {
                ...prev[selectedCase],
                progress: progress
            }
        }));
    }
    setScreen('caseDescription');
  };

  const handleCompleteInvestigation = (result: any) => {
    setInvestigationResult(result);
    setScreen('result');
    const caseData = CASES_DATA[selectedCase!];
    
    if (result.suspect === caseData.solution.guilty) {
      // Calculate XP and Score based on performance
      // Base XP for solving: 500
      // Performance XP: Final Score * 2 (Max 200)
      const earnedScore = result.finalScore || 0;
      const baseXP = 500;
      const bonusXP = earnedScore * 2; 
      const totalXP = baseXP + bonusXP;
      
      // Calculate Coins
      // Base Coins: 50
      // Performance Coins: Equal to Score (Max 100)
      const baseCoins = 50;
      const bonusCoins = earnedScore;
      const totalCoins = baseCoins + bonusCoins;
      
      const newTotalXP = player.xp + totalXP;
      const newLevel = Math.floor(newTotalXP / 1000) + 1;
      const newRank = calculateRank(newLevel);
      
      // Store calculations in result for display
      result.rewards = {
          baseXP,
          bonusXP,
          totalXP,
          baseCoins,
          bonusCoins,
          totalCoins
      };

      setCases(prev => ({ 
          ...prev, 
          [selectedCase!]: { 
              completed: true, 
              score: earnedScore, 
              attempts: (prev[selectedCase!]?.attempts || 0) + 1,
              progress: undefined // Clear progress on completion
          } 
      }));

      setPlayer(prev => ({ 
          ...prev, 
          coins: prev.coins + totalCoins,
          xp: newTotalXP,
          level: newLevel,
          rank: newRank
      }));
    } else {
       setCases(prev => ({ 
          ...prev, 
          [selectedCase!]: { ...prev[selectedCase!], attempts: (prev[selectedCase!]?.attempts || 0) + 1 } 
      }));
    }
  };

  const handleContinue = () => { setScreen('map'); setSelectedCase(null); setInvestigationResult(null); };
  
  // Retry clears the progress for a fresh start
  const handleRetry = () => { 
      if (selectedCase) {
          setCases(prev => ({
              ...prev,
              [selectedCase]: {
                  ...prev[selectedCase],
                  progress: undefined
              }
          }));
      }
      setScreen('investigation'); 
      setInvestigationResult(null); 
  };

  const handleResetProgress = () => {
      localStorage.removeItem('detective-player');
      localStorage.removeItem('detective-cases');
      setPlayer(INITIAL_PLAYER_STATE);
      setCases(Object.keys(CASES_DATA).reduce((acc, key) => ({ ...acc, [key]: { completed: false, score: 0, attempts: 0 } }), {}));
      setScreen('splash');
  };

  return (
    <div className="min-h-screen bg-dark-blue font-sans text-light-gray">
        {/* Achievement Toast */}
        {newAchievements.length > 0 && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2">
                {newAchievements.map((title, idx) => (
                    <div key={idx} className="bg-gold text-dark-blue px-6 py-3 rounded-full shadow-lg font-bold animate-slide-up flex items-center gap-2">
                        <span>🏆</span> הישג חדש: {title}
                    </div>
                ))}
            </div>
        )}

        <SettingsModal 
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            devMode={devMode}
            onToggleDevMode={() => setDevMode(!devMode)}
            onResetProgress={handleResetProgress}
        />

        {showAchievements && (
            <AchievementsModal 
                player={player} 
                onClose={() => setShowAchievements(false)} 
            />
        )}

        {screen === 'splash' && (
            <SplashScreen 
                onStart={handleStart} 
                onOpenSettings={() => setShowSettings(true)}
            />
        )}
        
        {screen === 'map' && (
            <CityMap 
                player={player} 
                cases={cases} 
                onSelectCase={handleSelectCase} 
                onShowAchievements={() => setShowAchievements(true)}
                onOpenSettings={() => setShowSettings(true)}
                devMode={devMode}
            />
        )}
        
        {screen === 'caseDescription' && selectedCase && (
            <CaseDescription 
                caseData={CASES_DATA[selectedCase]} 
                onStartInvestigation={handleStartInvestigation} 
                onBack={() => setScreen('map')} 
            />
        )}
        
        {screen === 'investigation' && selectedCase && (
            <InvestigationScreen 
                caseData={CASES_DATA[selectedCase]} 
                initialProgress={cases[selectedCase]?.progress}
                onComplete={handleCompleteInvestigation} 
                onBack={handleSaveAndBack} 
            />
        )}
        
        {screen === 'result' && selectedCase && (
            <ResultScreen 
                caseData={CASES_DATA[selectedCase]} 
                result={investigationResult} 
                onContinue={handleContinue} 
                onRetry={handleRetry} 
            />
        )}
    </div>
  );
}
