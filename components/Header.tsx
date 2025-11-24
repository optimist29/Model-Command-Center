import React from 'react';
import { Activity, Radio } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-neon-blue rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)]">
           <Activity className="text-black w-5 h-5" />
        </div>
        <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-white font-sans">
              MODEL <span className="text-neon-blue neon-text">LAUNCH COMMAND</span>
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Real-time Market Sentiment Analysis</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neon-green">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
        </span>
        LIVE DATA FEED ACTIVE
      </div>
    </header>
  );
};