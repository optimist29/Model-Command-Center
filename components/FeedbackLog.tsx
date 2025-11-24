
import React from 'react';
import { Radio, Hash, MessageCircle, AlertCircle } from 'lucide-react';
import { FeedbackItem } from '../types';

interface FeedbackLogProps {
  items: FeedbackItem[];
  loading: boolean;
}

const SentimentIcon = ({ sentiment }: { sentiment: string }) => {
  switch (sentiment) {
    case 'positive': return <span className="text-neon-green">[+]</span>;
    case 'negative': return <span className="text-red-500">[-]</span>;
    case 'mixed': return <span className="text-yellow-500">[~]</span>;
    default: return <span className="text-zinc-500">[?]</span>;
  }
};

export const FeedbackLog: React.FC<FeedbackLogProps> = ({ items, loading }) => {
  return (
    <div className="h-full flex flex-col bg-black/40 border border-zinc-800 rounded-lg overflow-hidden relative">
      {/* Header */}
      <div className="bg-zinc-900/80 p-2 border-b border-zinc-800 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
          <Radio size={12} className="text-neon-purple animate-pulse" />
          <span>Intercepted Comms</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-600">
          FREQ: 192.44 MHz
        </div>
      </div>

      {/* Log Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-xs custom-scrollbar relative">
         {/* Background Grid for aesthetic */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none opacity-20" />

        {loading ? (
          <div className="space-y-2 animate-pulse z-10 relative">
             <div className="text-neon-blue/50">> SEARCHING FREQUENCIES...</div>
             <div className="h-4 bg-zinc-800/50 w-2/3 rounded"></div>
             <div className="h-4 bg-zinc-800/50 w-1/2 rounded"></div>
             <div className="h-4 bg-zinc-800/50 w-3/4 rounded"></div>
          </div>
        ) : (
            items.length > 0 ? (
              items.map((item, idx) => (
                <div key={idx} className="relative z-10 group">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-zinc-500 text-[10px]">{new Date().toLocaleTimeString()}</span>
                    <span className="text-neon-purple font-bold opacity-80">
                        {item.user}@{item.platform}
                    </span>
                    <SentimentIcon sentiment={item.sentiment} />
                  </div>
                  <div className="pl-10 border-l border-zinc-800 ml-2 text-zinc-300 group-hover:text-white transition-colors">
                    <span className="text-zinc-600 mr-2 select-none">{`>`}</span>
                    {item.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-zinc-500 italic z-10 relative">> No transmissions detected.</div>
            )
        )}
      </div>
      
      {/* Footer */}
      <div className="p-1 bg-zinc-900/50 border-t border-zinc-800 text-[9px] text-center text-zinc-600 font-mono uppercase">
         Monitoring Social Frequencies
      </div>
    </div>
  );
};
