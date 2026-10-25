"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import InteractiveHeroLens from "@/components/InteractiveHeroLens";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import ProjectsSection from "@/components/ProjectsSection";
import { Github, Linkedin } from "@/components/Icons";
import { 
  Mail, 
  Check,
  ExternalLink, 
  FolderGit2,
  GraduationCap,
  BookOpen,
  School,
  Award,
  SendHorizontal,
  MapPin
} from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("evansrwothomio20@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <main className="min-h-screen w-full bg-black text-white relative">
      
      {/* ---------------- FLOATING NAVBAR ---------------- */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 glass-card px-5 sm:px-8 py-3 rounded-full flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-xl border border-white/10">
        <a href="#hero-lens" className="hover:text-cyan-400 transition-colors">Home</a>
        <a href="#story" className="hover:text-cyan-400 transition-colors">Story</a>
        <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
        <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
        <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
        <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
      </nav>

      {/* ---------------- 1. INTERACTIVE HERO LENS (OPENING LANDING SCREEN) ---------------- */}
      <InteractiveHeroLens />

      {/* ---------------- PORTFOLIO CONTENT SECTIONS ---------------- */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-24 md:space-y-36 pb-20">

      {/* ---------------- CYBER-RETRO ABOUT ME: THE STORY SO FAR ---------------- */}
      <FadeIn delay={0.1}>
        <section id="story" className="w-full pt-12 sm:pt-16 pb-8 relative">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Master 2-Column Retro Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
            
            {/* ================= LEFT COLUMN: RETRO PROFILE STACK ================= */}
            <div className="lg:col-span-5 flex flex-col space-y-5">
              
              {/* 1. Mini Profile Header Card (Stepped Pixel Border) */}
              <div className="pixel-corners bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 p-[2px] shadow-lg pixel-shadow-cyan">
                <div className="pixel-corners bg-zinc-950 p-4 sm:p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                      {/* Mini Pixel Avatar Frame */}
                      <div className="w-10 h-10 pixel-corners-sm bg-cyan-400 p-[1.5px] shrink-0">
                        <img 
                          src="/evans-about.png" 
                          alt="Evans Rwothomio avatar" 
                          className="w-full h-full object-cover object-[50%_20%] pixel-corners-sm grayscale"
                        />
                      </div>
                      <div>
                        <h2 className="font-pixel text-xs sm:text-sm text-white tracking-wide">
                          Evans Rwothomio
                        </h2>
                        <p className="font-retro-mono text-zinc-400 text-xs sm:text-sm">
                          Full-Stack Systems Engineer
                        </p>
                      </div>
                    </div>
                    {/* Retro Status Tag */}
                    <span className="font-pixel text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-sm">
                      v2.6
                    </span>
                  </div>

                  {/* Status & Social Ribbon */}
                  <div className="flex items-center justify-between pt-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                      <span className="font-retro-mono text-emerald-400 text-xs tracking-wider">
                        Available for work
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a 
                        href="https://github.com/evansrwothomio20-web" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 bg-zinc-900 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/50 transition-colors pixel-corners-sm"
                        title="GitHub"
                        aria-label="GitHub Profile"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 bg-zinc-900 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/50 transition-colors pixel-corners-sm"
                        title="LinkedIn"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <button 
                        onClick={handleCopyEmail}
                        className="p-1.5 bg-zinc-900 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/50 transition-colors pixel-corners-sm relative"
                        title="Copy Email"
                        aria-label="Copy Email"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Dithered Bitmap Portrait Frame (Stepped Pixel Cut Corners) */}
              <div className="pixel-corners bg-gradient-to-b from-cyan-400 via-zinc-700 to-amber-500 p-[2px] shadow-2xl pixel-shadow-dark">
                <div className="pixel-corners bg-zinc-950 p-2 sm:p-3 relative overflow-hidden group">
                  
                  {/* Photo Container with Dither Screen Overlay */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden pixel-corners-sm bg-zinc-900">
                    <img 
                      src="/evans-about.png" 
                      alt="Evans Rwothomio at Hackathon" 
                      className="w-full h-full object-cover object-[50%_15%] filter contrast-110 brightness-95 sepia-[0.2] grayscale group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />

                    {/* Dither Halftone Dot Matrix Overlay */}
                    <div className="absolute inset-0 dither-screen pointer-events-none mix-blend-multiply opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Retro Corner HUD Marker */}
                    <div className="absolute bottom-3 left-3 bg-zinc-950/90 border border-cyan-500/40 px-2.5 py-1 pixel-corners-sm">
                      <span className="font-pixel text-[9px] text-cyan-400 uppercase tracking-widest">
                        SYS // EVANS.DEV
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* ================= RIGHT COLUMN: RETRO STORY & CAPABILITIES ================= */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* 1. Main Bio Card (Stepped Pixel Border) */}
              <div className="pixel-corners bg-gradient-to-r from-cyan-500 via-zinc-700 to-zinc-800 p-[2px] shadow-xl">
                <div className="pixel-corners bg-zinc-950 flex flex-col justify-between">
                  
                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="font-pixel text-[11px] text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 animate-ping rounded-full" />
                        ABOUT // MISSION
                      </span>
                      <span className="font-retro-mono text-zinc-500 text-sm">
                        SEC_01
                      </span>
                    </div>

                    <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
                      THE STORY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">SO FAR</span>
                    </h1>

                    <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                      I&apos;m <strong className="text-white font-semibold">Evans Rwothomio</strong>, a Full-Stack Software Engineer dedicated to creating intuitive, resilient, and engaging digital experiences across high-performance web systems and cloud infrastructure.
                    </p>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                      Explore my <a href="#projects" className="text-cyan-400 font-medium hover:underline">works</a> to see how I blend architecture with clean usability, and feel free to <a href="#contact" className="text-amber-400 font-medium hover:underline">reach out</a> and collaborate on something remarkable!
                    </p>

                    {/* Architectural Quote */}
                    <div className="border-l-2 border-amber-400 pl-4 py-2 bg-amber-500/5 my-2">
                      <p className="font-retro-mono text-amber-300 text-base sm:text-lg italic">
                        &ldquo;Architect the design, test the boundary cases, and deploy with purpose.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Retro Location & Contact Strip (Warm Accent Bar Inspired by Reference) */}
                  <div className="bg-amber-500/10 border-t border-amber-500/20 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-retro-mono text-amber-300/90">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Kampala, Uganda • Remote Available</span>
                    </div>
                    <button 
                      onClick={handleCopyEmail}
                      className="text-left sm:text-right hover:text-amber-200 transition-colors flex items-center gap-1.5 group"
                    >
                      <span>evansrwothomio20@gmail.com</span>
                      <span className="text-[10px] text-amber-400 font-pixel opacity-70 group-hover:opacity-100">
                        {copied ? "[COPIED]" : "[COPY]"}
                      </span>
                    </button>
                  </div>

                </div>
              </div>

              {/* 2. Capabilities & Focus Box (8-bit Notched Cut Corners) */}
              <div className="pixel-notch bg-gradient-to-r from-amber-500/80 via-zinc-800 to-cyan-500/80 p-[2px] shadow-xl">
                <div className="pixel-notch bg-zinc-950 p-6 sm:p-7 space-y-5">
                  
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[10px] text-amber-400 uppercase tracking-widest">
                      // CORE DISCIPLINES &amp; SYSTEMS
                    </span>
                    <span className="font-retro-mono text-zinc-500 text-xs">
                      5 CAPABILITIES
                    </span>
                  </div>

                  {/* Retro 8-Bit Capability Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-retro-mono">
                    <div className="flex items-center gap-2.5 p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-amber-400/50 transition-colors">
                      <span className="font-pixel text-[10px] text-amber-400">[01]</span>
                      <span className="text-white font-medium">Full-Stack Web Systems</span>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-cyan-400/50 transition-colors">
                      <span className="font-pixel text-[10px] text-cyan-400">[02]</span>
                      <span className="text-white font-medium">Cloud Architecture &amp; DBs</span>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-amber-400/50 transition-colors">
                      <span className="font-pixel text-[10px] text-amber-400">[03]</span>
                      <span className="text-white font-medium">Agentic AI &amp; LLM Workflows</span>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-blue-400/50 transition-colors">
                      <span className="font-pixel text-[10px] text-blue-400">[04]</span>
                      <span className="text-white font-medium">Offline-First &amp; Web3 Engines</span>
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-2.5 p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-emerald-400/50 transition-colors">
                      <span className="font-pixel text-[10px] text-emerald-400">[05]</span>
                      <span className="text-white font-medium">Systems Analysis &amp; Architecture (DFD / ERD)</span>
                    </div>
                  </div>

                  {/* Call-to-action button */}
                  <div className="flex justify-end pt-2">
                    <a 
                      href="#contact"
                      className="font-pixel text-xs px-6 py-3 bg-zinc-900 text-amber-300 border-2 border-amber-400/80 hover:bg-amber-400 hover:text-zinc-950 transition-all duration-200 pixel-corners-sm flex items-center gap-2 group shadow-lg shadow-amber-500/10"
                    >
                      <span>Ping me</span>
                      <SendHorizontal className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </div>
              </div>

              {/* 3. Blocky 8-Bit Section Header (Works) */}
              <div className="pt-4">
                <h2 className="font-pixel text-4xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase">
                  WORKS
                </h2>
              </div>

            </div>

          </div>
        </section>
      </FadeIn>

      {/* ---------------- EDUCATION JOURNEY (Open Seamless Timeline Flow) ---------------- */}
      <FadeIn delay={0.2}>
        <section id="education" className="w-full py-8 md:py-16 relative">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-zinc-800/80">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                  Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Journey</span>
                </h2>
                <p className="text-sm text-zinc-400 mt-1">Academic foundation and qualifications</p>
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full">
              Academic History
            </span>
          </div>

          {/* Open Horizon Timeline - No Box Partitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* 1. University */}
            <div className="pt-6 border-t-2 border-cyan-500/80 flex flex-col justify-between group transition-all duration-300">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Bachelor&apos;s Degree
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    Current
                  </span>
                </div>
                <h3 className="font-bold text-white text-xl sm:text-2xl group-hover:text-cyan-400 transition-colors">
                  Cavendish University Uganda
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 mt-2 font-medium">
                  BSc Software Engineering
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" /> Higher Education
              </div>
            </div>

            {/* 2. A-Level */}
            <div className="pt-6 border-t-2 border-blue-500/60 hover:border-blue-400 flex flex-col justify-between group transition-all duration-300">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
                    A-Level
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
                <h3 className="font-bold text-white text-xl sm:text-2xl group-hover:text-blue-400 transition-colors">
                  St. Noa Mawaggali SSS
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 mt-2 font-medium">
                  Jinja, Uganda
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 flex items-center gap-2">
                <School className="w-4 h-4 text-blue-400" /> Advanced Secondary
              </div>
            </div>

            {/* 3. O-Level */}
            <div className="pt-6 border-t-2 border-indigo-500/50 hover:border-indigo-400 flex flex-col justify-between group transition-all duration-300">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                    O-Level
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
                <h3 className="font-bold text-white text-xl sm:text-2xl group-hover:text-indigo-400 transition-colors">
                  Bishop Cipriano Kihangire SSS
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 mt-2 font-medium">
                  Luzira, Kampala
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 flex items-center gap-2">
                <School className="w-4 h-4 text-indigo-400" /> Ordinary Secondary
              </div>
            </div>

            {/* 4. Primary */}
            <div className="pt-6 border-t-2 border-zinc-700 hover:border-zinc-500 flex flex-col justify-between group transition-all duration-300">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Primary Foundation
                  </span>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg sm:text-xl group-hover:text-cyan-400 transition-colors leading-snug">
                  Bishop Cipriano Kihangire
                </h3>
                <p className="text-sm text-zinc-400 mt-2 font-medium">
                  &amp; Mivule Primary School (Mutungo)
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-zinc-400" /> Early Foundation
              </div>
            </div>

          </div>
        </section>
      </FadeIn>

      {/* ---------------- FEATURED PROJECTS & GITHUB REPOSITORIES ---------------- */}
      <FadeIn delay={0.25}>
        <ProjectsSection />
      </FadeIn>

      {/* ---------------- TECHNICAL ARSENAL (Seamless Full Page Flow) ---------------- */}
      <FadeIn delay={0.3}>
        <TechnicalArsenal />
      </FadeIn>

      {/* ---------------- CONTACT & FOOTER (Seamless Full Page Flow) ---------------- */}
      <FadeIn delay={0.4}>
        <section id="contact" className="w-full pt-16 pb-20 md:pt-24 md:pb-28 text-center relative overflow-hidden border-t border-zinc-800/80">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight">
              Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">remarkable</span> together.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              I&apos;m open to freelance opportunities, collaborative projects, or full-time engineering roles.
            </p>
            <div className="pt-4">
              <a 
                href="mailto:evansrwothomio20@gmail.com" 
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-zinc-950 font-bold hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 text-sm sm:text-base group"
              >
                <Mail className="w-5 h-5" /> Say Hello
              </a>
            </div>
            <p className="text-xs font-mono text-zinc-600 pt-16">
              © 2026 Evans Rwothomio • Built with Next.js &amp; Framer Motion
            </p>
          </div>
        </section>
      </FadeIn>

      </div>
    </main>
  );
}
