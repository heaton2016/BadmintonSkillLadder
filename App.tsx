import React, { useState, useEffect, useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { BADMINTON_SKILLS } from './constants';
import { MasteryLevel, UserProgress, Skill } from './types';
import SkillCard from './components/SkillCard';
import SkillDetailModal from './components/SkillDetailModal';
import ProgressChart from './components/ProgressChart';
import LadderView from './components/LadderView';

interface HistoryRecord {
  date: string; // ISO date string
  score: number;
}

// Move helper outside to be available for initialization logic
const calculateScore = (progress: UserProgress) => {
  let score = 0;
  BADMINTON_SKILLS.forEach(skill => {
      const status = progress[skill.id];
      const basePoints = skill.cnLevel * 10; 
      if (status === MasteryLevel.Mastered) score += basePoints;
      if (status === MasteryLevel.Basic) score += (basePoints * 0.5);
  });
  return Math.round(score);
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'profile'>('skills');
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  // Share state
  const shareRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  
  // Filters
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterLevel, setFilterLevel] = useState<number | 'All'>('All');

  // Load progress & History
  useEffect(() => {
    const savedProgress = localStorage.getItem('badminton_progress');
    const savedHistory = localStorage.getItem('badminton_history');
    
    let loadedProgress: UserProgress = {};
    if (savedProgress) {
      loadedProgress = JSON.parse(savedProgress);
      setUserProgress(loadedProgress);
    }

    let loadedHistory: HistoryRecord[] = [];
    if (savedHistory) {
      loadedHistory = JSON.parse(savedHistory);
    }
    
    // Ensure history is not empty for first-time users or migration
    // If history is empty, create an initial entry based on current progress
    if (loadedHistory.length === 0) {
        const initialScore = calculateScore(loadedProgress);
        const initialEntry = { date: new Date().toISOString(), score: initialScore };
        loadedHistory = [initialEntry];
        localStorage.setItem('badminton_history', JSON.stringify(loadedHistory));
    }
    
    setHistory(loadedHistory);
  }, []);

  // Wrapper for internal updates
  const calculateTotalScore = (progress: UserProgress) => calculateScore(progress);

  // Save progress & Update History
  const updateMastery = (skillId: number, level: MasteryLevel) => {
    const newProgress = { ...userProgress, [skillId]: level };
    setUserProgress(newProgress);
    localStorage.setItem('badminton_progress', JSON.stringify(newProgress));

    // Update History logic
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const newScore = calculateTotalScore(newProgress);
    
    setHistory(prev => {
        // Safety check if prev is empty (though useEffect handles it, race conditions exist)
        if (prev.length === 0) {
             const newHistory = [{ date: new Date().toISOString(), score: newScore }];
             localStorage.setItem('badminton_history', JSON.stringify(newHistory));
             return newHistory;
        }

        const lastEntry = prev[prev.length - 1];
        let newHistory = [...prev];
        const lastDate = lastEntry.date.split('T')[0];
        
        if (lastDate === today) {
            // Update today's entry
            newHistory[newHistory.length - 1] = { ...lastEntry, score: newScore };
        } else {
            // Add new entry
            newHistory.push({ date: new Date().toISOString(), score: newScore });
        }
        
        localStorage.setItem('badminton_history', JSON.stringify(newHistory));
        return newHistory;
    });
  };

  // Level Calculation Logic
  const levelInfo = useMemo(() => {
    const CN_TITLES = [
      "羽外高人", // 0
      "羽焉不详", // 1
      "羽过拔毛", // 2
      "佳羽有约", // 3
      "羽不自禁", // 4
      "春风化羽", // 5
      "羽翼丰满", // 6
      "呼风唤羽"  // 7+
    ];

    let currentLevel = 0;
    const levelStats: Record<number, { total: number, passed: number, mastered: number }> = {};

    BADMINTON_SKILLS.forEach(skill => {
      const lvl = skill.cnLevel;
      if (!levelStats[lvl]) levelStats[lvl] = { total: 0, passed: 0, mastered: 0 };
      
      levelStats[lvl].total++;
      const status = userProgress[skill.id];
      if (status === MasteryLevel.Basic || status === MasteryLevel.Mastered) {
        levelStats[lvl].passed++;
      }
      if (status === MasteryLevel.Mastered) {
        levelStats[lvl].mastered++;
      }
    });

    for (let i = 1; i <= 6; i++) {
       const stats = levelStats[i];
       if (!stats) continue;
       const passRatio = stats.passed / stats.total;
       if (passRatio >= 0.8) {
         currentLevel = i;
       } else {
         break;
       }
    }
    
    const currentStats = levelStats[currentLevel];
    let isStrong = false;
    if(currentStats && currentStats.total > 0 && (currentStats.mastered / currentStats.total) > 0.7) {
        isStrong = true;
    }

    const title = CN_TITLES[currentLevel] || "羽外高人";
    const displayLevel = `中羽 ${currentLevel}${isStrong ? '+' : ''} 级`;

    return { 
      level: currentLevel, 
      displayLevel, 
      title,
    };
  }, [userProgress]);

  const handleShare = async () => {
    if (!shareRef.current || isSharing) return;
    setIsSharing(true);
    
    try {
        // Render canvas
        const canvas = await html2canvas(shareRef.current, {
            useCORS: true,
            scale: 2,
            backgroundColor: '#F9FAFB', // Matches gray-50
            logging: false,
        });

        canvas.toBlob(async (blob) => {
            if (!blob) {
                setIsSharing(false);
                return;
            }
            const file = new File([blob], 'badminton-ladder.png', { type: 'image/png' });
            
            // Try Native Share
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: '羽训家：中羽天梯',
                        text: `我的羽毛球等级：${levelInfo.displayLevel}（${levelInfo.title}），快来一起挑战中羽天梯吧！`,
                        files: [file]
                    });
                } catch (error) {
                    console.log('Share cancelled', error);
                }
            } else {
                // Fallback: Download
                const link = document.createElement('a');
                link.download = 'badminton-ladder.png';
                link.href = canvas.toDataURL();
                link.click();
            }
            setIsSharing(false);
        }, 'image/png');

    } catch (error) {
        console.error('Screenshot failed:', error);
        setIsSharing(false);
        alert('生成截图失败，请重试');
    }
  };

  const categories = ['All', ...Array.from(new Set(BADMINTON_SKILLS.map(s => s.category)))];

  const filteredSkills = useMemo(() => {
    return BADMINTON_SKILLS.filter(s => {
      // Filter by Level
      if (filterLevel !== 'All' && s.cnLevel !== filterLevel) return false;
      // Filter by Category
      if (filterCategory !== 'All' && s.category !== filterCategory) return false;
      return true;
    });
  }, [filterCategory, filterLevel]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b sticky top-0 z-20 flex justify-between items-center min-h-[80px]">
        <div>
           <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">羽训家：中羽天梯</h1>
           <p className="text-xs text-gray-500 mt-1">Badminton Training Ladder</p>
        </div>
        <div className="flex flex-col items-end">
             {/* Only show level in header on Skills tab, hide on Profile tab to avoid duplication */}
             {activeTab === 'skills' && (
               <div className="animate-fade-in flex flex-col items-end">
                 <span className="text-xl font-bold text-green-600">{levelInfo.displayLevel}</span>
                 <span className="text-[10px] text-gray-400 uppercase tracking-wide">{levelInfo.title}</span>
               </div>
             )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {activeTab === 'skills' && (
          <div className="p-4 pb-20">
            {/* Level Filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 pb-1">
               <button
                  onClick={() => setFilterLevel('All')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    filterLevel === 'All' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-white border text-gray-400'
                  }`}
                >
                  全部等级
                </button>
               {[1, 2, 3, 4, 5, 6].map(lvl => (
                 <button
                   key={lvl}
                   onClick={() => setFilterLevel(lvl)}
                   className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                     filterLevel === lvl 
                     ? 'bg-blue-600 text-white' 
                     : 'bg-white border text-gray-500'
                   }`}
                 >
                   L{lvl}
                 </button>
               ))}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-2 border-b border-gray-100">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    filterCategory === cat 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="min-h-[300px]">
              {filteredSkills.length === 0 ? (
                <div className="text-center text-gray-400 py-10 text-sm">
                   该筛选条件下没有技术动作
                </div>
              ) : (
                filteredSkills.map(skill => (
                  <SkillCard 
                    key={skill.id}
                    skill={skill}
                    mastery={userProgress[skill.id] || MasteryLevel.Unknown}
                    onClick={() => setSelectedSkill(skill)}
                    onUpdateMastery={(level) => updateMastery(skill.id, level)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 pb-20">
             {/* Share Button */}
             <button 
               onClick={handleShare}
               disabled={isSharing}
               className="w-full mb-6 flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-slate-700 active:scale-95 transition-all"
             >
               {isSharing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>正在生成...</span>
                  </>
               ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>分享我的天梯等级</span>
                  </>
               )}
             </button>

             {/* Capture Area */}
             <div ref={shareRef} className="bg-gray-50 p-2 -m-2 rounded-xl">
                 {/* Internal Header for Screenshot Context */}
                 <div className="mb-4 flex justify-between items-end px-2 pt-2">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900">我的天梯</h2>
                        <p className="text-xs text-gray-500 font-bold">BY 羽训家</p>
                    </div>
                    <div className="text-right">
                        <div className="text-green-600 font-bold text-xl">{levelInfo.displayLevel}</div>
                        <div className="text-[10px] text-gray-400 uppercase">{levelInfo.title}</div>
                    </div>
                 </div>

                 <ProgressChart history={history} />
                 <LadderView 
                    userProgress={userProgress} 
                    onSkillClick={(skill) => setSelectedSkill(skill)} 
                 />
                 
                 {/* Footer for Screenshot */}
                 <div className="text-center text-[10px] text-gray-300 mt-4 pb-2">
                    - Keep Practicing -
                 </div>
             </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-gray-100 flex justify-around items-center py-2 pb-5 sticky bottom-0 z-30">
        <button 
          onClick={() => setActiveTab('skills')}
          className={`flex flex-col items-center p-2 transition-all ${activeTab === 'skills' ? 'text-green-600 scale-105' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-medium">技能表</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center p-2 transition-all ${activeTab === 'profile' ? 'text-green-600 scale-105' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-[10px] font-medium">我的天梯</span>
        </button>
      </div>

      {/* Modals */}
      {selectedSkill && (
        <SkillDetailModal 
          skill={selectedSkill}
          currentMastery={userProgress[selectedSkill.id] || MasteryLevel.Unknown}
          onClose={() => setSelectedSkill(null)}
          onUpdateMastery={(level) => updateMastery(selectedSkill.id, level)}
        />
      )}

    </div>
  );
};

export default App;