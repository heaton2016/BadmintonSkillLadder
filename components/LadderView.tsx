import React, { useState } from 'react';
import { Skill, MasteryLevel } from '../types';
import { BADMINTON_SKILLS } from '../constants';

interface LadderViewProps {
  userProgress: Record<number, MasteryLevel>;
  onSkillClick: (skill: Skill) => void;
}

const LEVEL_CONFIG = {
  6: { title: 'L6 呼风唤羽', sub: '羽翼丰满', color: 'from-red-500 to-red-600', bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800' },
  5: { title: 'L5 春风化羽', sub: '高阶技术', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-800' },
  4: { title: 'L4 羽不自禁', sub: '进阶技术', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-800' },
  3: { title: 'L3 佳羽有约', sub: '中级技术', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800' },
  2: { title: 'L2 羽过拔毛', sub: '基础巩固', color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-800' },
  1: { title: 'L1 羽焉不详', sub: '入门动作', color: 'from-green-500 to-green-600', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-800' },
};

const LadderView: React.FC<LadderViewProps> = ({ userProgress, onSkillClick }) => {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  // Group skills by level
  const skillsByLevel: Record<number, Skill[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  BADMINTON_SKILLS.forEach(skill => {
    if (skillsByLevel[skill.cnLevel]) {
      skillsByLevel[skill.cnLevel].push(skill);
    }
  });

  // Render levels in reverse order (6 -> 1)
  const levels = [6, 5, 4, 3, 2, 1];

  return (
    <div className="space-y-4 pb-10">
      <div className="text-center mb-6">
        <div className="inline-block bg-slate-800 text-white text-xs px-3 py-1 rounded-full mb-2">
            Higher is Harder
        </div>
        <p className="text-xs text-gray-400">点击楼层查看详情</p>
      </div>

      {levels.map(level => {
        const skills = skillsByLevel[level];
        const masteredCount = skills.filter(s => userProgress[s.id] === MasteryLevel.Mastered).length;
        const basicCount = skills.filter(s => userProgress[s.id] === MasteryLevel.Basic).length;
        const totalCount = skills.length;
        const progressPercent = Math.round(((masteredCount + (basicCount * 0.5)) / totalCount) * 100);
        
        const config = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG];
        const isExpanded = expandedLevel === level;

        return (
          <div 
            key={level} 
            className={`relative transition-all duration-300 rounded-2xl border ${isExpanded ? 'ring-2 ring-offset-2 ring-gray-200 shadow-md' : 'shadow-sm'} ${config.bg} ${config.border}`}
            onClick={() => setExpandedLevel(isExpanded ? null : level)}
          >
            {/* Main Block Content */}
            <div className="p-4 cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white font-bold shadow-sm`}>
                    L{level}
                  </div>
                  <div>
                    <h3 className={`font-bold ${config.text}`}>{config.title}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{config.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-xl font-bold text-gray-800">{progressPercent}%</div>
                   <div className="text-[10px] text-gray-400">完成度</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-white rounded-full overflow-hidden mb-3">
                 <div 
                    className={`h-full bg-gradient-to-r ${config.color} transition-all duration-1000`} 
                    style={{ width: `${progressPercent}%` }} 
                 />
              </div>

              {/* Skill Matrix Visualization (The "Dots") */}
              <div className="flex flex-wrap gap-1.5">
                 {skills.map(skill => {
                   const status = userProgress[skill.id];
                   let dotColor = "bg-white border-gray-200"; // Unknown
                   if (status === MasteryLevel.Basic) dotColor = "bg-yellow-400 border-yellow-500";
                   if (status === MasteryLevel.Mastered) dotColor = "bg-green-500 border-green-600";
                   
                   return (
                     <div 
                       key={skill.id}
                       className={`w-3 h-3 rounded-sm border ${dotColor} transition-colors`}
                       title={skill.name}
                     />
                   );
                 })}
              </div>
            </div>

            {/* Expanded Content (List of skills in this level) */}
            {isExpanded && (
               <div className="border-t border-gray-100/50 bg-white/50 p-3 rounded-b-2xl animate-fade-in">
                  <div className="grid grid-cols-1 gap-2">
                     {skills.map(skill => {
                        const status = userProgress[skill.id];
                        return (
                          <div 
                            key={skill.id} 
                            onClick={(e) => { e.stopPropagation(); onSkillClick(skill); }}
                            className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer"
                          >
                             <span className={`text-sm ${status === MasteryLevel.Mastered ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                               {skill.name}
                             </span>
                             <div className="flex items-center gap-2">
                               {status === MasteryLevel.Mastered && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">熟练</span>}
                               {status === MasteryLevel.Basic && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">基本</span>}
                               {(!status || status === MasteryLevel.Unknown) && <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">待学</span>}
                               <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                               </svg>
                             </div>
                          </div>
                        )
                     })}
                  </div>
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LadderView;