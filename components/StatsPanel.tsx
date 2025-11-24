
import React from 'react';
import { Cpu, Brain, Database, Zap } from 'lucide-react';
import { TechnicalStats } from '../types';

const StatBox = ({ label, value, icon: Icon, colorClass, loading }: { label: string, value: string, icon: any, colorClass: string, loading: boolean }) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-center gap-4 group hover:border-zinc-600 transition-colors relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full ${colorClass} opacity-50`}></div>
    <div className={`p-2 rounded-md bg-black/50 ${colorClass.replace('bg-', 'text-')}`}>
      <Icon size={20} />
    </div>
    <div>
      <div className="text-[10px] text-zinc-500 uppercase font-mono mb-1">{label}</div>
      <div className="text-xl font-bold text-white font-mono tracking-tight group-hover:text-shadow transition-all truncate max-w-[120px]">
        {loading ? <span className="animate-pulse">---</span> : value}
      </div>
    </div>
  </div>
);

// Custom icon wrapper since lucide might not have Trophy in the version imported
const TrophyIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    {...props}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

interface StatsPanelProps {
  stats?: TechnicalStats;
  modelName: string;
  loading: boolean;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, modelName, loading }) => {
  return (
    <div className="flex flex-col gap-3 h-full">
       <h3 className="text-zinc-400 text-xs font-mono uppercase mb-1 pl-1 truncate">
          Telemetry: <span className="text-neon-blue">{modelName}</span>
       </h3>
       
       <StatBox 
         label="Benchmark / Arena" 
         value={stats?.arenaScore || "N/A"} 
         icon={TrophyIcon} 
         colorClass="bg-yellow-500"
         loading={loading}
       />
       <StatBox 
         label="Reasoning Cap" 
         value={stats?.reasoning || "N/A"} 
         icon={Brain} 
         colorClass="bg-neon-purple"
         loading={loading}
       />
       <StatBox 
         label="Context Window" 
         value={stats?.contextWindow || "N/A"} 
         icon={Database} 
         colorClass="bg-neon-blue"
         loading={loading} 
       />
       <StatBox 
         label="Est. Latency" 
         value={stats?.speed || "N/A"} 
         icon={Zap} 
         colorClass="bg-neon-green"
         loading={loading} 
       />

       <div className="mt-auto p-4 border border-zinc-800 rounded-lg bg-black/40">
          <div className="text-[10px] text-zinc-600 font-mono mb-2">TARGET NODE STATUS</div>
          <div className="flex gap-1 mb-1">
            <div className={`h-8 flex-1 bg-zinc-800 rounded-sm ${loading ? 'animate-pulse' : ''} delay-75`}></div>
            <div className={`h-8 flex-1 bg-zinc-800 rounded-sm ${loading ? 'animate-pulse' : ''} delay-100`}></div>
            <div className={`h-8 flex-1 bg-zinc-800 rounded-sm ${loading ? 'animate-pulse' : ''} delay-150`}></div>
            <div className={`h-8 flex-1 bg-zinc-800 rounded-sm ${loading ? 'animate-pulse' : ''} delay-200`}></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-[9px] text-zinc-500 font-mono">{loading ? "ESTABLISHING UPLINK..." : "DATA STREAM ACTIVE"}</div>
            <div className={`text-[10px] font-mono ${loading ? 'text-yellow-500' : 'text-neon-green'}`}>
                {loading ? "CONNECTING" : "OPTIMAL"}
            </div>
          </div>
       </div>
    </div>
  );
};
