"use client";

import FadeIn from "@/components/FadeIn";
import { Github, Linkedin } from "@/components/Icons";
import { 
  Mail, 
  ExternalLink, 
  Code2, 
  ArrowUpRight, 
  Terminal, 
  FolderGit2 
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-12 md:py-20 space-y-12">
      
      {/* ---------------- FLOATING NAVBAR ---------------- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-card px-6 py-3 rounded-full flex items-center gap-6 text-sm font-medium">
        <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
        <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
        <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
      </nav>

      {/* ---------------- BENTO GRID CONTAINER ---------------- */}
      <div id="about" className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
        
        {/* HERO CARD (Spans 2 columns) */}
        <FadeIn delay={0.1} className="md:col-span-2">
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for New Projects & Roles
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Evans Rwothomio</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                Full-Stack Developer bridging modern web frameworks, AI agentic workflows, and cloud infrastructure. Focused on building fast, accessible, and user-centric software.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-800/80">
              <a href="#contact" className="px-5 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2">
                Get in Touch <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass-card text-zinc-400 hover:text-white transition-colors" aria-label="GitHub Profile">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass-card text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn Profile">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </FadeIn>

        {/* QUICK PROFILE / STATS CARD */}
        <FadeIn delay={0.2} className="md:col-span-1">
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-zinc-800/60 w-fit text-cyan-400">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Primary Focus</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                [E.g., Web3 Protocols, AI-Assisted Workflows, Full-Stack Systems Architecture & Cloud Services]
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/80 text-xs text-zinc-500">
              📍 Based in [Your Location / Remote]
            </div>
          </div>
        </FadeIn>

        {/* FEATURED PROJECTS HEADER */}
        <div id="projects" className="md:col-span-3 pt-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-cyan-400" /> Featured Projects
          </h2>
        </div>

        {/* PROJECT CARD 1 (Spans 2 columns) */}
        <FadeIn delay={0.3} className="md:col-span-2">
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ Category / Domain ]</span>
                <a href="#" className="p-2 rounded-full glass-card text-zinc-400 hover:text-white transition-colors" aria-label="Open project 1">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">[ Project Title 1 ]</h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                [Detailed project description explaining the problem, architectural choices, and technical solution delivered.]
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
              {["Next.js", "FastAPI", "Tailwind CSS", "Supabase"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* PROJECT CARD 2 (Spans 1 column) */}
        <FadeIn delay={0.4} className="md:col-span-1">
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ Mobile / Web ]</span>
                <a href="#" className="p-2 rounded-full glass-card text-zinc-400 hover:text-white transition-colors" aria-label="Open project 2">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">[ Project Title 2 ]</h3>
              <p className="text-zinc-400 text-sm mb-6">
                [Brief description highlighting real-time capability, offline resilience, or AI integrations.]
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
              {["React", "Node.js", "PostgreSQL"].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* SKILLS MATRIX CARD (Spans 3 columns) */}
        <FadeIn delay={0.5} className="md:col-span-3">
          <div id="skills" className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" /> Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Languages</h4>
                <p className="text-sm text-zinc-300 font-medium">TypeScript, JavaScript, Python, C, SQL, HTML/CSS</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Frameworks</h4>
                <p className="text-sm text-zinc-300 font-medium">Next.js, React, FastAPI, Tailwind CSS, Node.js</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Cloud & Data</h4>
                <p className="text-sm text-zinc-300 font-medium">Supabase, Vercel, MySQL, Cloud Services, REST APIs</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">Tools & Systems</h4>
                <p className="text-sm text-zinc-300 font-medium">VS Code, Git/GitHub, LangChain, SAD & DFD Diagrams</p>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* FOOTER / CONTACT CARD (Spans 3 columns) */}
        <FadeIn delay={0.6} className="md:col-span-3">
          <div id="contact" className="glass-card rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold">Let&apos;s build something remarkable together.</h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-sm md:text-base">
              I&apos;m open to freelance opportunities, collaborative projects, or full-time roles.
            </p>
            <div>
              <a href="mailto:your.email@example.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 transition-colors">
                <Mail className="w-5 h-5" /> Say Hello
              </a>
            </div>
            <p className="text-xs text-zinc-600 pt-8">
              © 2026 • Built with Next.js & Framer Motion
            </p>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
