import React from 'react';
import { Skill, MasteryLevel } from '../types';

interface SkillDetailModalProps {
  skill: Skill;
  currentMastery: MasteryLevel;
  onClose: () => void;
  onUpdateMastery: (level: MasteryLevel) => void;
}

const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, currentMastery, onClose, onUpdateMastery }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl animate-slide-up sm:animate-fade-in max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{skill.name}</h2>
            <p className="text-sm text-gray-500">{skill.category} • {skill.difficulty}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="text-blue-800 font-semibold mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              核心自查要点
            </h3>
            <p className="text-blue-900/80 leading-relaxed text-sm">{skill.checkPoints}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <h3 className="text-red-800 font-semibold mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              常见错误 (自查警告)
            </h3>
            <p className="text-red-900/80 leading-relaxed text-sm">{skill.commonMistakes}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onUpdateMastery(MasteryLevel.Unknown)}
            className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
              currentMastery === MasteryLevel.Unknown 
                ? 'bg-gray-800 text-white ring-2 ring-gray-800 ring-offset-2' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            不会 / 不懂
          </button>
          <button
            onClick={() => onUpdateMastery(MasteryLevel.Basic)}
            className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
              currentMastery === MasteryLevel.Basic 
                ? 'bg-yellow-500 text-white ring-2 ring-yellow-500 ring-offset-2' 
                : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
            }`}
          >
            知道 / 基本会
          </button>
          <button
            onClick={() => onUpdateMastery(MasteryLevel.Mastered)}
            className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
              currentMastery === MasteryLevel.Mastered 
                ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-2' 
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            非常熟练
          </button>
        </div>
        
        <div className="mt-4 text-center">
           <button onClick={onClose} className="text-gray-400 text-sm py-2">关闭</button>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailModal;