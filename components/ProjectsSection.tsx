"use client";

import React, { useState } from "react";
import { 
  FolderGit2, 
  ExternalLink, 
  Globe, 
  Terminal, 
  Cpu, 
  Layers, 
  Sparkles, 
  ArrowUpRight,
  Radio,
  Workflow,
  HeartHandshake
} from "lucide-react";
import { Github } from "@/components/Icons";

interface Project {
  id: string;
  title: string;
  categoryTag: string;
  category: "all" | "web" | "web3" | "cloud" | "ai";
  description: string;
  highlights: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  isFeatured?: boolean;
  accentColor: string; // "cyan" | "amber" | "blue" | "emerald" | "purple"
}

const PROJECTS_DATA: Project[] = [
  {
    id: "mdaad-now",
    title: "Mdaad Now",
    categoryTag: "HUMANITARIAN TECH // OFFLINE PWA",
    category: "web",
    description: "An offline-first PWA for real-time crisis response, aid mapping, and emergency coordination in disconnected conflict zones.",
    highlights: "Engineered for resilient operation with client-side cryptographic storage, offline geospatial mapping, and low-bandwidth telemetry.",
    tags: ["React / PWA", "Offline-First", "Leaflet GIS", "UNICEF Innovation", "Tailwind CSS"],
    repoUrl: "https://github.com/evansrwothomio20-web/Mdaad-Now",
    liveUrl: "https://mdaad-now.vercel.app/",
    isFeatured: true,
    accentColor: "cyan"
  },
  {
    id: "the-bridge-protocol",
    title: "The Bridge Protocol",
    categoryTag: "DECENTRALIZED & WEB3 ARCHITECTURE",
    category: "web3",
    description: "Decentralized protocol enabling peer-to-peer micro-task coordination, verifiable community settlement, and transparent payment verification.",
    highlights: "Peer-to-peer transaction verification, smart contract settlement bridges, and cryptographic auditing.",
    tags: ["JavaScript", "Web3", "Smart Contracts", "MicroPay Engine", "Vercel"],
    repoUrl: "https://github.com/evansrwothomio20-web/The-Bridge-Protocal",
    liveUrl: "https://the-bridge-protocal.vercel.app",
    isFeatured: true,
    accentColor: "blue"
  },
  {
    id: "ecofarm",
    title: "Ecofarm Uganda",
    categoryTag: "SMART AGRITECH & COMMERCE",
    category: "web",
    description: "Digital agricultural commerce platform empowering local farmers with smart harvest tracking, direct market access, and yield analytics.",
    highlights: "Streamlines farm-to-table transactions and farmer revenue transparency with responsive mobile-ready interfaces.",
    tags: ["Full-Stack Web", "React", "Cloud Architecture", "AgriTech APIs", "Vercel"],
    repoUrl: "https://github.com/evansrwothomio20-web/Ecofarm",
    liveUrl: "https://ecofarmug.vercel.app",
    isFeatured: true,
    accentColor: "emerald"
  },
  {
    id: "gemyte",
    title: "GEMYTE Digital Agency",
    categoryTag: "PRODUCTION CLIENT PLATFORM",
    category: "web",
    description: "High-conversion corporate digital solutions showcase engineered with sleek interactive aesthetics, fast load times, and dynamic component styling.",
    highlights: "Engineered for 99+ Core Web Vitals with smooth fluid interactions and bespoke typography.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel Cloud", "Modern UI/UX"],
    repoUrl: "https://github.com/evansrwothomio20-web/GEMYTE",
    liveUrl: "https://gemyte.vercel.app",
    isFeatured: true,
    accentColor: "amber"
  },
  {
    id: "gophercon-africa-2026",
    title: "GopherCon Africa 2026 Engine",
    categoryTag: "CLOUD MICROSERVICES & CONCURRENCY",
    category: "cloud",
    description: "Distributed backend services and concurrency workshop demonstrations engineered for GopherCon Africa 2026 in Nairobi.",
    highlights: "Benchmarked concurrency pipelines, async task dispatching, and containerized cloud deployment on Render.",
    tags: ["Python / Go", "Microservices", "Concurrency", "Docker", "Render Cloud"],
    repoUrl: "https://github.com/evansrwothomio20-web/workshop-gophercon-africa-2026",
    liveUrl: "https://workshop-gophercon-africa-2026-215j.onrender.com",
    isFeatured: false,
    accentColor: "cyan"
  },
  {
    id: "receipt-generator",
    title: "AI Automated Receipt Generator",
    categoryTag: "AUTOMATION & DOCUMENT SYNTHESIS",
    category: "ai",
    description: "Automated AI-assisted invoicing and receipt formatting engine generating structured accounting documentation with dynamic calculations.",
    highlights: "Client-side vector document rendering, dynamic tax breakdown algorithms, and automated instant PDF generation.",
    tags: ["AI Automation", "JavaScript", "HTML5 Canvas", "Document Engines", "Invoicing"],
    repoUrl: "https://github.com/evansrwothomio20-web/receipt-generator",
    liveUrl: "https://github.com/evansrwothomio20-web/receipt-generator",
    isFeatured: false,
    accentColor: "amber"
  },
  {
    id: "the-bridge",
    title: "The Bridge Community Hub",
    categoryTag: "COMMUNITY GIG EXCHANGE",
    category: "web",
    description: "Community coordination platform connecting neighborhood residents to find affordable verified help for local services and micro-tasks.",
    highlights: "Lightweight, low-bandwidth accessible frontend architecture with responsive task boards.",
    tags: ["Frontend Engineering", "Responsive CSS", "JavaScript", "GitHub Pages"],
    repoUrl: "https://github.com/evansrwothomio20-web/The-Bridge",
    liveUrl: "https://evansrwothomio20-web.github.io/The-Bridge/",
    isFeatured: false,
    accentColor: "blue"
  },
  {
    id: "st-marys-church",
    title: "St. Mary's Catholic Church Nakasongola",
    categoryTag: "PARISH & COMMUNITY PORTAL",
    category: "web",
    description: "Official web platform and communication hub serving Nakasongola parish community members with schedules, news, and outreach.",
    highlights: "Mobile-optimized community portal with high accessibility scores and clean multi-device typography.",
    tags: ["HTML5 / CSS3", "SEO Optimization", "Mobile-First", "GitHub Pages"],
    repoUrl: "https://github.com/evansrwothomio20-web/St.-Mary-s-Catholic-Church-Nakasongola",
    liveUrl: "https://evansrwothomio20-web.github.io/St.-Mary-s-Catholic-Church-Nakasongola",
    isFeatured: false,
    accentColor: "emerald"
  },
  {
    id: "akili-intern-deployment",
    title: "Akili Cloud PAAS Deployment Guide",
    categoryTag: "DEVOPS & INFRASTRUCTURE",
    category: "cloud",
    description: "Production onboarding framework and deployment recipes guiding software engineering interns through PAAS cloud deployments.",
    highlights: "Step-by-step CI/CD automation guides, environment variable management, and PAAS container deployment.",
    tags: ["DevOps", "PAAS Cloud", "CI/CD Workflows", "Docker", "Cloud Guides"],
    repoUrl: "https://github.com/evansrwothomio20-web/Akili-intern-Deployment",
    isFeatured: false,
    accentColor: "cyan"
  },
  {
    id: "self-updating-repo",
    title: "Autonomous Self-Updating Profile",
    categoryTag: "CI/CD & WORKFLOW AUTOMATION",
    category: "cloud",
    description: "Autonomous repository pipeline executing scheduled GitHub Actions workflows to aggregate coding metrics and update profile telemetry.",
    highlights: "Automated cron schedules, GitHub GraphQL API data pulling, and dynamic SVG/markdown compilation.",
    tags: ["GitHub Actions", "Cron Automations", "GraphQL API", "YAML", "CI/CD"],
    repoUrl: "https://github.com/evansrwothomio20-web/Self-updating-repo",
    isFeatured: false,
    accentColor: "purple"
  },
  {
    id: "akili-za-kesho",
    title: "Akili Za Kesho (Minds of Tomorrow)",
    categoryTag: "YOUTH AI & EMERGING TECH",
    category: "ai",
    description: "Youth technology empowerment curriculum and learning hub exploring modern artificial intelligence, coding foundations, and cognitive tools.",
    highlights: "Interactive learning materials, open curriculum modules, and introductory AI literacy resources.",
    tags: ["AI Education", "Python", "Community Tech", "Curriculum Design"],
    repoUrl: "https://github.com/evansrwothomio20-web/akili-za-kesho",
    isFeatured: false,
    accentColor: "amber"
  }
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "web" | "web3" | "cloud" | "ai">("all");

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const featuredProjects = PROJECTS_DATA.filter((p) => p.isFeatured);

  return (
    <section id="projects" className="w-full py-8 md:py-16 relative">
      
      {/* ---------------- SECTION HEADER ---------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FolderGit2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
              </h2>
              <span className="hidden sm:inline-block font-mono text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                {PROJECTS_DATA.length} REPOSITORIES
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Production software, open-source repositories, &amp; engineering architecture directly from Evans&apos; GitHub
            </p>
          </div>
        </div>

        {/* GitHub Workspace Direct Link */}
        <a
          href="https://github.com/evansrwothomio20-web?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-cyan-500/40 text-xs font-mono transition-all duration-200 self-start md:self-auto group"
        >
          <Github className="w-4 h-4 text-cyan-400" />
          <span>Browse All on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* ---------------- 1. FLAGSHIP FEATURED PROJECTS (MASTER ARCHITECTURAL CARDS) ---------------- */}
      <div className="mb-16 space-y-8">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Flagship Deployments &amp; Production Systems</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* FLAGSHIP 1: Mdaad Now (Large Col Span 7) */}
          <div className="lg:col-span-7 pt-8 border-t-2 border-cyan-500/80 flex flex-col justify-between group transition-all duration-300 bg-gradient-to-b from-cyan-950/20 to-transparent p-6 sm:p-8 rounded-2xl border-x border-b border-zinc-800/50 hover:border-cyan-500/40">
            <div>
              <div className="flex justify-between items-start mb-5">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  [ HUMANITARIAN TECH // OFFLINE PWA ]
                </span>

                <div className="flex items-center gap-2">
                  <a 
                    href="https://github.com/evansrwothomio20-web/Mdaad-Now" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-cyan-500/20 text-zinc-400 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/40 transition-colors"
                    title="View Source on GitHub"
                    aria-label="View Mdaad Now Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://mdaad-now.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold transition-colors flex items-center gap-1.5 text-xs shadow-lg shadow-cyan-500/20"
                    title="Open Live Deployment"
                    aria-label="Open Mdaad Now Live Deployment"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                Mdaad Now
              </h3>
              
              <p className="text-zinc-300 text-sm sm:text-base md:text-lg mb-4 leading-relaxed font-normal">
                An offline-first PWA for real-time crisis response, aid mapping, and emergency coordination in disconnected conflict zones.
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-mono border-l-2 border-cyan-500/40 pl-3">
                Features local cryptographic storage, UNICEF innovation compliance, and offline geospatial GIS maps.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/80">
              {["React / PWA", "Offline-First", "Leaflet GIS", "UNICEF Venture", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-zinc-900/90 text-cyan-300 text-xs font-mono border border-cyan-900/40">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FLAGSHIP 2: The Bridge Protocol (Col Span 5) */}
          <div className="lg:col-span-5 pt-8 border-t-2 border-blue-500/80 flex flex-col justify-between group transition-all duration-300 bg-gradient-to-b from-blue-950/20 to-transparent p-6 sm:p-8 rounded-2xl border-x border-b border-zinc-800/50 hover:border-blue-500/40">
            <div>
              <div className="flex justify-between items-start mb-5">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  [ DECENTRALIZED &amp; WEB3 ]
                </span>

                <div className="flex items-center gap-2">
                  <a 
                    href="https://github.com/evansrwothomio20-web/The-Bridge-Protocal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 border border-zinc-800 hover:border-blue-500/40 transition-colors"
                    title="View Source on GitHub"
                    aria-label="View The Bridge Protocol on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://the-bridge-protocal.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-zinc-950 font-semibold transition-colors flex items-center gap-1.5 text-xs shadow-lg shadow-blue-500/20"
                    title="Open Live Deployment"
                    aria-label="Open The Bridge Protocol Live Deployment"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white group-hover:text-blue-400 transition-colors">
                The Bridge Protocol
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base mb-4 leading-relaxed font-normal">
                Peer-to-peer decentralized micro-task settlement and community verification protocol with fast, transparent smart contract integrations.
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-mono border-l-2 border-blue-500/40 pl-3">
                Empowering peer coordination through trustless micro-settlement and decentralized reputation.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/80">
              {["JavaScript", "Web3", "Smart Contracts", "MicroPay", "Vercel"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-zinc-900/90 text-blue-300 text-xs font-mono border border-blue-900/40">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FLAGSHIP 3: Ecofarm Uganda (Col Span 6) */}
          <div className="lg:col-span-6 pt-8 border-t-2 border-emerald-500/80 flex flex-col justify-between group transition-all duration-300 bg-gradient-to-b from-emerald-950/20 to-transparent p-6 sm:p-8 rounded-2xl border-x border-b border-zinc-800/50 hover:border-emerald-500/40">
            <div>
              <div className="flex justify-between items-start mb-5">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  [ SMART AGRITECH &amp; SUPPLY CHAIN ]
                </span>

                <div className="flex items-center gap-2">
                  <a 
                    href="https://github.com/evansrwothomio20-web/Ecofarm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 border border-zinc-800 hover:border-emerald-500/40 transition-colors"
                    title="View Source on GitHub"
                    aria-label="View Ecofarm on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://ecofarmug.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-colors flex items-center gap-1.5 text-xs shadow-lg shadow-emerald-500/20"
                    title="Open Live Deployment"
                    aria-label="Open Ecofarm Live Deployment"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                Ecofarm Uganda
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base mb-4 leading-relaxed font-normal">
                Sustainable agricultural commerce platform empowering local farmers with smart harvest tracking, direct market connectivity, and real-time trade.
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-mono border-l-2 border-emerald-500/40 pl-3">
                Removes traditional middlemen, giving Ugandan farmers transparent crop pricing and digital payment channels.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/80">
              {["Full-Stack Web", "React", "Cloud Architecture", "AgriTech APIs", "Vercel"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-zinc-900/90 text-emerald-300 text-xs font-mono border border-emerald-900/40">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FLAGSHIP 4: GEMYTE Digital Agency (Col Span 6) */}
          <div className="lg:col-span-6 pt-8 border-t-2 border-amber-500/80 flex flex-col justify-between group transition-all duration-300 bg-gradient-to-b from-amber-950/20 to-transparent p-6 sm:p-8 rounded-2xl border-x border-b border-zinc-800/50 hover:border-amber-500/40">
            <div>
              <div className="flex justify-between items-start mb-5">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  [ PRODUCTION CLIENT PLATFORM ]
                </span>

                <div className="flex items-center gap-2">
                  <a 
                    href="https://github.com/evansrwothomio20-web/GEMYTE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-amber-500/20 text-zinc-400 hover:text-amber-400 border border-zinc-800 hover:border-amber-500/40 transition-colors"
                    title="View Source on GitHub"
                    aria-label="View GEMYTE on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://gemyte.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold transition-colors flex items-center gap-1.5 text-xs shadow-lg shadow-amber-500/20"
                    title="Open Live Deployment"
                    aria-label="Open GEMYTE Live Deployment"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white group-hover:text-amber-400 transition-colors">
                GEMYTE Digital Agency
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base mb-4 leading-relaxed font-normal">
                High-conversion digital agency web platform engineered for high-performance client delivery, interactive visual polish, and responsive UX.
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-mono border-l-2 border-amber-500/40 pl-3">
                Tailored with custom CSS architecture, responsive layout grids, and optimized asset delivery on Vercel.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800/80">
              {["Next.js", "Tailwind CSS", "TypeScript", "Vercel Cloud", "Modern UI/UX"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-zinc-900/90 text-amber-300 text-xs font-mono border border-amber-900/40">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- 2. ALL REPOSITORIES GRID WITH INTERACTIVE CATEGORY FILTER ---------------- */}
      <div className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>All Engineering Repositories ({PROJECTS_DATA.length})</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Works" },
              { id: "web", label: "Web & PWA" },
              { id: "web3", label: "Web3" },
              { id: "cloud", label: "Cloud & DevOps" },
              { id: "ai", label: "AI & Tools" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? "bg-white text-zinc-950 font-bold shadow-md shadow-white/10"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const getBorderAccent = (color: string) => {
              switch (color) {
                case "cyan": return "border-t-cyan-500/70 hover:border-cyan-500";
                case "amber": return "border-t-amber-500/70 hover:border-amber-500";
                case "blue": return "border-t-blue-500/70 hover:border-blue-500";
                case "emerald": return "border-t-emerald-500/70 hover:border-emerald-500";
                case "purple": return "border-t-purple-500/70 hover:border-purple-500";
                default: return "border-t-zinc-500 hover:border-white";
              }
            };

            const getTagColor = (color: string) => {
              switch (color) {
                case "cyan": return "text-cyan-400";
                case "amber": return "text-amber-400";
                case "blue": return "text-blue-400";
                case "emerald": return "text-emerald-400";
                case "purple": return "text-purple-400";
                default: return "text-zinc-400";
              }
            };

            return (
              <div
                key={project.id}
                className={`glass-card p-6 rounded-2xl flex flex-col justify-between border-t-2 ${getBorderAccent(project.accentColor)} transition-all duration-300 hover:-translate-y-1 group shadow-lg`}
              >
                <div>
                  {/* Top Bar: Category & Links */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4 text-xs font-mono">
                    <span className={`text-[11px] uppercase tracking-wider font-semibold ${getTagColor(project.accentColor)}`}>
                      {project.categoryTag}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
                        title="GitHub Repository"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-900/80 text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                          title="Live Deployment"
                          aria-label={`${project.title} live deployment`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {project.title}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tags Strip */}
                <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-zinc-900 text-zinc-400 text-[11px] font-mono border border-zinc-800/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
