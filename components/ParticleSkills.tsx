import React, { useState } from 'react';
import { SkillSet } from '../types';

interface ParticleSkillsProps {
  skills: SkillSet;
}

interface SkillBarProps {
  name: string;
  level: string; // "Fluent" or similar if text
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, percentage }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="mb-4 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between text-sm mb-1 font-bold font-mono">
        <span className="text-amber-500 group-hover:text-amber-300 transition-colors">
            {'>'} {name}
        </span>
        <span className="opacity-80">
            {hovered ? `${percentage}%` : level} <span className="animate-pulse">_</span>
        </span>
      </div>
      
      {/* Bar Container */}
      <div className="h-6 w-full bg-amber-900/20 border border-amber-500/50 p-[2px] relative overflow-hidden">
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 opacity-20" 
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(245, 158, 11, 0.3) 50%)', backgroundSize: '10px 100%' }}>
         </div>

         {/* The Fill Bar */}
         <div 
            className="h-full bg-amber-500 transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: hovered ? `${percentage}%` : '0%' }}
         >
            {/* Striped Texture on the bar */}
             <div className="absolute inset-0 w-full h-full" 
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.2) 5px, rgba(0,0,0,0.2) 10px)' }}>
             </div>
         </div>
      </div>
    </div>
  );
};

const ParticleSkills: React.FC<ParticleSkillsProps> = ({ skills }) => {
  // Mapping of specific percentages
  const skillValues: Record<string, number> = {
    "english": 85,
    "french": 90,
    "chinese": 90,
    "python": 80,
    "n8n": 80,
    "supabase": 85,
    "postgresql": 70,
    "acceo": 90
  };

  // Helper to normalize data
  const parseSkill = (str: string, defaultVal: number) => {
      const match = str.match(/(.*?)\((.*?)\)/);
      let name = str;
      let level = "PROFICIENT";

      if (match) {
        name = match[1].trim();
        level = match[2].trim();
      }

      // Check map first (case insensitive), then default
      const lowerName = name.toLowerCase();
      const percentage = skillValues[lowerName] || defaultVal;

      return { name, level, percentage };
  };

  const languages = skills.languages.map(s => parseSkill(s, 85));
  const technical = skills.technical.map(s => parseSkill(s, 75));

  return (
    <div className="w-full">
        <div className="mb-6">
            <h4 className="text-sm bg-amber-500 text-black px-1 inline-block font-bold mb-3">LANGUAGES</h4>
            {languages.map((s, i) => (
                <SkillBar key={i} {...s} />
            ))}
        </div>

        <div>
            <h4 className="text-sm bg-amber-500 text-black px-1 inline-block font-bold mb-3">TECHNICAL STACK</h4>
            {technical.map((s, i) => (
                <SkillBar key={i} {...s} />
            ))}
        </div>
    </div>
  );
};

export default ParticleSkills;