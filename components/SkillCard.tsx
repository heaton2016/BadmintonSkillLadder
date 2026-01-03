import React from 'react';
import { Skill, MasteryLevel } from '../types';
import { DIFFICULTY_COLORS } from '../constants';

interface SkillCardProps {
  skill: Skill;
  mastery: MasteryLevel;
  onClick: () => void;
  onUpdateMastery: (level: MasteryLevel) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, mastery, onClick, onUpdateMastery }) => {
  const isMastered = mastery === MasteryLevel.Mastered;
  
  const handleMasteryClick = (e: React.MouseEvent, level: MasteryLevel) => {
    e.stopPropagation();
    onUpdateMastery(level);
  };

  return (
    <div 
      className={`relative mb-3 rounded-xl border transition-all duration-200 bg-white shadow-sm overflow-hidden
        ${isMastered ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-100'}`}
    >
      {/* Clickable Area for Details */}
      <div className="p-4 cursor-pointer active:bg-gray-50" onClick={onClick}>
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-2">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {/* CN Level Badge */}
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white bg-slate-600">
                L{skill.cnLevel}
              </span>
              
              {/* Difficulty Badge */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${DIFFICULTY_COLORS[skill.difficultyLevel as keyof typeof DIFFICULTY_COLORS]}`}>
                {skill.difficulty}
              </span>
              <span className="text-xs text-gray-400 font-medium">{skill.category}</span>
            </div>
            <h3 className={`font-semibold text-base leading-tight ${isMastered ? 'text-green-800' : 'text-gray-800'}`}>
              {skill.name}
            </h3>
          </div>
          
          {/* Info Icon to hint at details */}
          <div className="text-gray-300 mt-1">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
        </div>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="flex border-t border-gray-100 divide-x divide-gray-100 bg-gray-50/50">
        <button
          onClick={(e) => handleMasteryClick(e, MasteryLevel.Unknown)}
          className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors
            ${mastery === MasteryLevel.Unknown 
              ? 'bg-gray-200 text-gray-700 shadow-inner' 
              : 'text-gray-400 hover:bg-gray-100'}`}
        >
          <div className={`w-2 h-2 rounded-full ${mastery === MasteryLevel.Unknown ? 'bg-gray-500' : 'bg-gray-300'}`} />
          不懂
        </button>

        <button
          onClick={(e) => handleMasteryClick(e, MasteryLevel.Basic)}
          className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors
            ${mastery === MasteryLevel.Basic 
              ? 'bg-yellow-100 text-yellow-700 shadow-inner' 
              : 'text-gray-400 hover:bg-yellow-50'}`}
        >
           <div className={`w-2 h-2 rounded-full ${mastery === MasteryLevel.Basic ? 'bg-yellow-500' : 'bg-gray-300'}`} />
           基本
        </button>

        <button
          onClick={(e) => handleMasteryClick(e, MasteryLevel.Mastered)}
          className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors
            ${mastery === MasteryLevel.Mastered 
              ? 'bg-green-100 text-green-700 shadow-inner' 
              : 'text-gray-400 hover:bg-green-50'}`}
        >
           <div className={`w-2 h-2 rounded-full ${mastery === MasteryLevel.Mastered ? 'bg-green-500' : 'bg-gray-300'}`} />
           熟练
        </button>
      </div>
    </div>
  );
};

export default SkillCard;