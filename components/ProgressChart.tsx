import React, { useMemo } from 'react';

interface HistoryPoint {
  date: string;
  score: number;
}

interface ProgressChartProps {
  history: HistoryPoint[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ history }) => {
  const chartData = useMemo(() => {
    // Basic protection
    if (!history || history.length === 0) return [];
    
    let data = [...history];

    // FIX: If only one point (e.g., first day usage), add a "Yesterday" point at 0
    // so the chart shows a growth line instead of just a dot or blank space.
    if (data.length === 1) {
        const current = data[0];
        const yesterday = new Date(current.date);
        yesterday.setDate(yesterday.getDate() - 1);
        data.unshift({ date: yesterday.toISOString(), score: 0 });
    }

    // Simplistic reduction to max 7 points for mobile readability if too many
    if (data.length > 10) {
        const step = Math.ceil(data.length / 10);
        data = data.filter((_, index) => index % step === 0 || index === data.length - 1);
    }
    return data;
  }, [history]);

  if (chartData.length < 2) {
    // This fallback should rarely be hit now due to the fix above
    return null;
  }

  // Dimensions
  const width = 100;
  const height = 50;
  const padding = 5;

  const maxScore = Math.max(...chartData.map(d => d.score), 100); // Minimum scale 100
  // const minScore = 0;

  // Generate Points
  const points = chartData.map((d, i) => {
    const x = padding + (i / (chartData.length - 1)) * (width - padding * 2);
    const y = height - padding - (d.score / maxScore) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height} ${points} ${width - padding},${height}`;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-end mb-4">
        <div>
           <h3 className="text-gray-900 font-bold text-sm">能力成长曲线</h3>
           <p className="text-xs text-gray-400">Skill Growth Trend</p>
        </div>
        <div className="text-green-600 font-bold text-xl">
            {chartData[chartData.length - 1].score} <span className="text-xs text-gray-400 font-normal">分</span>
        </div>
      </div>
      
      <div className="relative w-full aspect-[2/1]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#f3f4f6" strokeWidth="0.5" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#f3f4f6" strokeWidth="0.5" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#f3f4f6" strokeWidth="0.5" />

          {/* Area Fill */}
          <polygon points={areaPoints} fill="url(#gradient)" opacity="0.2" />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Line */}
          <polyline points={points} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Dots */}
          {chartData.map((d, i) => {
             const x = padding + (i / (chartData.length - 1)) * (width - padding * 2);
             const y = height - padding - (d.score / maxScore) * (height - padding * 2);
             return (
                 <circle key={i} cx={x} cy={y} r="1.5" className="fill-white stroke-green-500" strokeWidth="0.8" />
             )
          })}
        </svg>

        {/* X Axis Labels (First and Last date) */}
        <div className="flex justify-between text-[10px] text-gray-400 mt-2">
            <span>{new Date(chartData[0].date).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
            <span>{new Date(chartData[chartData.length-1].date).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;