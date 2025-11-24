
import React from 'react';

interface SentimentGaugeProps {
  value: number;
  loading: boolean;
  modelName: string;
}

export const SentimentGauge: React.FC<SentimentGaugeProps> = ({ value, loading, modelName }) => {
  // SVG Geometry
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  // We only want a semi-circle (or 3/4 circle). Let's do a 240 degree arc.
  // 240 degrees is 2/3 of 360.
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (loading ? 0 : (value / 100) * arcLength);

  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-panel border border-zinc-800 rounded-xl neon-border backdrop-blur-sm h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 to-transparent opacity-50 pointer-events-none" />
      
      <h2 className="text-zinc-400 text-xs font-mono uppercase mb-4 tracking-widest text-center truncate max-w-full">
        Hype Level: <span className="text-white">{modelName}</span>
      </h2>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg
          height={radius * 2 + 20}
          width={radius * 2 + 20}
          className="transform rotate-[135deg] overflow-visible"
        >
          {/* Background Track */}
          <circle
            stroke="#1a1a1a"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius + 10}
            cy={radius + 10}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
          />
          {/* Value Arc */}
          <circle
            stroke="#00f3ff"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius + 10}
            cy={radius + 10}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{
                strokeDashoffset,
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 0 8px rgba(0, 243, 255, 0.6))'
            }}
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transform -rotate-[0deg]">
            {loading ? (
               <span className="text-4xl font-bold text-zinc-600 animate-pulse">--</span>
            ) : (
               <>
                <span className="text-6xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {Math.round(value)}%
                </span>
                <span className="text-neon-blue text-xs font-mono mt-2">POSITIVE</span>
               </>
            )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center w-full max-w-[250px]">
        <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-mono">SENTIMENT</span>
            <span className="text-white font-bold text-sm">{loading ? '-' : (value > 60 ? 'Bullish' : value < 40 ? 'Bearish' : 'Neutral')}</span>
        </div>
        <div className="flex flex-col border-l border-r border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-mono">VOLATILITY</span>
            <span className="text-neon-purple font-bold text-sm">{loading ? '-' : 'High'}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-mono">SOURCES</span>
            <span className="text-white font-bold text-sm">{loading ? '-' : Math.floor(Math.random() * 200 + 50)}</span>
        </div>
      </div>
    </div>
  );
};
