import React, { useState } from 'react';
import ParticleComputer from './components/ParticleComputer';
import RetroMonitor from './components/RetroMonitor';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.BOOT);
  const [isComputerOpen, setIsComputerOpen] = useState(false);

  const handleInteract = (type: 'COMPUTER' | 'MAP' | 'FOLDER') => {
    setIsComputerOpen(true);
    // Add a slight delay before showing the desktop to allow particles to disperse
    setTimeout(() => {
        if (type === 'COMPUTER') {
            setView(ViewState.DESKTOP);
        } else if (type === 'MAP') {
            setView(ViewState.MAP);
        } else {
            setView(ViewState.PROJECTS);
        }
    }, 600);
  };

  const handleReturnHome = () => {
      setIsComputerOpen(false);
      // Optional: Reset view after animation matches
      setTimeout(() => {
          setView(ViewState.BOOT);
      }, 1000);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* 1. Background Particle System */}
      <div className={`absolute inset-0 z-10 transition-all duration-1000 ${isComputerOpen ? 'scale-150 opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <ParticleComputer onInteract={handleInteract} isExpanded={isComputerOpen} />
      </div>

      {/* 2. Main Retro Monitor Interface */}
      <div className={`
          relative z-20 w-[95vw] h-[90vh] md:w-[85vw] md:h-[85vh] max-w-6xl 
          transition-all duration-1000 transform
          ${isComputerOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
      `}>
          {view !== ViewState.BOOT && (
            <RetroMonitor view={view} setView={setView} onReturnHome={handleReturnHome} />
          )}
      </div>

      {/* 3. Helper Hint if not opened */}
      {!isComputerOpen && (
          <div className="absolute bottom-8 text-white/30 text-sm font-mono z-0 flex gap-12">
             <span>EXPLORE RESUME</span>
             <span>VIEW PROJECTS</span>
             <span>TRACK JOURNEY</span>
          </div>
      )}

    </div>
  );
};

export default App;