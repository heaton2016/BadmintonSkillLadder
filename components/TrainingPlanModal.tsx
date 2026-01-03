import React from 'react';

interface TrainingPlanModalProps {
  plan: string;
  onClose: () => void;
}

const TrainingPlanModal: React.FC<TrainingPlanModalProps> = ({ plan, onClose }) => {
  let parsedPlan;
  try {
      // Clean markdown if present
      const cleanJson = plan.replace(/```json/g, '').replace(/```/g, '');
      parsedPlan = JSON.parse(cleanJson);
  } catch (e) {
      parsedPlan = null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl h-[85vh] flex flex-col">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-lg text-purple-600">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </span>
            <h2 className="text-xl font-bold text-gray-900">AI 专属训练计划</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          {parsedPlan ? (
             <>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <p className="text-purple-900 italic">"{parsedPlan.intro}"</p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">1</span>
                        热身 ({parsedPlan.warmup})
                    </h3>
                </div>

                 <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                        核心训练
                    </h3>
                    {parsedPlan.drills.map((drill: any, idx: number) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-800">{drill.name}</span>
                                <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">{drill.duration}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{drill.description}</p>
                        </div>
                    ))}
                </div>
                
                 <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">3</span>
                        拉伸放松
                    </h3>
                    <p className="text-gray-600 text-sm ml-8">{parsedPlan.cooldown}</p>
                </div>
             </>
          ) : (
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                {plan}
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t">
             <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium">完成</button>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanModal;