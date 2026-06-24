import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Sparkles, 
  PenTool, 
  Palette, 
  Cpu, 
  GraduationCap, 
  Heart,
  Instagram,
  Linkedin,
  Compass,
  Zap,
  Eye
} from "lucide-react";

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div className="min-h-screen bg-[#faf9f5] font-sans text-[#1a1a1a] relative overflow-x-hidden selection:bg-[#F05C3B] selection:text-white">
      {/* Decorative background grid pattern overlay matching the theme */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#AE9E8E 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Grid Border lines container */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] grid-rows-1">
        <div className="border-r border-[#e5e5e2]/50 h-full" />
        <div className="h-full" />
        <div className="border-l border-[#e5e5e2]/50 h-full" />
      </div>

      {/* Header Container */}
      <header className="sticky top-0 z-50 bg-[#faf9f5]/85 backdrop-blur-md border-b border-[#e5e5e2] h-[55px] lg:h-[85px] grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] items-center">
        {/* Left: Back Button */}
        <button
          onClick={onBack}
          className="h-full border-r border-[#e5e5e2] flex items-center justify-center hover:bg-[#F05C3B]/5 text-[#1a1a1a] hover:text-[#F05C3B] transition-all duration-300 group cursor-pointer"
          aria-label="Go back to home page"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
        </button>

        {/* Center: Title / Context info */}
        <div className="px-6 flex justify-between items-center">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#737370] uppercase font-bold">
            ABOUT THE ARTIST // CREATOR PROFILE
          </span>
          <button 
            onClick={onBack}
            className="text-[10px] md:text-xs font-mono tracking-widest font-bold border border-[#1a1a1a]/10 hover:border-[#F05C3B] hover:text-[#F05C3B] px-4 py-1.5 rounded-full transition-all duration-300 bg-transparent cursor-pointer hidden sm:block"
          >
            [ BACK TO HOME ]
          </button>
        </div>

        {/* Right border spacer */}
        <div className="h-full border-l border-[#e5e5e2]" />
      </header>

      {/* Content wrapper */}
      <main className="grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] min-h-[calc(100vh-85px)]">
        {/* Left spacer column */}
        <div className="col-start-1 col-end-2 border-r border-[#e5e5e2]/30" />

        {/* Center content column - full width */}
        <div className="col-start-2 col-end-3 px-6 md:px-12 lg:px-20 py-16 md:py-24 w-full text-left">
          {/* Hero Row: Intro Title and Large Artistic Portrait Webm/Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-[#e5e5e2]">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[#F05C3B] uppercase font-bold block mb-4">
                01 // PERSONAL SYNOPSIS
              </span>
              <h1 className="font-sans text-3xl md:text-5xl lg:text-5xl font-light tracking-tight text-[#1a1a1a] leading-[1.1] mb-6">
                RIZKI RIZAL WICAKSONO <br />
                <span className="text-[#F05C3B]">kupicake</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#10b981]/10 rounded-full text-[#10b981] font-mono text-[9px] tracking-wider uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  Available for Remote Projects
                </div>
                <div className="flex items-center gap-1.5 text-[#737370] font-mono text-[9px]">
                  <MapPin className="w-3.5 h-3.5 text-[#F05C3B]" />
                  YOGYAKARTA, ID
                </div>
              </div>

              <p className="font-sans text-lg md:text-xl lg:text-2xl text-[#1a1a1a] font-light leading-relaxed mb-6">
                I am a passionate <strong>Illustrator, Animator, and Concept Artist</strong> based in Yogyakarta, Indonesia. 
                My creative engine operates at the intersection of emotional narrative storytelling and visual dynamics, 
                blending rich, expressive character design with fluid animation.
              </p>

              <p className="font-sans text-sm md:text-base lg:text-lg text-[#7a7975] leading-relaxed mb-6 pl-12 md:pl-16 lg:pl-20 border-l-2 border-[#e5e5e2]">
                As a Nuclear Engineering graduate turned visual artist, I combine an analytical problem-solving mindset with a limitless imagination. This unique background allows me to bring complex concepts to life through structural layout planning, dynamic motion graphics, and evocative 2D animation.
              </p>
            </div>

            {/* Increased Size column for portrait image */}
            <div className="lg:col-span-7 w-full" ref={imageContainerRef}>
              <div className="relative group overflow-hidden border border-[#e5e5e2] bg-[#fbfbfa] p-4">
                {/* 4 technical border corners */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#F05C3B] z-10" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#F05C3B] z-10" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#F05C3B] z-10" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#F05C3B] z-10" />

                <div className="relative aspect-[4/5] bg-[#E5E2DC] overflow-hidden">
                  <motion.img
                    src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/portrait.webp"
                    alt="Creative Portrait of Kupi Cake Artist"
                    style={{ y }}
                    className="absolute inset-x-0 w-full h-[130%] -top-[15%] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/20 to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-3 right-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-mono text-[9px] tracking-widest text-white/90 bg-[#161616]/75 px-2.5 py-1.5 backdrop-blur-[4px] uppercase border border-white/10">
                      real photo by Ayu Sophia
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Core Philosophy & Capabilities - Clean Grid Style */}
          <div className="py-16 border-b border-[#e5e5e2]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
              {/* Left Column: Statement & Subtitle */}
              <div className="lg:col-span-4 flex flex-col justify-start">
                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[#F05C3B] uppercase font-bold block mb-4">
                  02 // MY PRINCIPLE
                </span>
                <h2 className="font-sans text-3xl md:text-5xl lg:text-5xl font-light tracking-tight text-[#1a1a1a] leading-[1.1] mb-6">
                  Design with <span className="text-[#F05C3B]">intent</span>, <br className="hidden md:block" /> animate with <span className="text-[#F05C3B]">soul</span>.
                </h2>
                <p className="font-sans text-lg md:text-xl lg:text-2xl text-[#1a1a1a] font-light leading-relaxed">
                  I believe that every art should serve a purpose and evoke a feeling. My goal is always to blend technical versatility with deep narrative consistency, ensuring that the final output isn't just visually striking, but unforgettable.
                </p>
              </div>

              {/* Center Spacer Column adding white space */}
              <div className="hidden lg:block lg:col-span-2" />

              {/* Right Column: 3 Principles Grid - Compressed */}
              <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                {/* Principle 1: Explore and observe */}
                <div className="border-t border-[#e5e5e2] pt-8 flex flex-col justify-between group min-h-[420px] md:min-h-[480px]">
                  <div>
                    <div className="flex justify-end items-center mb-6">
                      <Compass className="w-5 h-5 text-[#F05C3B] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-sans text-xl md:text-2xl font-medium text-[#1a1a1a] tracking-tight mb-4 leading-snug">
                      Explore and <br /> observe
                    </h3>
                    <p className="font-sans text-sm md:text-base text-[#1a1a1a] font-light leading-relaxed">
                      My ideas stand out with uniqueness from my love for exploration, while my observant nature ensures attention to detail and precision.
                    </p>
                  </div>
                  <div className="pt-16 mt-auto">
                    <span className="font-mono text-xs md:text-sm text-[#8a8a85] font-bold block">01</span>
                  </div>
                </div>

                {/* Principle 2: Innovation enthusiast */}
                <div className="border-t border-[#e5e5e2] pt-8 flex flex-col justify-between group min-h-[420px] md:min-h-[480px]">
                  <div>
                    <div className="flex justify-end items-center mb-6">
                      <Sparkles className="w-5 h-5 text-[#F05C3B] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-sans text-xl md:text-2xl font-medium text-[#1a1a1a] tracking-tight mb-4 leading-snug">
                      Innovation <br /> enthusiast
                    </h3>
                    <p className="font-sans text-sm md:text-base text-[#1a1a1a] font-light leading-relaxed">
                      I love experimenting with new concepts every time, whether it’s a simple or complex design, you can count on me
                    </p>
                  </div>
                  <div className="pt-16 mt-auto">
                    <span className="font-mono text-xs md:text-sm text-[#8a8a85] font-bold block">02</span>
                  </div>
                </div>

                {/* Principle 3: Fast learner */}
                <div className="border-t border-[#e5e5e2] pt-8 flex flex-col justify-between group min-h-[420px] md:min-h-[480px]">
                  <div>
                    <div className="flex justify-end items-center mb-6">
                      <Zap className="w-5 h-5 text-[#F05C3B] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-sans text-xl md:text-2xl font-medium text-[#1a1a1a] tracking-tight mb-4 leading-snug">
                      Fast <br /> learner
                    </h3>
                    <p className="font-sans text-sm md:text-base text-[#1a1a1a] font-light leading-relaxed">
                      I can adapt to various environments and tools, AI? Bring it on!
                    </p>
                  </div>
                  <div className="pt-16 mt-auto">
                    <span className="font-mono text-xs md:text-sm text-[#8a8a85] font-bold block">03</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Tools & Technical Apparatus */}
          <div className="py-16 border-b border-[#e5e5e2]">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[#F05C3B] uppercase font-bold block mb-4">
              03 // DIGITAL TOOL APPARATUS
            </span>
            <h2 className="font-sans text-lg md:text-xl font-normal text-[#1a1a1a] tracking-tight mb-8">
              Softwares & Technologies I Employ
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { category: "Creative Artistry", tools: ["Clip Studio Paint", "Procreate", "Adobe Photoshop"] },
                { category: "Motion & Video", tools: ["After Effects", "Premiere Pro", "CapCut / Canvas"] },
                { category: "Design & UX", tools: ["Figma", "Typography Pairing", "Wireframing"] },
                { category: "Visual Systems", tools: ["Composition & Layout", "Color Theory", "Storyboarding"] }
              ].map((group) => (
                <div key={group.category} className="border-t border-[#e5e5e2] pt-4">
                  <h3 className="font-mono text-[9px] tracking-wider text-[#737370] uppercase font-bold mb-3">
                    {group.category}
                  </h3>
                  <ul className="space-y-1.5 font-sans text-[11px] text-[#1a1a1a]">
                    {group.tools.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#F05C3B]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Call to action / Footer elements of About page */}
          <div className="pt-16 text-left w-full flex flex-col items-start">
            <Heart className="w-6 h-6 text-[#F05C3B] animate-pulse mb-6" />
            <h3 className="font-sans text-lg md:text-xl font-normal tracking-tight mb-4 text-left">
              Let's create something meaningful together.
            </h3>
            <p className="font-sans text-xs text-[#5a5957] leading-relaxed mb-8 text-left">
              Whether you want to commission a story, request custom illustrations, develop custom concept designs, or collaborate on animation sequences — let's forge a connection!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-end w-full sm:w-auto sm:self-end sm:ml-auto">
              <a
                href="mailto:kupicake@gmail.com"
                className="font-mono text-[10px] uppercase tracking-widest font-bold bg-[#1a1a1a] text-white hover:bg-[#F05C3B] px-8 py-3.5 rounded-full transition-all duration-300 text-center"
              >
                Direct Inquiry
              </a>
              <button
                onClick={onBack}
                className="font-mono text-[10px] uppercase tracking-widest font-bold border border-[#1a1a1a]/15 hover:border-[#1a1a1a] hover:bg-black/5 px-8 py-3.5 rounded-full transition-all duration-300 bg-transparent cursor-pointer text-center"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Right spacer column */}
        <div className="col-start-3 col-end-4 border-l border-[#e5e5e2]/30" />
      </main>

      {/* Grid footer decoration */}
      <footer className="h-[55px] lg:h-[85px] border-t border-[#e5e5e2] grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] items-center text-center">
        <div className="border-r border-[#e5e5e2] h-full" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-[#737370] uppercase">
          © 2026 KUPI CAKE // DESIGN & ILLUSTRATION PORTER
        </span>
        <div className="border-l border-[#e5e5e2] h-full" />
      </footer>
    </div>
  );
}
