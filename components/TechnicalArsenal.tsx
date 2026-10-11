"use client";

import React, { useState } from "react";
import { Atom } from "lucide-react";

interface SkillItem {
  name: string;
  category: "Languages" | "Frameworks" | "AI & Tools" | "Cloud & Data" | "Tools & Systems";
  icon: string;
  ring: 1 | 2 | 3;
  angle: number; // in degrees
}

const ALL_SKILLS: SkillItem[] = [
  // Ring 1 (Core Foundations - 4 items: 0°, 90°, 180°, 270°)
  { name: "TypeScript", category: "Languages", icon: "https://cdn.simpleicons.org/typescript/3178C6", ring: 1, angle: 0 },
  { name: "React", category: "Frameworks", icon: "https://cdn.simpleicons.org/react/61DAFB", ring: 1, angle: 90 },
  { name: "Python", category: "Languages", icon: "https://cdn.simpleicons.org/python/3776AB", ring: 1, angle: 180 },
  { name: "Next.js", category: "Frameworks", icon: "https://cdn.simpleicons.org/nextdotjs/white", ring: 1, angle: 270 },

  // Ring 2 (Frameworks, Web, Cloud & Core - 8 items)
  { name: "JavaScript", category: "Languages", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", ring: 2, angle: 25 },
  { name: "FastAPI", category: "Frameworks", icon: "https://cdn.simpleicons.org/fastapi/009688", ring: 2, angle: 70 },
  { name: "Tailwind CSS", category: "Frameworks", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", ring: 2, angle: 115 },
  { name: "Supabase", category: "Cloud & Data", icon: "https://cdn.simpleicons.org/supabase/3FCF8E", ring: 2, angle: 160 },
  { name: "Node.js", category: "Frameworks", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", ring: 2, angle: 205 },
  { name: "SQL", category: "Languages", icon: "https://cdn.simpleicons.org/mysql/4479A1", ring: 2, angle: 250 },
  { name: "Claude AI", category: "AI & Tools", icon: "https://cdn.simpleicons.org/anthropic/CC9B7A", ring: 2, angle: 295 },
  { name: "Git", category: "Tools & Systems", icon: "https://cdn.simpleicons.org/git/F05032", ring: 2, angle: 340 },

  // Ring 3 (Outer Orbit - 16 items)
  { name: "Google Antigravity", category: "AI & Tools", icon: "https://cdn.simpleicons.org/google/4285F4", ring: 3, angle: 0 },
  { name: "C", category: "Languages", icon: "https://cdn.simpleicons.org/c/A8B9CC", ring: 3, angle: 22.5 },
  { name: "Gemini API", category: "AI & Tools", icon: "https://cdn.simpleicons.org/googlegemini/8E75B2", ring: 3, angle: 45 },
  { name: "HTML5", category: "Languages", icon: "https://cdn.simpleicons.org/html5/E34F26", ring: 3, angle: 67.5 },
  { name: "CSS3", category: "Languages", icon: "https://cdn.simpleicons.org/css/1572B6", ring: 3, angle: 90 },
  { name: "LangChain", category: "AI & Tools", icon: "https://cdn.simpleicons.org/langchain/1C3C3C", ring: 3, angle: 112.5 },
  { name: "Huawei Cloud", category: "Cloud & Data", icon: "https://cdn.simpleicons.org/huawei/FF0000", ring: 3, angle: 135 },
  { name: "Vercel", category: "Cloud & Data", icon: "https://cdn.simpleicons.org/vercel/white", ring: 3, angle: 157.5 },
  { name: "MySQL", category: "Cloud & Data", icon: "https://cdn.simpleicons.org/mysql/4479A1", ring: 3, angle: 180 },
  { name: "MiniPay / Web3", category: "Cloud & Data", icon: "https://cdn.simpleicons.org/ethereum/3C3C3D", ring: 3, angle: 202.5 },
  { name: "VS Code", category: "Tools & Systems", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", ring: 3, angle: 225 },
  { name: "GitHub", category: "Tools & Systems", icon: "https://cdn.simpleicons.org/github/white", ring: 3, angle: 247.5 },
  { name: "Figma", category: "Tools & Systems", icon: "https://cdn.simpleicons.org/figma/F24E1E", ring: 3, angle: 270 },
  { name: "Draw.io", category: "Tools & Systems", icon: "https://cdn.simpleicons.org/diagramsdotnet/F08705", ring: 3, angle: 292.5 },
  { name: "MySQL Workbench", category: "Tools & Systems", icon: "https://cdn.simpleicons.org/mysql/4479A1", ring: 3, angle: 315 },
  { name: "SAD / DFD & ERD", category: "Tools & Systems", icon: "https://cdn.simpleicons.org/diagramsdotnet/F08705", ring: 3, angle: 337.5 }
];

const CATEGORIES = [
  "All",
  "Languages",
  "Frameworks",
  "AI & Tools",
  "Cloud & Data",
  "Tools & Systems"
] as const;

export default function TechnicalArsenal() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === "All" 
    ? ALL_SKILLS 
    : ALL_SKILLS.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="w-full py-12 md:py-20 relative overflow-hidden">
      
      {/* ---------------- COSMIC ACCRETION DISC / STARFIELD GLOW ---------------- */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[340px] bg-gradient-to-b from-purple-600/30 via-cyan-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* ---------------- TOP HEADER ---------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-zinc-800/80 relative z-10 w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono border border-purple-500/20 mb-4">
            <Atom className="w-3.5 h-3.5 text-cyan-400" />
            // ORBITAL TECH GALAXY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">ARSENAL</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl">
            Providing high-performance web systems, cloud infrastructure &amp; agentic AI architectures.
          </p>
        </div>

        <div className="flex items-center gap-8 shrink-0">
          <div className="text-left md:text-right">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono leading-none">28+</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Technologies</div>
          </div>
          <div className="text-left md:text-right border-l border-zinc-800/80 pl-8">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono leading-none">5</div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Domains</div>
          </div>
        </div>
      </div>

      {/* ---------------- MAIN RESPONSIVE GALAXY LAYOUT ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10 w-full">
        
        {/* LEFT COLUMN: INTERACTIVE BROWSER & SKILL DOCK (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6 order-2 lg:order-1 w-full">
          
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-3">
              Filter by Domain
            </span>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20"
                      : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Highlight HUD - Clean Open Strip */}
          <div className="border-l-2 border-cyan-400/80 pl-4 py-2 min-h-[58px] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                {hoveredSkill ? "Inspecting Technology" : "Interactive Galaxy"}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                {hoveredSkill ? "Active Orbit" : "Hover any icon to pause"}
              </span>
            </div>
            <div className="mt-1 text-white font-bold text-base sm:text-lg flex items-center gap-2">
              {hoveredSkill ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  {hoveredSkill}
                </>
              ) : (
                <span className="text-zinc-400 text-xs sm:text-sm font-normal">
                  Hover over any orbiting node in the cosmic radar to inspect it.
                </span>
              )}
            </div>
          </div>

          {/* Full Categorized Skills List (All 28 skills appear cleanly without awkward scrollbars) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Active Arsenal ({filteredSkills.length})
              </span>
              <span className="text-[11px] text-zinc-600 font-mono">Click or hover to highlight</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {filteredSkills.map((skill) => {
                const isHighlighted = hoveredSkill === skill.name;
                return (
                  <button
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isHighlighted
                        ? "bg-cyan-500/25 border-cyan-400 text-white scale-105 shadow-md shadow-cyan-500/10"
                        : "bg-zinc-900/80 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="w-3.5 h-3.5 object-contain"
                      loading="lazy"
                    />
                    <span className="text-xs font-medium">{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: THE ORBITING COSMIC RADAR (7 cols) */}
        <div className="lg:col-span-7 xl:col-span-7 flex justify-center items-center relative py-6 sm:py-10 order-1 lg:order-2 w-full overflow-hidden pause-on-hover">
          
          {/* Proportional Fluid Radar Canvas: scales cleanly on mobile (310px), tablet (440px), and desktop (up to 620px) */}
          <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] lg:w-[540px] lg:h-[540px] xl:w-[600px] xl:h-[600px] flex items-center justify-center shrink-0">
            
            {/* Radar Background Guides & Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Horizontal Axis */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
              {/* Vertical Axis */}
              <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/25 to-transparent" />
            </div>

            {/* ---------------- CENTER CORE NUCLEUS ---------------- */}
            <div className="relative z-20 flex flex-col items-center justify-center pointer-events-auto">
              <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full glass-card border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/25 bg-zinc-950/90 relative group/core">
                <Atom className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 group-hover/core:text-purple-400 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950 animate-pulse" />
              </div>
              <span className="mt-2 text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase font-bold">
                CORE ENGINE
              </span>
            </div>

            {/* ---------------- RING 1: INNER ORBIT (4 Skills, 35s rotation) ---------------- */}
            <div className="absolute w-[36%] h-[36%] rounded-full border border-cyan-500/30 orbit-ring-1 pointer-events-none">
              {ALL_SKILLS.filter(s => s.ring === 1).map((skill) => {
                const rad = (skill.angle * Math.PI) / 180;
                const left = 50 + 50 * Math.cos(rad);
                const top = 50 + 50 * Math.sin(rad);
                const isHovered = hoveredSkill === skill.name;

                return (
                  <div
                    key={skill.name}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  >
                    <div className="orbit-counter-1">
                      <div
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-2xl glass-card flex items-center justify-center p-1.5 sm:p-2 border transition-all duration-300 cursor-pointer group/icon ${
                          isHovered 
                            ? "border-cyan-400 scale-125 bg-cyan-500/20 shadow-lg shadow-cyan-500/30 z-30" 
                            : "border-white/10 hover:border-cyan-400 hover:scale-110 bg-zinc-900/90 shadow-md"
                        }`}
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain" 
                        />
                        {/* Hover Tooltip */}
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-zinc-950/95 text-cyan-300 text-[10px] font-mono border border-zinc-700 pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-40">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---------------- RING 2: MIDDLE ORBIT (8 Skills, 50s reverse rotation) ---------------- */}
            <div className="absolute w-[66%] h-[66%] rounded-full border border-blue-500/25 orbit-ring-2 pointer-events-none">
              {ALL_SKILLS.filter(s => s.ring === 2).map((skill) => {
                const rad = (skill.angle * Math.PI) / 180;
                const left = 50 + 50 * Math.cos(rad);
                const top = 50 + 50 * Math.sin(rad);
                const isHovered = hoveredSkill === skill.name;

                return (
                  <div
                    key={skill.name}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  >
                    <div className="orbit-counter-2">
                      <div
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`relative w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-2xl glass-card flex items-center justify-center p-1.5 sm:p-2 border transition-all duration-300 cursor-pointer group/icon ${
                          isHovered 
                            ? "border-blue-400 scale-125 bg-blue-500/20 shadow-lg shadow-blue-500/30 z-30" 
                            : "border-white/10 hover:border-blue-400 hover:scale-110 bg-zinc-900/90 shadow-md"
                        }`}
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" 
                        />
                        {/* Hover Tooltip */}
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-zinc-950/95 text-blue-300 text-[10px] font-mono border border-zinc-700 pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-40">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---------------- RING 3: OUTER ORBIT (16 Skills, 70s rotation) ---------------- */}
            <div className="absolute w-[96%] h-[96%] rounded-full border border-purple-500/20 border-dashed orbit-ring-3 pointer-events-none">
              {ALL_SKILLS.filter(s => s.ring === 3).map((skill) => {
                const rad = (skill.angle * Math.PI) / 180;
                const left = 50 + 50 * Math.cos(rad);
                const top = 50 + 50 * Math.sin(rad);
                const isHovered = hoveredSkill === skill.name;

                return (
                  <div
                    key={skill.name}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  >
                    <div className="orbit-counter-3">
                      <div
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`relative w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-2xl glass-card flex items-center justify-center p-1 sm:p-1.5 border transition-all duration-300 cursor-pointer group/icon ${
                          isHovered 
                            ? "border-purple-400 scale-125 bg-purple-500/20 shadow-lg shadow-purple-500/30 z-30" 
                            : "border-white/10 hover:border-purple-400 hover:scale-110 bg-zinc-900/90 shadow-md"
                        }`}
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain" 
                        />
                        {/* Hover Tooltip */}
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-zinc-950/95 text-purple-300 text-[10px] font-mono border border-zinc-700 pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-40">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
