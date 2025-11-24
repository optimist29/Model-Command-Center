
import React, { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { NewsFeed } from './components/NewsFeed';
import { SentimentGauge } from './components/SentimentGauge';
import { StatsPanel } from './components/StatsPanel';
import { FeedbackLog } from './components/FeedbackLog';
import { fetchLaunchData } from './services/gemini';
import { DashboardData } from './types';
import { RotateCw, Search } from 'lucide-react';

const App: React.FC = () => {
  const [targetModel, setTargetModel] = useState<string>("Gemini 2.5 Flash");
  const [data, setData] = useState<DashboardData>({
    hypeLevel: 0,
    themes: [],
    feedback: [],
    lastUpdated: 'Init...'
  });
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async (modelName: string) => {
    setLoading(true);
    const result = await fetchLaunchData(modelName);
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData(targetModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    loadData(targetModel);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        loadData(targetModel);
    }
  };

  return (
    <div className="min-h-screen bg-void text-gray-300 font-sans selection:bg-neon-blue selection:text-black overflow-hidden flex flex-col bg-grid-pattern relative">
      {/* CRT Scanline Effect */}
      <div className="scanline pointer-events-none fixed inset-0 z-50"></div>
      
      <Header />

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
            
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-zinc-800/50 pb-4 gap-4">
             <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="flex flex-col w-full md:w-auto">
                    <label className="text-[10px] text-neon-blue font-mono mb-1 tracking-wider uppercase">Target Model Protocol</label>
                    <div className="relative group">
                        <input 
                            type="text" 
                            value={targetModel}
                            onChange={(e) => setTargetModel(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="ENTER MODEL DESIGNATION..."
                            className="bg-black/50 border border-zinc-700 text-white font-mono text-sm pl-8 pr-4 py-2 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] w-full md:w-64 transition-all uppercase placeholder:text-zinc-700"
                        />
                        <Search className="absolute left-2.5 top-2.5 text-zinc-600 w-4 h-4 group-focus-within:text-neon-blue transition-colors" />
                    </div>
                 </div>
             </div>

             <div className="flex items-center gap-4">
                 <div className="text-[10px] font-mono text-zinc-500 hidden md:block">
                    LAST SYNC: <span className="text-zinc-300">{data.lastUpdated}</span>
                 </div>
                 <button 
                   onClick={handleRefresh}
                   disabled={loading}
                   className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-neon-blue hover:bg-neon-blue/10 text-xs font-mono text-white rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 group"
                 >
                    <RotateCw size={14} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    INITIATE SCAN
                 </button>
             </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* Left Column: News */}
            <div className="md:col-span-4 lg:col-span-3 h-full min-h-[300px] flex flex-col">
               <NewsFeed items={data.themes} loading={loading} />
            </div>

            {/* Center Column: Gauge & Feedback */}
            <div className="md:col-span-4 lg:col-span-6 flex flex-col gap-6">
               {/* Top: Gauge */}
               <div className="flex-1 flex items-center justify-center min-h-[280px]">
                 <div className="w-full max-w-md h-full">
                   <SentimentGauge value={data.hypeLevel} loading={loading} modelName={targetModel} />
                 </div>
               </div>
               
               {/* Bottom: Live Feedback Log */}
               <div className="h-1/3 min-h-[200px]">
                 <FeedbackLog items={data.feedback} loading={loading} />
               </div>
            </div>

            {/* Right Column: Stats */}
            <div className="md:col-span-4 lg:col-span-3 h-full min-h-[300px]">
               <StatsPanel stats={data.stats} modelName={targetModel} loading={loading} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
