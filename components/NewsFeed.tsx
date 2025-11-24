
import React from 'react';
import { MessageSquare, ExternalLink, Terminal, ArrowRight } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsFeedProps {
  items: NewsItem[];
  loading: boolean;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ items, loading }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-400 text-xs font-mono uppercase pl-1 flex items-center gap-2">
          <Terminal size={14} />
          Incoming Transmissions
        </h3>
        <span className="text-[10px] bg-zinc-900 text-zinc-500 px-2 py-1 rounded border border-zinc-800">
            Latest 24h
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 h-full custom-scrollbar">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-zinc-800 bg-zinc-900/30 p-4 rounded-lg animate-pulse">
              <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-zinc-800/50 rounded w-full mb-2"></div>
              <div className="h-3 bg-zinc-800/50 rounded w-1/2"></div>
            </div>
          ))
        ) : (
            items.map((item, idx) => (
            <div 
                key={idx} 
                className="group relative border-l-2 border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-neon-blue pl-4 py-4 pr-3 transition-all duration-300 cursor-default overflow-hidden flex flex-col"
            >
                <div className="flex items-start justify-between mb-2 relative z-10">
                  <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-neon-blue transition-colors leading-snug font-mono tracking-tight">
                      {item.headline}
                  </h4>
                </div>
                
                <p className="text-xs text-zinc-400 leading-relaxed mb-10 transition-all relative z-10 line-clamp-3 group-hover:line-clamp-none group-hover:text-zinc-300">
                    {item.summary}
                </p>
                
                <div className="absolute bottom-3 left-4 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase font-mono group-hover:text-zinc-500 transition-colors">
                        <MessageSquare size={10} />
                        {item.source}
                    </div>
                    
                    {/* Prominent Hover Action */}
                    {item.url && (
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-center gap-2 text-[10px] bg-neon-blue text-black font-bold px-4 py-1.5 rounded-sm hover:bg-white hover:shadow-[0_0_15px_rgba(0,243,255,0.6)] uppercase tracking-wider"
                      >
                        ACCESS INTEL <ArrowRight size={12} />
                      </a>
                    )}
                </div>
                
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            ))
        )}
      </div>
    </div>
  );
};
