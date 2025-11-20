import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Closed from './pages/Closed';

const App: React.FC = () => {
  // State to track access and simulation mode
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  
  // Simulation state to allow users to test the app even if they are outside real working hours
  // This is a Developer Experience feature.
  const [simulatedDate, setSimulatedDate] = useState<Date | null>(null);
  // We need a trigger to update the UI even if using real time (clock tick)
  const [tick, setTick] = useState(0);

  // Get the effective date (simulated or real)
  const effectiveDate = simulatedDate || new Date();

  useEffect(() => {
    // Re-render every minute if using real time to keep the displayed time current
    // or to check business hours boundaries
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000); // Check every second for smoother UI clock, though business logic only needs minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkAvailability = () => {
      const now = effectiveDate;
      const day = now.getDay(); // 0 = Sunday, 6 = Saturday
      const hour = now.getHours(); // 0 to 23

      // Logic: Monday (1) to Friday (5) AND between 9am (9) and 5pm (17)
      // 17:00:00 is the cutoff, so hours must be < 17
      const isWorkDay = day >= 1 && day <= 5;
      const isWorkHour = hour >= 9 && hour < 17;

      setIsAvailable(isWorkDay && isWorkHour);
    };

    checkAvailability();
  }, [effectiveDate, tick]); // Re-run when effective date changes or timer ticks

  // --- Simulation Helpers ---

  const formatDateForInput = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
        setSimulatedDate(null);
        return;
    }
    // Create date from input value (which is local time)
    setSimulatedDate(new Date(e.target.value));
  };

  const forceOpen = () => {
      const d = new Date();
      // Set to next Monday (or today if Monday)
      const day = d.getDay();
      // Logic to find a Monday quickly: just add days until Monday
      d.setDate(d.getDate() + ((1 + 7 - day) % 7)); 
      d.setHours(10, 0, 0, 0);
      setSimulatedDate(d);
  };

  const forceClose = () => {
      const d = new Date();
      // Set to next Sunday
      const day = d.getDay();
      d.setDate(d.getDate() + ((7 - day + 7) % 7) || 7);
      d.setHours(10, 0, 0, 0);
      setSimulatedDate(d);
  };

  return (
    <>
      {isAvailable ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      ) : (
        <Closed />
      )}

      {/* Enhanced Developer Tool */}
      <div className="fixed bottom-4 right-4 bg-slate-900/95 text-white p-4 rounded-xl text-sm z-50 flex flex-col gap-4 backdrop-blur-md shadow-2xl border border-slate-700 w-80 font-sans">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-3">
            <div className="flex flex-col">
              <span className="font-bold text-indigo-400">Time Travel Debugger</span>
              <span className="text-[10px] text-slate-500">Simulate access times</span>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${isAvailable ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/50' : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50'}`}>
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></span>
                {isAvailable ? 'OPEN' : 'CLOSED'}
            </div>
        </div>
        
        {/* Time Display */}
        <div className="bg-slate-800 rounded-lg p-3 flex flex-col items-center border border-slate-700 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50"></div>
             <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                {simulatedDate ? 'Simulated Time' : 'Real Time'}
             </span>
             <div className="flex items-center gap-2">
                 {!simulatedDate && <span className="text-[10px] text-green-400 font-bold tracking-wider animate-pulse bg-green-400/10 px-1 rounded">LIVE</span>}
                 <span className="font-mono text-2xl text-white font-bold tracking-widest">
                    {effectiveDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                 </span>
             </div>
             <span className="text-xs text-slate-400 mt-1">
                {effectiveDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
        </div>

        {/* Manual Control */}
        <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 block">
                Manual Override
            </label>
            <input 
                type="datetime-local" 
                aria-label="Set simulated date and time"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-xs"
                value={formatDateForInput(effectiveDate)}
                onChange={handleDateChange}
            />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
            <button onClick={forceOpen} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 py-2 px-3 rounded-lg text-xs transition-colors flex flex-col items-center gap-1 group">
                <span className="font-semibold text-green-400 group-hover:text-green-300">Force Open</span>
                <span className="text-[10px] text-slate-500">Mon 10:00</span>
            </button>
            <button onClick={forceClose} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 py-2 px-3 rounded-lg text-xs transition-colors flex flex-col items-center gap-1 group">
                <span className="font-semibold text-red-400 group-hover:text-red-300">Force Close</span>
                <span className="text-[10px] text-slate-500">Sun 10:00</span>
            </button>
        </div>
        
        {/* Reset Button */}
        <button 
            onClick={() => setSimulatedDate(null)} 
            disabled={!simulatedDate}
            className={`w-full py-2 rounded-lg text-xs font-medium transition-colors border ${
              !simulatedDate 
                ? 'bg-slate-800 border-slate-600 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'
            }`}
        >
            Reset Simulation
        </button>
        
        <div className="text-[10px] text-slate-500 text-center border-t border-slate-700 pt-2 mt-1">
            Config: Mon-Fri, 09:00 - 17:00
        </div>
      </div>
    </>
  );
};

export default App;