import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight,
  Sparkles, 
  HelpCircle,
  Coffee, 
  Flame, 
  Award, 
  Clipboard, 
  Layers, 
  FileText, 
  User, 
  Briefcase, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  Play, 
  ChevronRight,
  Volume2,
  VolumeX,
  Github
} from "lucide-react";

interface Project {
  num: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  role: string;
  roleDesc: string;
  client: string;
  clientDesc: string;
  palette: string[];
  paletteNames: string[];
  image: string;
  imageLabel: string;
  tools: string[];
  foregroundImage?: string;
}


const CreativePlayPauseIcon = ({ isPaused }: { isPaused: boolean }) => {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center border border-[#FAF9F5]/20 bg-[#070707]/90 transition-all duration-300">
      {/* 4 sharp technical grid corners */}
      <span className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t border-l border-[#F05C3B]" />
      <span className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t border-r border-[#F05C3B]" />
      <span className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b border-l border-[#F05C3B]" />
      <span className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b border-r border-[#F05C3B]" />
      
      {isPaused ? (
        /* Minimalist Modern Play symbol matching the grid perfectly: clean triangle */
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current ml-0.5">
          <polygon points="6,4 20,12 6,20" />
        </svg>
      ) : (
        /* Minimalist Modern Pause symbol: double square grid-lines */
        <div className="flex gap-1 items-center justify-center">
          <span className="w-1.5 h-4 bg-white" />
          <span className="w-1.5 h-4 bg-white" />
        </div>
      )}
    </div>
  );
};

const creativeSteps = [
  {
    num: "01",
    title: "Illustration Concept",
    desc: "The brainstorming phase where I define the composition, mood, and core narrative. It’s all about deciding what emotions and stories need to be conveyed through the artwork.",
    asset: "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%200.webp",
    type: "image",
    layerCount: "1 Layer (Rough Notes)",
    format: "WEBP IMAGE",
    engine: "Brainstorming / Procreate",
    phase: "CONCEPT"
  },
  {
    num: "02",
    title: "Sketching",
    desc: "Translating the initial concept into a detailed blueprint. This stage establishes the key elements and serves as a foundational guide for the line art.",
    asset: "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%201.webp",
    type: "image",
    layerCount: "4 Layers (Blue Sketch)",
    format: "WEBP IMAGE",
    engine: "Procreate Guide Lines",
    phase: "STRUCTURE"
  },
  {
    num: "03",
    title: "Line Art",
    desc: "A meticulous and vital step. It involves refining the rough sketches into clean, crisp lines to establish structure and clarity.",
    asset: "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%202.webp",
    type: "image",
    layerCount: "12 Layers (Vector Inks)",
    format: "WEBP IMAGE",
    engine: "Refining Lines / Procreate",
    phase: "VECTOR CLARITY"
  },
  {
    num: "04",
    title: "Base Coloring",
    desc: "The most challenging phase where doubt often creeps in. Choosing the right palette is crucial, as color itself carries the weight of the story in an illustration.",
    asset: "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%203.webp",
    type: "image",
    layerCount: "34 Layers (Separators)",
    format: "WEBP IMAGE",
    engine: "Palette Injector Engine",
    phase: "CHROME & BASE"
  },
  {
    num: "05",
    title: "Shading & Finishing",
    desc: "My absolute favorite stage. Adding light and shadow feels like breathing life into a canvas, making the entire piece come alive.",
    asset: "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%204.webp",
    type: "image",
    layerCount: "58 Layers (Multiplier, FX)",
    format: "WEBP IMAGE",
    engine: "Stylized Lighting / Shaders",
    phase: "VOLUME & DEPTH"
  },
  {
    num: "06",
    title: "Animating",
    desc: "A demanding yet exhilarating process. This is where I get to fully explore and bring movement to the world I’ve created.",
    asset: "https://github.com/kupicake/database/raw/HERO-SECTION/main%20illus_hero%20section.webm",
    type: "video",
    layerCount: "92 Layers (Rigs & Keyframes)",
    format: "WEBM VIDEO",
    engine: "Puppetry / After Effects",
    phase: "LIVING WORLD"
  }
];

const Sample2Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [localScrollY, setLocalScrollY] = useState(0);
  const [scrolledEnd, setScrolledEnd] = useState(false);
  const [viewedPhases, setViewedPhases] = useState<number[]>([0]);
  const [viewMode, setViewMode] = useState<"concept" | "colored">("concept");

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const pipelineHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const pipelineTextRef = React.useRef<HTMLParagraphElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const isDown = React.useRef(false);
  const startY = React.useRef(0);
  const scrollTop = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown.current = true;
    const container = scrollContainerRef.current;
    if (container) {
      startY.current = e.pageY - container.offsetTop;
      scrollTop.current = container.scrollTop;
    }
  };

  const handleMouseLeaveOrUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    const container = scrollContainerRef.current;
    if (container) {
      e.preventDefault();
      const y = e.pageY - container.offsetTop;
      const walk = (y - startY.current) * 3.5; // highly responsive drag multiplier
      container.scrollTop = scrollTop.current - walk;
    }
  };

  useEffect(() => {
    if (!viewedPhases.includes(activeStep)) {
      setViewedPhases(prev => [...prev, activeStep]);
    }
  }, [activeStep]);

  const handleContainerScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerScrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Detect if we scrolled to the absolute bottom (safety guard)
    if (containerScrollTop + clientHeight >= scrollHeight - 35) {
      const lastIdx = sample2Images.length - 1;
      setActiveImageIdx(lastIdx);
      setActiveStep(sample2Images[lastIdx].stepIdx);
      setScrolledEnd(true);
      if (!viewedPhases.includes(sample2Images[lastIdx].stepIdx)) {
        setViewedPhases(prev => [...prev, sample2Images[lastIdx].stepIdx]);
      }
      return;
    } else {
      setScrolledEnd(false);
    }
    // Detect if we are at the top (safety guard)
    if (containerScrollTop <= 15) {
      setActiveImageIdx(0);
      setActiveStep(sample2Images[0].stepIdx);
      return;
    }

    let closestIdx = 0;
    let minDistance = Infinity;

    sample2Images.forEach((_, idx) => {
      const el = document.getElementById(`sample2-image-${idx}`);
      if (el) {
        const offsetTop = el.offsetTop;
        const height = el.clientHeight;
        
        // Highly responsive 30% viewport line trigger, so changing phases is immediate and smooth
        const triggerLine = containerScrollTop + clientHeight * 0.3;
        
        if (triggerLine >= offsetTop && triggerLine <= offsetTop + height) {
          closestIdx = idx;
          minDistance = 0;
        } else {
          const distToTop = Math.abs(offsetTop - triggerLine);
          const distToBottom = Math.abs((offsetTop + height) - triggerLine);
          const distance = Math.min(distToTop, distToBottom);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      }
    });

    setActiveImageIdx(closestIdx);
    setActiveStep(sample2Images[closestIdx].stepIdx);
  };

  // Bind non-passive wheel and touch events strictly to the image container
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        touchStartY = currentY;

        const isAtTop = container.scrollTop <= 2;
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 4;

        if ((deltaY < 0 && isAtTop) || (deltaY > 0 && isAtBottom)) {
          // Allow normal container scrolling to propagate to the page
          return;
        }

        // Scroll internally and block parent scrolling
        e.preventDefault();
        e.stopPropagation();
        container.scrollTop += deltaY * 4.0; // Extremely responsive touch multiplier
      }
    };

    const handleNativeWheel = (e: WheelEvent) => {
      const isAtTop = container.scrollTop <= 2;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 4;

      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        // Allow outer page movement to proceed normally instead of trapping the scroll inside the container
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      container.scrollTop += e.deltaY * 3.5; // Beautiful, extremely fast and fluid wheel multiplier
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("wheel", handleNativeWheel, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleNativeWheel);
    };
  }, [scrollContainerRef.current]);

  // Handle normal scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      setLocalScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    const t = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    const firstImageIdx = sample2Images.findIndex(img => img.stepIdx === idx);
    const container = scrollContainerRef.current;
    if (container) {
      const el = document.getElementById(`sample2-image-${firstImageIdx}`);
      if (el) {
        const containerTop = container.getBoundingClientRect().top;
        const elTop = el.getBoundingClientRect().top;
        const relativeTop = elTop - containerTop + container.scrollTop;
        container.scrollTo({
          top: relativeTop,
          behavior: "smooth"
        });
      }
    }
  };

  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  let pipelineHeadingProgress = 0;
  let pipelineTextProgress = 0;

  if (pipelineHeadingRef.current && windowHeight > 0) {
    const rect = pipelineHeadingRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.95;
    const endY = windowHeight * 0.45;
    pipelineHeadingProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  if (pipelineTextRef.current && windowHeight > 0) {
    const rect = pipelineTextRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.85;
    const endY = windowHeight * 0.35;
    pipelineTextProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  const currentPipelineWords = activeStep > 0 ? pipelineWordsStoryboard : pipelineWordsSample2;

  return (
    <div className="w-full bg-[#FAF9F5] border-t border-[#E5E2DC]" ref={sectionRef}>
      <div 
        className="bg-[#FAF9F5] border-b border-[#E5E2DC] py-24 md:py-32 px-6 md:px-10 flex flex-col justify-center items-start w-full"
      >
        <div ref={pipelineHeadingRef} className="w-full flex justify-between items-baseline mb-8 md:mb-12">
          <h2 className="font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase text-[#161616]">
            <span
              style={{
                backgroundImage: `linear-gradient(to right, #333333 ${Math.min(100, pipelineHeadingProgress * 100)}%, #b5b5b0 ${Math.min(100, pipelineHeadingProgress * 100)}%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {activeStep > 0 ? "STORYBOARD" : "VISUAL PIPELINE"}
            </span>
          </h2>
          <span className="font-mono text-[9px] text-[#F05C3B]/60 tracking-wider font-light uppercase hidden md:inline">
            {activeStep > 0 ? "05 // STORYBOARD SECTIONS SEQUENCE" : "05 // STORY PRODUCTION & DESIGN COMPOSITION"}
          </span>
        </div>
        <p 
          ref={pipelineTextRef}
          className="text-xl md:text-3xl lg:text-[38px] xl:text-[40px] font-normal leading-[1.1] md:leading-[1.15] tracking-tight text-[#161616]/40 select-text w-full"
        >
          {currentPipelineWords.map((word, i) => {
            const fillPercentage = Math.max(
              0,
              Math.min(100, (pipelineTextProgress * currentPipelineWords.length - i) * 100),
            );
            const targetColor = word.h ? "#F05C3B" : "#333333";
            return (
              <span key={`${activeStep}-${i}-${word.w}`}>
                <span
                  style={{
                    backgroundImage: `linear-gradient(to right, ${targetColor} ${fillPercentage}%, #b5b5b0 ${fillPercentage}%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {word.w}
                </span>
                {i < currentPipelineWords.length - 1 && " "}
              </span>
            );
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative w-full bg-[#FAF9F5] border-b border-[#E5E2DC]">
        {/* Left Column: Media Presentation, now internally scrollable with static overlay HUD and full-screen alignment */}
        <div 
          className="w-full h-screen lg:h-screen lg:sticky lg:top-0 z-10 border-b lg:border-b-0 lg:border-r border-[#E5E2DC] relative bg-neutral-950 group overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none border-4 border-[#161616]/10 z-20" />
          
          {/* Subtle status feed label in top left - elevated for maximum visual clarity & professional contrast */}
          <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1.5 matches-layer animate-fade-in select-none">
            <span className="font-mono text-[7.5px] text-white tracking-[0.25em] uppercase bg-black px-2.5 py-1.5 rounded-sm border border-white/20 shadow-lg backdrop-blur-md">
              MAPPED VIEW // {viewMode === "concept" ? "1. CONCEPT DRAFT" : "2. COLOURED ART"}
            </span>
            <span className={`font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm shadow-2xl font-black transition-all duration-500 ${
              viewMode === "concept" 
                ? "bg-amber-400 text-black border border-amber-300" 
                : "bg-emerald-400 text-black border border-emerald-300"
            }`}>
              {viewMode === "concept" ? "✦ CONCEPT BY KUPICAKE" : "✦ COLOR & FINISHING BY 090UCU"}
            </span>
          </div>

          {/* Elegant low-profile Render Switcher */}
          <div className="absolute top-4 right-4 z-30 flex items-center bg-black/90 p-1 border border-white/25 rounded-full shadow-2xl">
            <button
              onClick={() => setViewMode("concept")}
              className={`px-3 py-1.5 text-[8.5px] font-mono uppercase tracking-wider rounded-full transition-all duration-300 ${
                viewMode === "concept"
                  ? "bg-[#F05C3B] text-white font-extrabold shadow-md scale-105"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Concept
            </button>
            <button
              onClick={() => setViewMode("colored")}
              className={`px-3 py-1.5 text-[8.5px] font-mono uppercase tracking-wider rounded-full transition-all duration-300 ${
                viewMode === "colored"
                  ? "bg-[#F05C3B] text-white font-extrabold shadow-md scale-105"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Colored
            </button>
          </div>

          <div className="absolute top-1/2 left-3 w-4 h-[1px] bg-[#F05C3B]/40 pointer-events-none z-20" />
          <div className="absolute top-1/2 right-3 w-4 h-[1px] bg-[#F05C3B]/40 pointer-events-none z-20" />
          <div className="absolute left-1/2 top-3 w-[1px] h-4 bg-[#F05C3B]/40 pointer-events-none z-20" />
          <div className="absolute left-1/2 bottom-3 w-[1px] h-4 bg-[#F05C3B]/40 pointer-events-none z-20" />

          {/* Scrollable list of images (supports both native scroll/touch and drag-to-scroll) */}
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onScroll={handleContainerScroll}
            className="w-full h-full relative overflow-y-auto scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(240,92,59,0.3)_rgba(0,0,0,0.1)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-neutral-900/50 [&::-webkit-scrollbar-thumb]:bg-[#F05C3B]/30 hover:[&::-webkit-scrollbar-thumb]:bg-[#F05C3B]/50 [&::-webkit-scrollbar-thumb]:rounded-full cursor-grab active:cursor-grabbing select-none"
          >
            {sample2Images.map((step, idx) => {
              return (
                <div
                  key={idx}
                  id={`sample2-image-${idx}`}
                  className="w-full relative flex flex-col items-center justify-start bg-neutral-950 select-none border-b border-neutral-900/40 last:border-b-0"
                >
                  <div className="w-full relative overflow-hidden flex flex-col items-center justify-start">
                    {/* Concept Draft Image (Always rendered to preserve correct height/layout flow) */}
                    <img
                      src={step.url}
                      alt={`${step.title} Draft`}
                      className="w-full h-auto object-contain select-none pointer-events-none transition-opacity duration-700 ease-in-out"
                      style={{ opacity: viewMode === "concept" ? 1 : 0 }}
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                    
                    {/* Colored Artwork Custom Overlay */}
                    <img
                      src={step.coloredUrl}
                      alt={`${step.title} Colored`}
                      className="absolute top-0 left-0 w-full h-auto object-contain select-none pointer-events-none transition-opacity duration-700 ease-in-out"
                      style={{ opacity: viewMode === "colored" ? 1 : 0 }}
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                  </div>
                  {/* Subtle contextual hint between panels */}
                  {idx < sample2Images.length - 1 && (
                    <div className="w-full h-16 bg-neutral-950 flex items-center justify-center border-y border-neutral-900">
                      <span className="font-mono text-[7px] text-[#AE9E8E]/40 tracking-[0.4em] uppercase">
                        SCROLL FOR {sample2Images[idx+1].phase}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Elegant visual indicator added when scanned to the absolute bottom */}
            <div className={`w-full py-16 px-8 transition-all duration-700 bg-neutral-950 flex flex-col items-center justify-center border-t border-neutral-900/50 ${
              scrolledEnd ? "opacity-100 scale-100 bg-emerald-950/5" : "opacity-45 scale-95"
            }`}>
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-700 select-none ${
                scrolledEnd ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-[#F05C3B]/20 text-[#F05C3B]/30"
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-5 h-5 transition-transform duration-500 ${scrolledEnd ? "scale-110 rotate-0" : "scale-90 rotate-45"}`}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4 className={`font-mono text-[8px] tracking-[0.3em] uppercase font-bold mt-4 transition-colors duration-500 select-none ${
                scrolledEnd ? "text-emerald-400 font-extrabold" : "text-[#AE9E8E]/50"
              }`}>
                {scrolledEnd ? "PROCESS ALIGNED // VISUAL MATRIX READ ✓" : "SCROLL TO THE END TO FULLY COMPLETE"}
              </h4>
              <p className="text-[7px] font-mono text-[#AE9E8E]/25 tracking-widest uppercase mt-1 select-none">
                CURATED DOCUMENTATION LOG COMPLIED
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Column: Descriptions */}
        <div className="flex flex-col w-full bg-transparent lg:sticky lg:top-0 lg:h-screen lg:justify-center border-t lg:border-t-0 border-[#E5E2DC] overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-10 lg:py-0">
          {sample2Steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = viewedPhases.includes(idx);
            return (
              <div
                key={idx}
                id={`sample2-step-${idx}`}
                onClick={() => handleStepClick(idx)}
                className={`group/step p-6 md:p-10 lg:p-14 border-b border-[#E5E2DC] last:border-b-0 cursor-pointer flex gap-6 md:gap-8 transition-all duration-500 items-start ${
                  isActive ? "bg-white/70 opacity-100" : "bg-transparent opacity-40 hover:opacity-75"
                }`}
              >
                <div className="flex flex-col items-center pt-1 shrink-0 select-none w-6">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 text-[10px] font-bold shrink-0 animate-pulse">
                      ✓
                    </div>
                  ) : (
                    <span
                      className={`font-mono text-xs md:text-sm font-bold transition-colors duration-400 w-5 text-center ${
                        isActive ? "text-[#F05C3B]" : "text-[#AE9E8E]"
                      }`}
                    >
                      {step.num}
                    </span>
                  )}
                  <div
                    className={`w-[1px] bg-gradient-to-b transition-all duration-500 mt-2 ${
                      isActive ? (isCompleted ? "from-emerald-500 to-transparent h-16" : "from-[#F05C3B] to-transparent h-16") : "from-transparent to-transparent h-8"
                    }`}
                  />
                </div>

                <div className="flex-grow">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#AE9E8E] mb-2 font-medium flex items-center gap-2">
                    <span>PHASE 0{idx + 1} // {step.phase}</span>
                    {isCompleted && (
                      <span className="text-[7px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1 py-0.5 rounded-sm tracking-normal font-sans font-medium uppercase shrink-0">
                        Completed
                      </span>
                    )}
                  </span>
                  <h4
                    className={`font-sans text-[#161616] text-base md:text-lg font-light leading-snug transition-all duration-400 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text mt-3.5 transition-all duration-400 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CreativeProcess = ({ projectIndex }: { projectIndex?: number }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [localScrollY, setLocalScrollY] = useState(0);

  const pipelineHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const pipelineTextRef = React.useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setLocalScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    // Safety delay trigger
    const t = setTimeout(handleScroll, 100);

    const observers: IntersectionObserver[] = [];
    
    creativeSteps.forEach((_, idx) => {
      const el = document.getElementById(`creative-step-${idx}`);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveStep(idx);
            }
          },
          {
            rootMargin: "-25% 0px -40% 0px",
            threshold: 0.1,
          }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(o => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    const el = document.getElementById(`creative-step-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  let pipelineHeadingProgress = 0;
  let pipelineTextProgress = 0;

  if (pipelineHeadingRef.current && windowHeight > 0) {
    const rect = pipelineHeadingRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.95;
    const endY = windowHeight * 0.45;
    pipelineHeadingProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  if (pipelineTextRef.current && windowHeight > 0) {
    const rect = pipelineTextRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.85;
    const endY = windowHeight * 0.35;
    pipelineTextProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  return (
    <div className="w-full bg-[#FAF9F5] border-t border-[#E5E2DC]">
      {/* THE CREATIVE PROCESS - STYLED EXACTLY LIKE CONCEPT */}
      <div 
        className="bg-[#FAF9F5] border-b border-[#E5E2DC] py-24 md:py-32 px-6 md:px-10 flex flex-col justify-center items-start w-full"
      >
        <div ref={pipelineHeadingRef} className="w-full flex justify-between items-baseline mb-8 md:mb-12">
          <h2 className="font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase">
            <span
              style={{
                backgroundImage: `linear-gradient(to right, #333333 ${Math.min(100, pipelineHeadingProgress * 100)}%, #b5b5b0 ${Math.min(100, pipelineHeadingProgress * 100)}%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {projectIndex === 0 ? "THE PROCESS" : "THE CREATIVE PROCESS"}
            </span>
          </h2>
          <span className="font-mono text-[9px] text-[#F05C3B]/60 tracking-wider font-light uppercase hidden md:inline">
            05 // THE PRODUCTION PIPELINE
          </span>
        </div>
        <p 
          ref={pipelineTextRef}
          className="text-xl md:text-3xl lg:text-[38px] xl:text-[40px] font-normal leading-[1.1] md:leading-[1.15] tracking-tight text-[#161616]/40 select-text w-full"
        >
          {pipelineWords.map((word, i) => {
            const fillPercentage = Math.max(
              0,
              Math.min(100, (pipelineTextProgress * pipelineWords.length - i) * 100),
            );
            const targetColor = word.h ? "#F05C3B" : "#333333";
            return (
              <span key={`${activeStep}-${i}-${word.w}`}>
                <span
                  style={{
                    backgroundImage: `linear-gradient(to right, ${targetColor} ${fillPercentage}%, #b5b5b0 ${fillPercentage}%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {word.w}
                </span>
                {i < pipelineWords.length - 1 && " "}
              </span>
            );
          })}
        </p>
      </div>

      {/* Sticky Split Columns Side-by-Side with Border line separator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative w-full bg-[#FAF9F5] border-b border-[#E5E2DC]">
        {/* Left Sticky Column: Media Presentation */}
        <div className="w-full h-[50vh] lg:h-[calc(100vh-120px)] lg:sticky lg:top-[90px] z-10 border-b lg:border-b-0 lg:border-r border-[#E5E2DC] overflow-hidden relative group select-none bg-neutral-950">
          
          {/* Retro Viewport Grid & Outlines */}
          <div className="absolute inset-0 pointer-events-none border-4 border-[#161616]/10 z-20" />
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 font-mono text-[8px] text-white/55">
            {/* Top Bar Info */}
            <div className="flex justify-between items-center bg-black/40 backdrop-blur-xs px-2 py-1 border border-white/5 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap max-w-[70%]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F05C3B] animate-pulse shrink-0" />
                {creativeSteps[activeStep].type === "video" 
                  ? <span className="text-white font-bold select-text">{creativeSteps[activeStep].title.toUpperCase()}</span>
                  : "LIVE MODEL FEED"
                }
              </span>
              <span>STEP {creativeSteps[activeStep].num} // {creativeSteps[activeStep].phase}</span>
            </div>
            
            {/* Bottom Bar Info */}
            <div className="flex justify-between items-end bg-black/40 backdrop-blur-xs p-2.5 border border-white/5 uppercase tracking-wider w-full gap-2">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[#F05C3B] font-bold text-[9px]">
                  {creativeSteps[activeStep].type === "video" 
                    ? "LIVE MODEL FEED" 
                    : creativeSteps[activeStep].title
                  }
                </span>
                <span className="text-white/45 text-[7px]" style={{ fontSize: "7px" }}>FORMAT: {creativeSteps[activeStep].format}</span>
              </div>
              <div className="text-right flex flex-col gap-1 items-end">
                <span className="text-white/70 font-semibold">{creativeSteps[activeStep].layerCount}</span>
                <span className="text-white/35 text-[7px]" style={{ fontSize: "7px" }}>{creativeSteps[activeStep].engine}</span>
              </div>
            </div>
          </div>

          {/* Crosshair accents */}
          <div className="absolute top-1/2 left-3 w-4 h-[1px] bg-[#F05C3B]/40 pointer-events-none z-20" />
          <div className="absolute top-1/2 right-3 w-4 h-[1px] bg-[#F05C3B]/40 pointer-events-none z-20" />
          <div className="absolute left-1/2 top-3 w-[1px] h-4 bg-[#F05C3B]/40 pointer-events-none z-20" />
          <div className="absolute left-1/2 bottom-3 w-[1px] h-4 bg-[#F05C3B]/40 pointer-events-none z-20" />

          {/* Assets rendering stacked layers with opacity transition */}
          {creativeSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 10 : 0,
                }}
              >
                {step.type === "image" ? (
                  <img
                    src={step.asset}
                    alt={step.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{ objectPosition: "75% center" }}
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                ) : (
                  <video
                    src={step.asset}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{ objectPosition: "75% center" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Scrolling Column: Descriptions */}
        <div className="flex flex-col w-full bg-transparent">
          {creativeSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                id={`creative-step-${idx}`}
                onPointerOver={() => {
                  if (activeStep !== idx) setActiveStep(idx);
                }}
                onPointerMove={() => {
                  if (activeStep !== idx) setActiveStep(idx);
                }}
                onPointerDown={() => {
                  if (activeStep !== idx) setActiveStep(idx);
                }}
                onTouchStart={() => {
                  if (activeStep !== idx) setActiveStep(idx);
                }}
                onClick={() => handleStepClick(idx)}
                className={`group/step p-6 md:p-10 lg:p-14 border-b border-[#E5E2DC] last:border-b-0 cursor-pointer flex gap-6 md:gap-8 transition-all duration-500 items-start ${
                  isActive ? "bg-white/70 opacity-100" : "bg-transparent opacity-40 hover:opacity-75"
                }`}
              >
                {/* Step index circle/indicator */}
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <span
                    className={`font-mono text-xs md:text-sm font-bold transition-colors duration-400 ${
                      isActive ? "text-[#F05C3B]" : "text-[#AE9E8E]"
                    }`}
                  >
                    {step.num}
                  </span>
                  {/* Visual linkage track */}
                  <div
                    className={`w-[1px] bg-gradient-to-b transition-all duration-500 mt-2 ${
                      isActive ? "from-[#F05C3B] to-transparent h-16" : "from-transparent to-transparent h-8"
                    }`}
                  />
                </div>

                {/* Text Blocks - matched to Case Synopsis font sizes */}
                <div className="flex-grow">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#AE9E8E] block mb-2 font-medium">
                    PHASE 0{idx + 1} // {step.phase}
                  </span>
                  <h4
                    className={`font-sans text-[#161616] text-base md:text-lg font-light leading-snug transition-all duration-400 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text mt-3.5 transition-all duration-400 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const conceptWordsProcrastination = [
  { w: "The", h: false },
  { w: "main", h: false },
  { w: "illustration", h: false },
  { w: "features", h: false },
  { w: "a", h: false },
  { w: "tired", h: true },
  { w: "young", h: true },
  { w: "man", h: true },
  { w: "escaping", h: false },
  { w: "into", h: false },
  { w: "his", h: false },
  { w: "imagination—doing", h: false },
  { w: "anything", h: false },
  { w: "but", h: false },
  { w: "working.", h: false },
  { w: "This", h: false },
  { w: "reflects", h: false },
  { w: "my", h: false },
  { w: "own", h: false },
  { w: "creative", h: false },
  { w: "process:", h: false },
  { w: "a", h: false },
  { w: "journey", h: false },
  { w: "of", h: false },
  { w: "overthinking", h: true },
  { w: "and", h: false },
  { w: "self-doubt,", h: false },
  { w: "which", h: false },
  { w: "ultimately", h: false },
  { w: "leads", h: false },
  { w: "to", h: false },
  { w: "rediscovery.", h: false },
  { w: "When", h: false },
  { w: "I", h: false },
  { w: "finally", h: false },
  { w: "create,", h: false },
  { w: "I", h: false },
  { w: "find", h: false },
  { w: "myself", h: false },
  { w: "again,", h: false },
  { w: "shaping", h: false },
  { w: "the", h: false },
  { w: "world", h: false },
  { w: "I", h: false },
  { w: "want", h: false },
  { w: "to", h: false },
  { w: "live", h: false },
  { w: "in.", h: false },
];

const conceptWordsSweetheart = [
  { w: "The", h: false },
  { w: "story", h: false },
  { w: "follows", h: false },
  { w: "Avi", h: false },
  { w: "Sina,", h: false },
  { w: "an", h: false },
  { w: "awkward", h: true },
  { w: "high", h: false },
  { w: "school", h: false },
  { w: "girl", h: false },
  { w: "who", h: false },
  { w: "accidentally", h: false },
  { w: "crosses", h: false },
  { w: "paths", h: false },
  { w: "with", h: false },
  { w: "a", h: false },
  { w: "mysterious,", h: false },
  { w: "intimidating", h: false },
  { w: "boy", h: false },
  { w: "who", h: false },
  { w: "secretly", h: false },
  { w: "harbors", h: false },
  { w: "feelings", h: false },
  { w: "for", h: false },
  { w: "her.", h: false },
  { w: "This", h: false },
  { w: "unexpected", h: false },
  { w: "encounter", h: false },
  { w: "sparks", h: false },
  { w: "a", h: false },
  { w: "chaotic", h: false },
  { w: "and", h: false },
  { w: "heartwarming", h: true },
  { w: "new", h: false },
  { w: "chapter", h: false },
  { w: "in", h: false },
  { w: "their", h: false },
  { w: "school", h: false },
  { w: "lives.", h: false },
];

const sweetheartSceneImages = [
  {
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/scene1-color.webp",
    title: "scene 1: establishing shot",
    aspect: "aspect-video md:aspect-[4/3]",
    sizeLabel: "1920 x 1080",
    format: "WEBP IMAGE",
    details: "BACKGROUND PRODUCTION"
  },
  {
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/thumbnail.webp",
    title: "visual thumbnail alpha",
    aspect: "aspect-square",
    sizeLabel: "800 x 800",
    format: "WEBP IMAGE",
    details: "STORYBOARD STUDY"
  },
  {
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/scene4-color.webp",
    title: "scene 4: cinematic focus",
    aspect: "aspect-video md:aspect-[3/4]",
    sizeLabel: "1080 x 1440",
    format: "WEBP IMAGE",
    details: "CLIMAX PRODUCTION FRAME"
  },
  {
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/scene2-color.webp",
    title: "scene 2: character spotlight",
    aspect: "aspect-video",
    sizeLabel: "1920 x 1080",
    format: "WEBP IMAGE",
    details: "SECONDARY CELL LAYOUT"
  },
  {
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/baris2_003.webp",
    title: "baris 2: panel division 03",
    aspect: "aspect-[16/10] md:aspect-[2/1]",
    sizeLabel: "1600 x 800",
    format: "WEBP IMAGE",
    details: "INTERMEDIATE KEYFRAME"
  },
  {
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/thumbnail2.webp",
    title: "visual thumbnail beta",
    aspect: "aspect-square",
    sizeLabel: "800 x 800",
    format: "WEBP IMAGE",
    details: "COMIC SPREAD EXPERIMENT"
  },
  {
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/baris7_001.webp",
    title: "baris 7: panel division 01",
    aspect: "aspect-[16/10] md:aspect-[2/1.2]",
    sizeLabel: "1600 x 960",
    format: "WEBP IMAGE",
    details: "FINAL COMPILATION CELL"
  }
];

const conceptWordsDeadliner = [
  { w: "Deadliner", h: true },
  { w: "is", h: false },
  { w: "a", h: false },
  { w: "classic", h: false },
  { w: "2D", h: false },
  { w: "platformer", h: true },
  { w: "following", h: false },
  { w: "the", h: false },
  { w: "chaotic", h: false },
  { w: "struggle", h: false },
  { w: "of", h: false },
  { w: "Dudung,", h: false },
  { w: "an", h: false },
  { w: "optimistic", h: false },
  { w: "and", h: false },
  { w: "perfectionist", h: false },
  { w: "college", h: false },
  { w: "student", h: false },
  { w: "trying", h: false },
  { w: "to", h: false },
  { w: "finish", h: false },
  { w: "his", h: false },
  { w: "final", h: false },
  { w: "thesis.", h: false },
  { w: "Despite", h: false },
  { w: "his", h: false },
  { w: "best", h: false },
  { w: "efforts,", h: false },
  { w: "fate", h: false },
  { w: "loves", h: false },
  { w: "to", h: false },
  { w: "test", h: false },
  { w: "him.", h: false },
];

const pipelineWords = [
  { w: "The", h: false },
  { w: "production", h: false },
  { w: "workflow", h: false },
  { w: "is", h: false },
  { w: "broken", h: false },
  { w: "down", h: false },
  { w: "into", h: false },
  { w: "six", h: false },
  { w: "distinct", h: false },
  { w: "stages,", h: true },
  { w: "tracing", h: false },
  { w: "the", h: false },
  { w: "evolution", h: false },
  { w: "from", h: false },
  { w: "abstract", h: false },
  { w: "thought", h: false },
  { w: "to", h: false },
  { w: "kinetic", h: false },
  { w: "canvas.", h: true },
];

const pipelineWordsSample2 = [
  { w: "The", h: false },
  { w: "creative", h: false },
  { w: "focus", h: false },
  { w: "merges", h: false },
  { w: "visual", h: false },
  { w: "direction", h: false },
  { w: "with", h: false },
  { w: "storytelling,", h: true },
  { w: "crafting", h: false },
  { w: "a", h: false },
  { w: "seamless", h: false },
  { w: "cinematic", h: false },
  { w: "evolution", h: false },
  { w: "across", h: false },
  { w: "dimensions.", h: false }
];

const pipelineWordsStoryboard = [
  { w: "The", h: false },
  { w: "storyboard", h: true },
  { w: "focuses", h: false },
  { w: "on", h: false },
  { w: "film-like", h: false },
  { w: "visual", h: false },
  { w: "pacing,", h: false },
  { w: "crafting", h: false },
  { w: "a", h: false },
  { w: "seamless", h: false },
  { w: "climactic", h: false },
  { w: "narrative", h: true },
  { w: "across", h: false },
  { w: "every", h: false },
  { w: "canvas.", h: false }
];

const sample2Steps = [
  {
    num: "02",
    phase: "COVER & COMPOSITION",
    title: "Cover Design & Composition",
    desc: "In designing the main cover, the challenge was to encapsulate the entire narrative essence within a single, compelling frame. I opted for a high-angle shot (POV), dynamic composition. This perspective not only emphasizes the characters' body language clearly but also creates an engaging, unambiguous focal point that draws potential readers in.",
  },
  {
    num: "03",
    phase: "STORYBOARD",
    title: "Storyboard Layout & Flow",
    desc: "As the storyboard artist, I was responsible for the visual pacing and narrative flow. I carefully structured the panel transitions to ensure a seamless, engaging reading experience, translating the script into a dynamic visual guide. The layout guides the reader's gaze vertically through conversational panels, leading to a suspenseful climax preceding the main story chapters.",
  }
];

const sample2Images = [
  {
    stepIdx: 0,
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/CH1/1.%20uncolored_1.webp",
    coloredUrl: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/CH1/1.%20colored.webp",
    title: "Cover Design & Composition",
    phase: "COVER & COMPOSITION",
    num: "02",
    layerCount: "1 Layer (Draft)",
    format: "WEBP IMAGE",
    engine: "Director Art / Clip Studio",
  },
  {
    stepIdx: 1,
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/CH1/2.%20Prologue%20webtoon%20contest-1.webp",
    coloredUrl: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/CH1/2.%20Prologue%20beres%20coloring-1.webp",
    title: "Storyboard — Part 1 (Prologue)",
    phase: "STORYBOARD",
    num: "03",
    layerCount: "Page 1 Layout",
    format: "WEBP IMAGE",
    engine: "Pacing Study / Clip Studio",
  },
  {
    stepIdx: 1,
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/CH1/3.%20Prologue%20webtoon%20contest-2.webp",
    coloredUrl: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/CH1/3.%20Prologue%20beres%20coloring-2.webp",
    title: "Storyboard — Part 2 (Prologue)",
    phase: "STORYBOARD",
    num: "03",
    layerCount: "Page 2 Draft",
    format: "WEBP IMAGE",
    engine: "Cinematic Flow / Clip Studio",
  }
];

const moodboardImages = [
  {
    name: "Side Character 1",
    role: "SUPPORTING CHARACTER 1 • LOOK & FEEL GUIDE",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%201.webp"
  },
  {
    name: "Side Character 2",
    role: "SUPPORTING CHARACTER 2 • ANATOMY & POSING STUDY",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%202.webp"
  },
  {
    name: "Side Character 3",
    role: "SUPPORTING CHARACTER 3 • CHARACTER EXPRESSIONS",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%203.webp"
  },
  {
    name: "Side Character 4",
    role: "SUPPORTING CHARACTER 4 • OUTFIT & PROPS REFERENCE",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%204.webp"
  },
  {
    name: "Male Lead",
    role: "MALE LEAD • STANCE & COSTUME STYLES",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Male%20Lead.webp"
  },
  {
    name: "Female Lead",
    role: "FEMALE LEAD • VISUAL STUDY & COLOR PALETTE",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Female%20Lead.webp"
  }
];

const deadlinerAssets = [
  {
    name: "Dudung Character Turnaround",
    role: "MAIN CHARACTER TURNAROUND & ANATOMY",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/desain%20karakter%201.1.webp",
    desc: "Core anatomy guidelines and perspective turnarounds for Dudung, highlighting facial expressions and movement physics.",
    dimensions: "1600 x 1131",
    format: "WEBP IMAGE",
  },
  {
    name: "Icon Deadliner",
    role: "OFFICIAL GAME LAUNCHER ICON",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/Icon%20Deadliner.webp",
    desc: "The official high-contrast launcher icon featuring Dudung's signature expressive gaze and vibrant background styling.",
    dimensions: "512 x 512",
    format: "WEBP IMAGE",
  },
  {
    name: "Rough Asset Sketches",
    role: "1. SKETSA & LAYOUT OUTLINE",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/1.%20sketsa.webp",
    desc: "The initial drafts mapping out environmental flora and structure, experimenting with heights and modularity of platforms.",
    dimensions: "1600 x 1000",
    format: "WEBP IMAGE",
  },
  {
    name: "Modular World Platform",
    role: "2D PLATFORM COLLIDERS & DECOR",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/concept%20platform.webp",
    desc: "Precise grid blocks designed for 2D colliders, detailing building facades, neon signs, and ground textures for Dudung's run.",
    dimensions: "1920 x 1080",
    format: "WEBP IMAGE",
  },
  {
    name: "Concept Environment",
    role: "BACKGROUND LAYER SILHOUETTES",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/concept%20environment.webp",
    desc: "Modular system background assets showing city lights, building silhouettes, and clouds that create depth in the parallax scroll.",
    dimensions: "1920 x 1080",
    format: "WEBP IMAGE",
  },
  {
    name: "Comic Logo Studio Concept",
    role: "ART & BRAND IDENTITIES",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/concept%20logo%20studio%201.7.webp",
    desc: "Authentic logo draft concepts blending modern industrial font faces with game-centric comic motifs.",
    dimensions: "1600 x 900",
    format: "WEBP IMAGE",
  }
];

interface ProjectCasePageProps {
  project: Project;
  projectIndex: number;
  totalProjects: number;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  getToolIcon: (tool: string) => React.ReactNode;
  scrollY?: number;
}

export default function ProjectCasePage({
  project,
  projectIndex,
  totalProjects,
  onBack,
  onPrev,
  onNext,
  getToolIcon,
  scrollY,
}: ProjectCasePageProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredMoodboardIdx, setHoveredMoodboardIdx] = useState<number | null>(null);

  // Local scroll state to force re-renders on scroll so bounding client rects are recalculated in real time
  const [localScrollY, setLocalScrollY] = useState(0);

  const currentScroll = scrollY !== undefined ? scrollY : localScrollY;

  const conceptWords = 
    projectIndex === 0 
      ? conceptWordsProcrastination 
      : projectIndex === 1 
      ? conceptWordsSweetheart 
      : conceptWordsDeadliner;

  const conceptSubLabel = 
    projectIndex === 0 
      ? "04 // DAYDREAM ANATOMY • SUBCONSCIOUS DRIFT" 
      : projectIndex === 1 
      ? "04 // CINEMATIC NARRATIVE • VISUAL SYNERGY" 
      : "04 // EXHAUSTION DYNAMICS • ACADEMIC RACE";

  useEffect(() => {
    const handleScroll = () => {
      setLocalScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    // Safety delay trigger
    const t = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  // Concept section scroll anim refs (calculated dynamically on each render linked with scrollY/localScrollY)
  const theConceptRef = React.useRef<HTMLDivElement>(null);
  const conceptHeadingRef = React.useRef<HTMLHeadingElement>(null);

  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  let conceptHeadingProgress = 0;
  let conceptTextProgress = 0;

  if (conceptHeadingRef.current && windowHeight > 0) {
    const rect = conceptHeadingRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.95;
    const endY = windowHeight * 0.45;
    conceptHeadingProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  if (theConceptRef.current && windowHeight > 0) {
    const rect = theConceptRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.85;
    const endY = windowHeight * 0.35;
    conceptTextProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  // Case study interactive state
  // Case 1: Procrastination
  const [procrastinationStep, setProcrastinationStep] = useState(0);
  const [panicLevel, setPanicLevel] = useState(15);
  const [coffeeCups, setCoffeeCups] = useState(1);
  const [surrealMode, setSurrealMode] = useState(false);
  const [activeTitleIdx, setActiveTitleIdx] = useState<number | null>(null);

  // Webm Video Controls
  const videoRef1 = React.useRef<HTMLVideoElement>(null);
  const videoRef2 = React.useRef<HTMLVideoElement>(null);
  const videoRef3 = React.useRef<HTMLVideoElement>(null);
  const videoRef4 = React.useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const video1ContainerRef = React.useRef<HTMLDivElement>(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [isPointerInContainer, setIsPointerInContainer] = useState(false);
  const [isDraggingVideo1, setIsDraggingVideo1] = useState(false);

  const togglePlayPause = (num: number, ref: React.RefObject<HTMLVideoElement | null>) => {
    if (ref.current) {
      if (ref.current.paused) {
        ref.current.play().catch(() => {});
        setVideoPaused(prev => ({ ...prev, [num]: false }));
      } else {
        ref.current.pause();
        setVideoPaused(prev => ({ ...prev, [num]: true }));
      }
    }
  };

  // Case 2: Scary Sweetheart
  const [webtoonFrame, setWebtoonFrame] = useState(0);
  const [renderMode, setRenderMode] = useState<"sketch" | "color">("sketch");
  const [comicReactions, setComicReactions] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  // Case 3: Deadliner Asset Grid Lightbox State
  const [selectedDeadlinerAsset, setSelectedDeadlinerAsset] = useState<{
    url: string;
    name: string;
    desc: string;
    role: string;
    format?: string;
    dimensions?: string;
  } | null>(null);
  const [isTeaserLoaded, setIsTeaserLoaded] = useState(false);
  const teaserVideoRef = React.useRef<HTMLVideoElement>(null);
  const [isTeaserPlaying, setIsTeaserPlaying] = useState(true);
  const [isTeaserMuted, setIsTeaserMuted] = useState(false);

  const [currentTopRightIdx, setCurrentTopRightIdx] = useState(0);
  const [isTopLeftClicked, setIsTopLeftClicked] = useState(false);

  const topRightImages = [
    "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/1.%20sketsa.webp",
    "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/3.%20DEADLINER/3.%20stylising.webp",
    "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/3.%20DEADLINER/4.%20base%20color.webp",
    "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/3.%20DEADLINER/5.%20shading.webp",
    "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/3.%20DEADLINER/6.%20lighting.webp"
  ];

  useEffect(() => {
    if (projectIndex !== 2) return;
    const interval = setInterval(() => {
      setCurrentTopRightIdx((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, [projectIndex]);

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => {
      setCopiedColor(null);
    }, 1500);
  };

  // Case 1 interactive steps
  const procrastinationSteps = [
    {
      time: "08:30 AM",
      action: "Set up pristine canvas in Adobe Photoshop",
      log: "Ready to conquer the world! Energy: 100%. Ideas: Infinite.",
      effect: () => {
        setPanicLevel(10);
      },
    },
    {
      time: "10:15 AM",
      action: "Checking 'quick reference' boards",
      log: "Spent 45 minutes analyzing an unrelated vintage stamp collection on Pinterest instead of drawing. Style exploration is vital... right?",
      effect: () => {
        setPanicLevel(25);
      },
    },
    {
      time: "01:00 PM",
      action: "Existential crisis & overthinking about style compatibility",
      log: "'Is watercolor gradient too cliché? Should I draw in 1-bit style instead?' Overloaded memory, starting to search for coffee.",
      effect: () => {
        setPanicLevel(45);
        setCoffeeCups((c) => c + 1);
      },
    },
    {
      time: "04:30 PM",
      action: "Workspace deep cleaning obsession",
      log: "I can't possibly paint when the ruler on my physical drawer is angled at 87 degrees. Rearranged all pencils by color density.",
      effect: () => {
        setPanicLevel(65);
      },
    },
    {
      time: "09:00 PM",
      action: "Midnight rush & massive adrenaline explosion",
      log: "Deadline is tomorrow morning! Brain enters hyper-focus survival overclock. The brushes are of fire, drawing the absolute masterpiece in under 3 hours!",
      effect: () => {
        setPanicLevel(95);
        setCoffeeCups((c) => c + 2);
      },
    },
    {
      time: "03:15 AM",
      action: "Masterpiece Completed. Soul Transferred.",
      log: "The overthinking turned into gorgeous surreal character lines. The tired soul finds joy and rediscovery again. Exquisite artwork exported successfully!",
      effect: () => {
        setPanicLevel(15);
      },
    },
  ];

  // Case 2 comic strips
  const webtoonFrames = [
    {
      scene: "SCENE 1: THE LOCKER JAM",
      dialogue: "Avi drops her books at the school locker. Scraping drafts scattering everywhere.",
      caption: "Avi Sina: 'Oh no, not again! Why can't gravity take a break for once in my life?'",
      reax: "*CLATTER*",
    },
    {
      scene: "SCENE 2: THE SHADOW LOOMS",
      dialogue: "A massive, deep shadow blocks the school hallway light. It's Reza standing taller than usual, arms crossed.",
      caption: "Reza: 'Rough day, klutzy? Or did the floor owe you a hug?'",
      reax: "*TSUNDER-GLARE*",
    },
    {
      scene: "SCENE 3: ABSOLUTE DEBATE STATE",
      dialogue: "Avi's pupils compress with dramatic anxiety. She scrambles backward.",
      caption: "Avi Sina: 'Please spare me, formidable senior! I didn't mean to pollute your sacred visual pathway!'",
      reax: "*HEARTBEAT PANIC*",
    },
    {
      scene: "SCENE 4: RARE SOFT GLIMPSE",
      dialogue: "Reza ducks down, grabs her primary sketchbook draft, and gently brushes off dust, a subtle dark red blush on his face.",
      caption: "Reza: '...clogging the street looks bad on you. Take this back, and... stay safe.'",
      reax: "*SUDDEN BLUSH*",
    },
  ];

  // Case 2 trigger float reaction text
  const addReactionText = (text: string) => {
    const randomId = Math.random();
    const newReax = {
      id: randomId,
      text: text,
      x: 30 + Math.random() * 40, // percentage positioning
      y: 15 + Math.random() * 40,
    };
    setComicReactions((prev) => [...prev, newReax]);
    setTimeout(() => {
      setComicReactions((prev) => prev.filter((r) => r.id !== randomId));
    }, 1200);
  };



  return (
    <div className="w-full bg-[#E5E2DC] min-h-screen text-[#161616]">
      {/* 3-Column Precise Grid Wrapper */}
      <div className="w-full grid lg:grid-cols-[85px_1fr_85px] grid-cols-[55px_1fr_55px] gap-[1px] bg-[#E5E2DC]">
        {/* Left column margin */}
        <div className="bg-[#FAF9F5] min-h-screen col-start-1 col-end-2 row-start-1 flex flex-col justify-between py-12 items-center text-[#8c8275] border-r border-[#E5E2DC]/30">
          <div className="text-[10px] font-mono tracking-widest uppercase rotate-90 origin-left translate-x-3.5 mt-8 whitespace-nowrap">
            STUDIO FILE // {project.num}
          </div>
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E2DC] hover:border-[#F05C3B] hover:text-[#F05C3B] transition-colors cursor-pointer"
            title="Return to home grid"
          >
            ←
          </button>
        </div>

        {/* Center detailed column */}
        <div className="bg-[#FAF9F5] col-start-2 col-end-3 row-start-1 flex flex-col min-h-screen w-full">
          
          {/* HEADER ROW - Back and Title with Case numbering */}
          <div className="border-b border-[#E5E2DC] py-5 px-6 md:px-12 flex justify-between items-center bg-white shrink-0">
            <button
              onClick={onBack}
              className="group/back inline-flex items-center gap-2.5 text-[9px] md:text-xs font-mono tracking-widest uppercase text-[#5a564e] hover:text-[#F05C3B] transition-colors cursor-pointer bg-transparent"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/back:-translate-x-1" />
              <span>Back To Projects</span>
            </button>

            <span className="text-[10px] md:text-xs font-mono tracking-widest text-[#AE9E8E] uppercase">
              CASE STUDY {project.num} / 03
            </span>

            {/* In-page direct case slider */}
            <div className="flex items-center gap-1">
              <button
                onClick={onPrev}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E5E2DC] text-xs hover:border-[#F05C3B] hover:text-[#F05C3B] active:scale-95 transition-all cursor-pointer"
                title="Go to previous project details"
              >
                ←
              </button>
              <button
                onClick={onNext}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E5E2DC] text-xs hover:border-[#F05C3B] hover:text-[#F05C3B] active:scale-95 transition-all cursor-pointer"
                title="Go to next project details"
              >
                →
              </button>
            </div>
          </div>

          {/* MAIN HERO SECTION */}
          <div className="relative w-full aspect-video md:max-h-[580px] bg-slate-100 overflow-hidden border-b border-[#E5E2DC]">
            {/* Blueprint grid dots */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none z-10"
              style={{
                backgroundImage: "radial-gradient(#AE9E8E 1.2px, transparent 1.2px)",
                backgroundSize: "16px 16px",
              }}
            />
            {projectIndex === 1 ? (
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                {/* Blurry Background with Parallax */}
                {project.image.endsWith(".webm") ? (
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover blur-[8px] transition-transform duration-100 ease-out brightness-95"
                    style={{
                      transform: `translateY(${currentScroll * 0.15}px) scale(1.15)`,
                      transformOrigin: "center center",
                    }}
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    className="w-full h-full object-cover blur-[8px] transition-transform duration-100 ease-out brightness-95"
                    style={{
                      transform: `translateY(${currentScroll * 0.15}px) scale(1.15)`,
                      transformOrigin: "center center",
                    }}
                  />
                )}
                
                {/* Foreground Character with Parallax layered cleanly in front */}
                {project.foregroundImage && (
                  <div 
                    className="absolute inset-x-0 bottom-0 top-[2%] z-10 pointer-events-none flex items-end justify-center select-none overflow-visible transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateY(${currentScroll * 0.05}px)`,
                    }}
                  >
                    <img
                      src={project.foregroundImage}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      alt={`${project.title} Character Foreground`}
                      className="h-[105%] w-auto object-contain object-bottom scale-[1.08] origin-bottom transition-all duration-1000 ease-out"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Background Image with Parallax for simple full designs */}
                {project.image.endsWith(".webm") ? (
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateY(${currentScroll * 0.15}px) scale(1.15)`,
                      transformOrigin: "center center",
                    }}
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateY(${currentScroll * 0.15}px) scale(1.15)`,
                      transformOrigin: "center center",
                    }}
                  />
                )}
              </div>
            )}
            
            {/* Elegant metadata details bar overlaid */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-10 flex flex-col justify-end text-white select-none z-20">
              <span className="text-[#F05C3B] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 animate-pulse">
                ACTIVE SHOWCASE
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-[62px] font-normal leading-none tracking-tight text-white uppercase font-sans">
                {project.title}
              </h1>
              <p className="text-[#dfdfd8] text-xs md:text-sm font-light uppercase tracking-wider mt-2.5 max-w-xl">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* 4-BOX METADATA DETAILS (ROLE, CLIENT, TIMELINE, PLATFORM) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#E5E2DC] gap-[1px] border-b border-[#E5E2DC]">
            <div className="bg-[#FAF9F5] p-5 md:p-6.5 flex flex-col justify-start">
              <span className="font-mono text-[9px] text-[#AE9E8E] uppercase tracking-widest block mb-1">
                ROLE
              </span>
              <span className="font-sans text-sm font-medium text-[#161616]">
                {project.role}
              </span>
              <span className="text-[9px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                {project.roleDesc}
              </span>
            </div>

            <div className="bg-[#FAF9F5] p-5 md:p-6.5 flex flex-col justify-start">
              <span className="font-mono text-[9px] text-[#AE9E8E] uppercase tracking-widest block mb-1">
                CLIENT
              </span>
              <span className="font-sans text-sm font-medium text-[#161616]">
                {project.client}
              </span>
              <span className="text-[9px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                {project.clientDesc}
              </span>
            </div>

            <div className="bg-[#FAF9F5] p-5 md:p-6.5 flex flex-col justify-start">
              <span className="font-mono text-[9px] text-[#AE9E8E] uppercase tracking-widest block mb-1">
                LOCATION
              </span>
              <span className="font-sans text-sm font-medium text-[#161616] leading-snug">
                {project.category.split("•")[1] || "JAKARTA, INDONESIA"}
              </span>
              <span className="text-[9px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                CREATIVE REGION
              </span>
            </div>

            <div className="bg-[#FAF9F5] p-5 md:p-6.5 flex flex-col justify-start">
              <span className="font-mono text-[9px] text-[#AE9E8E] uppercase tracking-widest block mb-1">
                YEAR // DATE
              </span>
              <span className="font-sans text-sm font-medium text-[#161616]">
                2025 // 2026 EDITION
              </span>
              <span className="text-[9px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                ARCHIVAL TIMELINE
              </span>
            </div>
          </div>

          {/* SPLIT GRID: CONCEPT EXPLANATION & VALUE TRAY (COLOURS, TOOLS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#E5E2DC] gap-[1px] border-b border-[#E5E2DC]">
            
            {/* Left box: Concept Narrative */}
            <div className="bg-[#FAF9F5] p-6 md:p-10 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-[#F05C3B] uppercase tracking-widest block mb-4.5">
                  01 // CASE SYNOPSIS
                </span>
                {projectIndex === 0 ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-3">
                        About the Project
                      </h3>
                      <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text">
                        This project is dedicated to myself and my family, who have always supported me. It serves as a personal showcase, bridging emotional storytelling with motion art to express my identity as a creator.
                      </p>
                    </div>
                  </div>
                ) : projectIndex === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-3">
                        About the Project
                      </h3>
                      <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text">
                        The LINE Webtoon Contest 2025 is a major industry event challenging creators to pitch original stories for a chance at a grand prize and an official debut.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-3">
                        About the Project
                      </h3>
                      <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text whitespace-pre-line mb-6">
                        {project.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-[#E5E2DC] pt-4.5 flex gap-4 text-[#8c8275] text-[10px] font-mono tracking-widest uppercase">
                <span>[ CURATED ART STUDY ]</span>
                <span className="text-[#F05C3B]">&bull;</span>
                <span>AUTHENTIC WORK</span>
              </div>
            </div>

            {/* Right box: Tools and Color systems side-by-side */}
            <div className="bg-[#FAF9F5] p-6 md:p-10 flex flex-col gap-6 justify-between border-t md:border-t-0 border-[#E5E2DC]">
              
              {/* Palette */}
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest block mb-3.5">
                  {copiedColor ? (
                    <span className="text-[#F05C3B] font-bold animate-pulse">
                      COPIED COLOR HEX: {copiedColor}!
                    </span>
                  ) : (
                    <span className="text-[#AE9E8E]">02 // BRAND PALETTE (TAP TO COPY HEX)</span>
                  )}
                </span>
                <div className="flex flex-col gap-3.5">
                  {project.palette.map((color, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleCopyColor(color)}
                      className="flex items-center gap-3 group/item cursor-pointer hover:bg-neutral-100/50 p-1.5 rounded-lg transition-all"
                    >
                      <button
                        className="w-10 h-10 rounded-full border border-black/10 shadow-xs group-hover/item:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                        aria-label={`Copy hex code ${color}`}
                      />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono text-[#AE9E8E]">SWATCH_0{idx + 1}</span>
                        <span className="font-sans text-sm font-semibold text-[#1a1a1a] flex items-center gap-1.5">
                          {project.paletteNames[idx]}
                          <span className="text-[8px] font-mono text-neutral-400 group-hover/item:text-[#F05C3B] transition-colors bg-neutral-100 py-0.5 px-1.5 rounded-md uppercase">
                            {color}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools tray */}
              <div className="border-t border-[#E5E2DC] pt-5.5">
                <span className="font-mono text-[9px] text-[#AE9E8E] uppercase tracking-widest block mb-3">
                  03 // DEPLOYED UTILITIES & SUITE
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {project.tools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 bg-white border border-[#E5E2DC]/80 text-[#5a564e] hover:text-[#F05C3B] hover:border-[#F05C3B]/40 transition-all py-2 px-3.5 rounded-full text-xs shadow-3xs cursor-default"
                    >
                      <span>{getToolIcon(tool)}</span>
                      <span className="font-mono text-[10px] tracking-wider uppercase font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* THE CONCEPT - NEW SECTION STYLED LIKE ABOUT ME */}
          <div 
            className="bg-[#FAF9F5] border-b border-[#E5E2DC] py-24 md:py-32 px-6 md:px-10 flex flex-col justify-center items-start w-full"
          >
            <div ref={conceptHeadingRef} className="w-full flex justify-between items-baseline mb-8 md:mb-12">
              <h2 className="font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase">
                <span
                  style={{
                    backgroundImage: `linear-gradient(to right, #333333 ${Math.min(100, conceptHeadingProgress * 100)}%, #b5b5b0 ${Math.min(100, conceptHeadingProgress * 100)}%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {projectIndex === 1 ? "THE STORY" : "THE CONCEPT"}
                </span>
              </h2>
              <span className="font-mono text-[9px] text-[#F05C3B]/60 tracking-wider font-light uppercase hidden md:inline">
                {conceptSubLabel}
              </span>
            </div>
            <p 
              ref={theConceptRef}
              className="text-xl md:text-3xl lg:text-[38px] xl:text-[40px] font-normal leading-[1.1] md:leading-[1.15] tracking-tight text-[#161616]/40 select-text w-full"
            >
              {conceptWords.map((word, i) => {
                const fillPercentage = Math.max(
                  0,
                  Math.min(100, (conceptTextProgress * conceptWords.length - i) * 100),
                );
                const targetColor = word.h ? "#F05C3B" : "#333333";
                return (
                  <span key={`${projectIndex}-${i}-${word.w}`}>
                    <span
                      style={{
                        backgroundImage: `linear-gradient(to right, ${targetColor} ${fillPercentage}%, #b5b5b0 ${fillPercentage}%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {word.w}
                    </span>
                    {i < conceptWords.length - 1 && " "}
                  </span>
                );
              })}
            </p>

            {/* SCENE COMPOSITION GALLERY GRID ADDITION FOR SCARY SWEETHEART */}
            {projectIndex === 1 && (
              <div className="relative w-[calc(100%+3rem)] md:w-[calc(100%+5rem)] -mx-6 md:-mx-10 mt-16 md:mt-24 border-y border-[#E5E2DC] overflow-hidden animate-fade-in bg-[#E5E2DC] gap-[1px] grid grid-cols-1 md:grid-cols-3 select-none">
                {/* Column 1: Varying height, highly vertical portrait style */}
                <div className="flex flex-col gap-[1px] bg-[#E5E2DC]">
                  <div className="h-[320px] md:h-[620px] relative overflow-hidden group/scene bg-[#faf9f5]">
                    <img 
                      src={sweetheartSceneImages[0].url} 
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/scene:scale-103"
                    />
                  </div>
                  <div className="h-[240px] md:h-[420px] relative overflow-hidden group/scene bg-[#faf9f5]">
                    <img 
                      src={sweetheartSceneImages[3].url} 
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/scene:scale-103"
                    />
                  </div>
                </div>

                {/* Column 2: Varying height, highly vertical portrait style */}
                <div className="flex flex-col gap-[1px] bg-[#E5E2DC]">
                  <div className="h-[280px] md:h-[500px] relative overflow-hidden group/scene bg-[#faf9f5]">
                    <img 
                      src={sweetheartSceneImages[6].url} 
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/scene:scale-103"
                    />
                  </div>
                  <div className="h-[280px] md:h-[540px] relative overflow-hidden group/scene bg-[#faf9f5]">
                    <img 
                      src={sweetheartSceneImages[4].url} 
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover scale-[1.6] origin-center transition-transform duration-700 ease-out group-hover/scene:scale-[1.67]"
                    />
                  </div>
                </div>

                {/* Column 3: Varying height, highly vertical portrait style */}
                <div className="flex flex-col gap-[1px] bg-[#E5E2DC]">
                  <div className="h-[280px] md:h-[540px] relative overflow-hidden group/scene bg-[#faf9f5]">
                    <img 
                      src={sweetheartSceneImages[2].url} 
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/scene:scale-103"
                    />
                  </div>
                  <div className="h-[280px] md:h-[500px] relative overflow-hidden group/scene bg-[#faf9f5]">
                    <img 
                      src={sweetheartSceneImages[5].url} 
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/scene:scale-103"
                    />
                  </div>
                </div>

                {/* Bottom smooth fade overlay blending into the page background */}
                <div className="absolute bottom-0 left-0 right-0 h-28 md:h-40 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/60 to-transparent pointer-events-none z-10" />
              </div>
            )}
          </div>

          {/* TEASER VIDEO SECTION (Between Concept and Contribution for Deadliner) */}
          {projectIndex === 2 && (
            <div className="w-full bg-[#FAF9F5] border-b border-[#E5E2DC] py-12 md:py-16 px-4 md:px-10 lg:px-14">
              <div className="max-w-7xl mx-auto w-full">
                <div className="bg-black overflow-hidden relative">
                  {!isTeaserLoaded ? (
                    <div 
                      onClick={() => setIsTeaserLoaded(true)}
                      className="relative aspect-video w-full transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group bg-black overflow-hidden"
                    >
                      {/* Video element acting as thumbnail preview from second 2 */}
                      <video 
                        src="https://github.com/kupicake/database/raw/HERO-SECTION/3.%20DEADLINER/Teaser%20Deadliner.mp4#t=2"
                        preload="metadata"
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      />
                      
                      {/* Large Thin White Play Icon on the Center */}
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 md:border-[3px] border-white/85 flex items-center justify-center text-white bg-black/15 group-hover:scale-108 group-hover:border-white transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] z-10">
                        <Play className="w-9 h-9 md:w-12 md:h-12 fill-white text-white translate-x-1" />
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="aspect-video w-full relative bg-black cursor-pointer group"
                      onClick={() => {
                        if (teaserVideoRef.current) {
                          if (isTeaserPlaying) {
                            teaserVideoRef.current.pause();
                            setIsTeaserPlaying(false);
                          } else {
                            teaserVideoRef.current.play().catch(() => {});
                            setIsTeaserPlaying(true);
                          }
                        }
                      }}
                    >
                      <video
                        ref={teaserVideoRef}
                        src="https://github.com/kupicake/database/raw/HERO-SECTION/3.%20DEADLINER/Teaser%20Deadliner.mp4"
                        autoPlay
                        loop
                        muted={isTeaserMuted}
                        playsInline
                        className="w-full h-full object-contain"
                        onPlay={() => setIsTeaserPlaying(true)}
                        onPause={() => setIsTeaserPlaying(false)}
                      />

                      {/* Custom Center Play/Pause Overlay - shown when paused */}
                      {!isTeaserPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/15 z-10 pointer-events-none">
                          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 md:border-[3px] border-white/85 flex items-center justify-center text-white bg-black/15 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                            <Play className="w-9 h-9 md:w-12 md:h-12 fill-white text-white translate-x-1" />
                          </div>
                        </div>
                      )}

                      {/* Custom Volume Controls (Safe from blocking play toggle) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTeaserMuted(!isTeaserMuted);
                        }}
                        className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 hover:bg-black/75 hover:border-white/35 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                        title={isTeaserMuted ? "Unmute" : "Mute"}
                      >
                        {isTeaserMuted ? (
                          <VolumeX className="w-4.5 h-4.5" />
                        ) : (
                          <Volume2 className="w-4.5 h-4.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC CASE SHOWCASE HUB (05) */}
          <div className={`w-full bg-[#FAF9F5] border-b border-[#E5E2DC] ${(projectIndex === 0 || projectIndex === 1 || projectIndex === 2) ? "p-0" : "p-6 md:p-10 lg:p-14"}`}>
            {projectIndex !== 0 ? (
              projectIndex === 1 ? (
                <div className="p-6 md:p-10 lg:p-14 pb-0 select-none">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 w-full border-b border-[#E5E2DC]/80 pb-3 mb-1">
                    <h2 className="font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase text-[#161616]">
                      MY CONTRIBUTION
                    </h2>
                    <span className="font-mono text-[9px] text-[#F05C3B]/80 tracking-wider font-light uppercase">
                      05 // AWKWARD GLANCES • SILENT SILHOUETTES • COMIC DEV
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-10 lg:p-14 pb-0 select-none">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 w-full border-b border-[#E5E2DC]/80 pb-3 mb-4">
                    <h2 className="font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase text-[#161616]">
                      MY CONTRIBUTION
                    </h2>
                    <span className="font-mono text-[9px] text-[#F05C3B]/80 tracking-wider font-light uppercase">
                      05 // CORE CHARACTER DESIGN • ENVIRONMENT ART • MODULAR SYSTEM
                    </span>
                  </div>
                  <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text mt-4 mb-6">
                    For the game’s core visual development, I collaborated on the design of the main character, Dudung, creating full-body turnarounds and expressive sprites that convey his personality during gameplay, including a custom animated title screen of him working late into the night to set the game's relatable tone. Alongside character design, I established the environment for the 2D platformer world by creating a modular system of background assets, buildings, and environmental flora that fit seamlessly into the layout while keeping the player engaged.
                  </p>
                  <div className="mb-8 select-none">
                    <a
                      href="https://github.com/kupicake/database/tree/HERO-SECTION/3.%20DEADLINER/aset"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E5E2DC] hover:border-[#F05C3B] hover:text-[#F05C3B] text-[#5a564e] bg-white transition-all duration-300 font-mono text-[10px] tracking-wider uppercase font-medium shadow-3xs cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Deadliner Game Assets</span>
                    </a>
                  </div>
                </div>
              )
            ) : null}

            {/* Bento Grid Layering Videos */}
            {projectIndex === 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full overflow-hidden animate-fade-in border border-[#E5E2DC]">
                {/* Column 1: Video 1 (Complete Composition) with Touch Swiping */}
                <div 
                  ref={video1ContainerRef}
                  className={`w-full aspect-video lg:aspect-[2/3] lg:h-auto bg-neutral-950 border-b lg:border-b-0 lg:border-r border-[#E5E2DC] relative overflow-hidden select-none font-sans transition-all duration-200 ${
                    isPointerInContainer ? "md:cursor-none" : "cursor-grab active:cursor-grabbing"
                  }`}
                  onPointerDown={(e) => {
                    setActiveTitleIdx(1);
                    setIsDraggingVideo1(true);
                    dragStartPos.current = { x: e.clientX, y: e.clientY };
                  }}
                  onPointerUp={(e) => {
                    const diffX = Math.abs(e.clientX - dragStartPos.current.x);
                    const diffY = Math.abs(e.clientY - dragStartPos.current.y);
                    if (diffX < 6 && diffY < 6) {
                      togglePlayPause(1, videoRef1);
                    }
                    setActiveTitleIdx(null);
                    setIsDraggingVideo1(false);
                  }}
                  onPointerEnter={() => {
                    setActiveTitleIdx(1);
                    setIsPointerInContainer(true);
                  }}
                  onPointerLeave={() => {
                    setActiveTitleIdx(null);
                    setIsPointerInContainer(false);
                    setIsDraggingVideo1(false);
                  }}
                  onPointerMove={(e) => {
                    if (video1ContainerRef.current) {
                      const rect = video1ContainerRef.current.getBoundingClientRect();
                      setPointerPos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }
                  }}
                >
                  {/* Custom Cursor Follower for Desktop & Tablet */}
                  {isPointerInContainer && (
                    <div 
                      className="absolute hidden md:block pointer-events-none z-40 transition-transform duration-75 mix-blend-difference"
                      style={{
                        left: pointerPos.x,
                        top: pointerPos.y,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <motion.div 
                        animate={{
                          scale: isDraggingVideo1 ? 1.25 : 1,
                        }}
                        className="relative flex items-center justify-center pointer-events-none"
                      >
                        {/* Outer rotating/pulsing focal frame */}
                        <div 
                          className={`absolute w-10 h-10 border-2 rounded-full transition-all duration-300 ${
                            isDraggingVideo1 ? "border-[#F05C3B] border-solid animate-spin" : "border-white/30 border-dashed"
                          }`}
                          style={{ animationDuration: isDraggingVideo1 ? "4s" : "12s" }}
                        />

                        {/* Secondary crosshair ring */}
                        <div className={`absolute w-6 h-6 border rounded-full transition-all duration-300 ${isDraggingVideo1 ? "border-white/40 scale-110" : "border-white/10 scale-95"}`} />

                        {/* Central focus target point */}
                        <div className={`w-2.5 h-2.5 rounded-full bg-[#F05C3B] transition-all duration-300 ${isDraggingVideo1 ? "scale-140 shadow-lg shadow-[#F05C3B]/60 animate-pulse" : "scale-100"}`} />

                        {/* Dynamic drag brackets & status indicator */}
                        {isDraggingVideo1 ? (
                          <>
                            <motion.span 
                              animate={{ x: [-14, -22, -14] }}
                              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                              className="absolute right-12 text-[#F05C3B] text-[11px] font-mono select-none font-bold"
                            >
                              ◀
                            </motion.span>
                            <motion.span 
                              animate={{ x: [14, 22, 14] }}
                              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                              className="absolute left-12 text-[#F05C3B] text-[11px] font-mono select-none font-bold"
                            >
                              ▶
                            </motion.span>
                            
                            <span className="absolute top-7 left-1/2 -translate-x-1/2 bg-[#0c0c0c]/90 border border-[#F05C3B]/40 text-[#F05C3B] px-2 py-0.5 font-mono text-[7px] tracking-[0.15em] uppercase whitespace-nowrap">
                              PANNING LAYERS
                            </span>
                          </>
                        ) : (
                          <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/85 border border-white/15 text-white/90 px-1.5 py-0.5 font-mono text-[6.5px] tracking-[0.12em] uppercase whitespace-nowrap">
                            DRAG LEFT ◄ ► RIGHT
                          </span>
                        )}
                      </motion.div>
                    </div>
                  )}

                  <motion.div
                    drag="x"
                    dragConstraints={video1ContainerRef}
                    dragElastic={0.1}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-y-0 left-[-20%] lg:left-[-160%] w-[140%] lg:w-[260%] h-full origin-center"
                  >
                    <video
                      ref={videoRef1}
                      src="https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/1.%20layering.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    />
                  </motion.div>

                  {/* Unified Minimalist Grid Paused/Interactive Overlay for Video 1 (Only shows when clicked & paused) */}
                  {videoPaused[1] && (
                    <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 z-10 select-none">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#0c0c0c] p-6 rounded-none border border-white/10 flex flex-col items-center justify-center shadow-2xl max-w-[260px] text-center"
                      >
                        {/* 4 sharp technical grid corners */}
                        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#F05C3B]" />
                        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#F05C3B]" />
                        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#F05C3B]" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#F05C3B]" />

                        <CreativePlayPauseIcon isPaused={true} />
                        
                        <span className="text-[#FAF9F5] font-mono text-[10px] tracking-widest uppercase font-bold mt-4">
                          VIDEO PAUSED
                        </span>

                        {/* Interactive panning schematic visual guide */}
                        <div className="flex items-center gap-2.5 my-3.5 pt-3.5 border-t border-white/5 w-full justify-center">
                          <motion.span 
                            animate={{ x: [-4, 4, -4] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="text-[#F05C3B] text-[10px]"
                          >
                            ◀
                          </motion.span>
                          <div className="w-16 h-[1.5px] bg-white/20 relative flex items-center justify-center">
                            <motion.span 
                              animate={{ x: [-16, 16, -16] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                              className="absolute w-2 h-2 bg-[#F05C3B]"
                            />
                          </div>
                          <motion.span 
                            animate={{ x: [4, -4, 4] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="text-[#F05C3B] text-[10px]"
                          >
                            ▶
                          </motion.span>
                        </div>

                        <span className="text-[#FAF9F5] font-mono text-[9px] tracking-widest uppercase font-bold">
                          DRAG TO PAN LAYERS
                        </span>
                        
                        <span className="text-neutral-400 font-mono text-[8px] uppercase tracking-wider mt-1.5 leading-relaxed block">
                          Slide left/right to reveal active illustration layers
                        </span>

                        <div className="mt-4 pt-2.5 border-t border-white/10 w-full">
                          <span className="text-neutral-500 font-mono text-[7px] uppercase tracking-widest block">
                            Tap anywhere to resume
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Minimalist Passive Title details shown when panned/active */}
                  {activeTitleIdx === 1 && !videoPaused[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-5 left-5 bg-black/85 text-[#FAF9F5] font-mono text-[9px] tracking-widest uppercase py-2 px-4 rounded-none border border-white/10 backdrop-blur-md z-30 pointer-events-none"
                    >
                      video 1 : composition layers
                    </motion.div>
                  )}
                </div>

                {/* Column 2: Stacked Puppets Videos 2, 3, and 4 in balanced 3x2 Grid (Resolves laptop and tablet mismatched scaling) */}
                <div className="w-full grid grid-cols-2 grid-rows-3 h-[480px] lg:h-auto lg:aspect-[2/3] bg-neutral-950 font-sans">
                  {/* Video 2 (character's puppet) - Spans upper 2/3 and Full Width */}
                  <div 
                    className="col-span-2 row-span-2 relative border-b border-[#E5E2DC] overflow-hidden select-none cursor-pointer"
                    onPointerDown={() => {
                      setActiveTitleIdx(2);
                    }}
                    onPointerUp={() => setActiveTitleIdx(null)}
                    onPointerEnter={() => {
                      setActiveTitleIdx(2);
                    }}
                    onPointerLeave={() => {
                      setActiveTitleIdx(null);
                    }}
                    onClick={() => togglePlayPause(2, videoRef2)}
                  >
                    <motion.div
                      animate={{ scale: activeTitleIdx === 2 ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-full h-full origin-center"
                    >
                      <video
                        ref={videoRef2}
                        src="https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/2.%20layering-menungso-resize.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </motion.div>

                    {/* Creative Custom Pause Overlay */}
                    {videoPaused[2] && (
                      <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[1.5px] flex flex-col items-center justify-center z-20">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-[#0c0c0c] p-4.5 rounded-none border border-white/10 flex flex-col items-center justify-center shadow-2xl relative min-w-[140px]"
                        >
                          {/* sharp corners */}
                          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#F05C3B]" />
                          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#F05C3B]" />
                          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#F05C3B]" />
                          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#F05C3B]" />
                          
                          <CreativePlayPauseIcon isPaused={true} />
                          <span className="text-[#FAF9F5] font-mono text-[8px] uppercase tracking-widest mt-2 px-1 font-bold">PAUSED</span>
                        </motion.div>
                      </div>
                    )}

                    {activeTitleIdx === 2 && !videoPaused[2] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-4 left-4 bg-black/85 text-[#FAF9F5] font-mono text-[9px] tracking-widest uppercase py-2 px-4 rounded-none border border-white/10 backdrop-blur-md z-30 pointer-events-none"
                      >
                        video 2 : character puppet
                      </motion.div>
                    )}
                  </div>

                  {/* Video 3 (hair's puppet) - Row 3, Left Column */}
                  <div 
                    className="col-span-1 row-span-1 relative border-r border-[#E5E2DC] overflow-hidden select-none cursor-pointer"
                    onPointerDown={() => {
                      setActiveTitleIdx(3);
                    }}
                    onPointerUp={() => setActiveTitleIdx(null)}
                    onPointerEnter={() => {
                      setActiveTitleIdx(3);
                    }}
                    onPointerLeave={() => {
                      setActiveTitleIdx(null);
                    }}
                    onClick={() => togglePlayPause(3, videoRef3)}
                  >
                    <motion.div
                      animate={{ scale: activeTitleIdx === 3 ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-full h-full origin-center"
                    >
                      <video
                        ref={videoRef3}
                        src="https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/3.%20layering-rambut-resize.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </motion.div>

                    {/* Creative Custom Pause Overlay */}
                    {videoPaused[3] && (
                      <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[1.5px] flex flex-col items-center justify-center z-20">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-[#0c0c0c] p-3.5 rounded-none border border-white/10 flex flex-col items-center justify-center shadow-2xl relative min-w-[110px]"
                        >
                          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#F05C3B]" />
                          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#F05C3B]" />
                          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#F05C3B]" />
                          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#F05C3B]" />

                          <CreativePlayPauseIcon isPaused={true} />
                          <span className="text-[#FAF9F5] font-mono text-[7px] uppercase tracking-widest mt-1.5 px-1">PAUSED</span>
                        </motion.div>
                      </div>
                    )}

                    {activeTitleIdx === 3 && !videoPaused[3] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-4 left-4 bg-black/85 text-[#FAF9F5] font-mono text-[9px] tracking-widest uppercase py-2 px-4 rounded-none border border-white/10 backdrop-blur-md z-30 pointer-events-none"
                      >
                        video 3 : hair puppet
                      </motion.div>
                    )}
                  </div>

                  {/* Video 4 (hand's puppet) - Row 3, Right Column */}
                  <div 
                    className="col-span-1 row-span-1 relative overflow-hidden select-none cursor-pointer"
                    onPointerDown={() => {
                      setActiveTitleIdx(4);
                    }}
                    onPointerUp={() => setActiveTitleIdx(null)}
                    onPointerEnter={() => {
                      setActiveTitleIdx(4);
                    }}
                    onPointerLeave={() => {
                      setActiveTitleIdx(null);
                    }}
                    onClick={() => togglePlayPause(4, videoRef4)}
                  >
                    <motion.div
                      animate={{ scale: activeTitleIdx === 4 ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-full h-full origin-center"
                    >
                      <video
                        ref={videoRef4}
                        src="https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/4.layering-tangan-resize.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </motion.div>

                    {/* Creative Custom Pause Overlay */}
                    {videoPaused[4] && (
                      <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-[1.5px] flex flex-col items-center justify-center z-20">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-[#0c0c0c] p-3.5 rounded-none border border-white/10 flex flex-col items-center justify-center shadow-2xl relative min-w-[110px]"
                        >
                          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#F05C3B]" />
                          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#F05C3B]" />
                          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#F05C3B]" />
                          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#F05C3B]" />

                          <CreativePlayPauseIcon isPaused={true} />
                          <span className="text-[#FAF9F5] font-mono text-[7px] uppercase tracking-widest mt-1.5 px-1">PAUSED</span>
                        </motion.div>
                      </div>
                    )}

                    {activeTitleIdx === 4 && !videoPaused[4] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-4 left-4 bg-black/85 text-[#FAF9F5] font-mono text-[9px] tracking-widest uppercase py-2 px-4 rounded-none border border-white/10 backdrop-blur-md z-30 pointer-events-none"
                      >
                        video 4 : hand puppet
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              <CreativeProcess projectIndex={projectIndex} />
            </>
          )}

          {/* --- INTERACTIVE 2: SCARY SWEETHEART --- */}
          {projectIndex === 1 && (
              <div className="w-full flex flex-col animate-fade-in">
                {/* Pad character lineup layout and headers specifically */}
                <div className="p-6 md:p-10 lg:p-14 pt-0">
                  <div className="flex flex-col gap-16 lg:gap-20">
                    
                    {/* Row 1: Character Concept Art */}
                    <div className="flex flex-col gap-8">
                      {/* Character Concept Text */}
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4.5">
                          <span className="font-mono text-[9px] text-[#F05C3B] uppercase tracking-widest block">CREATIVE FOCUS 01</span>
                          <span className="font-mono text-[8px] text-[#F05C3B] uppercase tracking-widest font-semibold bg-[#F05C3B]/10 px-2 py-0.5 rounded">DESIGNER</span>
                        </div>
                        <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-3">
                          Character Concept Art
                        </h3>
                        <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text">
                          As the character designer, my goal was to create a memorable cast whose personalities instantly resonate with the readers. I translated their distinct traits through expressive gestures, unique outfits, and signature hairstyles.
                        </p>
                      </div>

                      {/* Concept Characters - Dynamic Flex Accordion with Smooth Width Transitions */}
                      <div className="relative flex rounded-none overflow-hidden border-y border-[#E5E2DC] bg-[#fbfbf8]/40 divide-x divide-[#E5E2DC] -mx-6 md:-mx-10 lg:-mx-14 w-[calc(100%+3rem)] md:w-[calc(100%+5rem)] lg:w-[calc(100%+7rem)] items-stretch mt-4 select-none aspect-[1.1/1] sm:aspect-[1.5/1] md:aspect-[1.9/1] lg:aspect-[2.2/1] min-h-[380px]">
                        
                        {/* Character Lineup Height Ruler / Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-10 font-mono">
                          {Array.from({ length: 23 }, (_, idx) => 200 - idx * 10).map((h) => {
                            const topPct = ((200 - h) / 220) * 100;
                            const isMajor = h === 0 || h === 100 || h === 200;
                            const isEvery20cm = h % 20 === 0;
                            const getFtIn = (cm: number) => {
                              const isNeg = cm < 0;
                              const absCm = Math.abs(cm);
                              const totalInches = Math.round(absCm / 2.54);
                              const feet = Math.floor(totalInches / 12);
                              const inches = totalInches % 12;
                              return `${isNeg ? "-" : ""}${feet}'${inches}"`;
                            };
                            
                            // Show text labels for major milestones and every 20cm to avoid visual clutter
                            const showLabel = h % 20 === 0;

                            return (
                              <div 
                                key={h} 
                                className="absolute inset-x-0 flex items-center transition-all duration-300 pointer-events-none"
                                style={{ top: `${topPct}%` }}
                              >
                                {/* Horizontal Line with subtle color */}
                                <div className={`w-full border-t relative ${isEvery20cm ? "border-solid border-[#E5E2DC]" : "border-dashed border-[#E5E2DC]/30"}`}>
                                  {/* Ticks across the line for authentic blueprint aesthetic - updated for 6-columns distribution */}
                                  <span className={`absolute left-[16.6%] top-1/2 -translate-y-1/2 w-[1px] ${isEvery20cm ? "h-1.5 bg-[#E5E2DC]" : "h-1 bg-[#E5E2DC]/30"}`} />
                                  <span className={`absolute left-[33.3%] top-1/2 -translate-y-1/2 w-[1px] ${isEvery20cm ? "h-1.5 bg-[#E5E2DC]" : "h-1 bg-[#E5E2DC]/30"}`} />
                                  <span className={`absolute left-[50%] top-1/2 -translate-y-1/2 w-[1px] ${isEvery20cm ? "h-1.5 bg-[#E5E2DC]" : "h-1 bg-[#E5E2DC]/30"}`} />
                                  <span className={`absolute left-[66.6%] top-1/2 -translate-y-1/2 w-[1px] ${isEvery20cm ? "h-1.5 bg-[#E5E2DC]" : "h-1 bg-[#E5E2DC]/30"}`} />
                                  <span className={`absolute left-[83.3%] top-1/2 -translate-y-1/2 w-[1px] ${isEvery20cm ? "h-1.5 bg-[#E5E2DC]" : "h-1 bg-[#E5E2DC]/30"}`} />
                                </div>
                                
                                {showLabel && (
                                  <>
                                    {/* Right height badge with beautiful styling */}
                                    <span className={`absolute right-2.5 font-mono text-[7px] md:text-[8px] px-1 py-0.5 rounded-xs border shadow-3xs transition-all ${
                                      isMajor 
                                        ? "text-[#F05C3B] bg-white border-[#F05C3B]/20 font-medium" 
                                        : "text-[#AE9E8E] bg-[#fbfbf8]/95 border-[#E5E2DC]/40"
                                    }`}>
                                      {h}cm <span className="opacity-50 text-[6px] md:text-[7px]">/ {getFtIn(h)}</span>
                                    </span>
                                  </>
                                )}
                              </div>
                            );
                          })}

                          {/* Extra subtle grid paper overlay lines for professional blueprint look */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49.5%,rgba(229,226,220,0.12)_50%,transparent_50.5%)] bg-[size:20px_20px]" />
                        </div>

                        {[
                          "1_01.webp",
                          "1_02.webp",
                          "1_03.webp",
                          "1_04.webp",
                          "1_05.webp",
                          "1_06.webp"
                        ].map((filename, index) => {
                          const isHovered = hoveredMoodboardIdx === index;
                          const isAnyHovered = hoveredMoodboardIdx !== null;
                          
                          return (
                            <div 
                              key={index}
                              onMouseEnter={() => setHoveredMoodboardIdx(index)}
                              onMouseLeave={() => setHoveredMoodboardIdx(null)}
                              onTouchStart={(e) => {
                                e.stopPropagation();
                                setHoveredMoodboardIdx(index);
                              }}
                              className={`relative overflow-hidden cursor-pointer h-full transition-[flex] duration-300 ease-in-out ${
                                isHovered ? "z-20" : "z-0"
                              } ${
                                !isAnyHovered 
                                  ? "flex-1" 
                                  : isHovered 
                                    ? "flex-[1.8]" 
                                    : "flex-[0.84]"
                              }`}
                            >
                              <div className="w-full h-full relative">
                                {/* Original Concept Sketch Image (Remains fully visible underneath, to be overwritten by the triggered image) */}
                                <img
                                  src={`https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/DESIGN%20CHARACTER/${filename}`}
                                  alt={`Character Concept ${index + 1}`}
                                  referrerPolicy="no-referrer"
                                  loading="eager"
                                  className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                                />
                                
                                {/* Triggered Moodboard/Research Image in adaptive layout (Fades in when hovered/touched, completely fills the frame) */}
                                <img
                                  src={moodboardImages[index].url}
                                  alt={moodboardImages[index].name}
                                  referrerPolicy="no-referrer"
                                  loading="eager"
                                  className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ease-in-out pointer-events-none"
                                  style={{ opacity: isHovered ? 1 : 0 }}
                                />

                                {/* Subtle label overlay identifying character when not active */}
                                <div className={`absolute bottom-3 left-0 right-0 text-center font-mono text-[7px] uppercase tracking-widest text-[#AE9E8E] transition-opacity duration-300 pointer-events-none ${
                                  isHovered ? "opacity-0" : "opacity-100"
                                }`}>
                                  {moodboardImages[index].name.split(" ")[0]}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Newly merged Creative Focus section - layout & animation like on the process-sample 1 page */}
                <Sample2Process />
              </div>
            )}

            {/* --- INTERACTIVE 3: DEADLINER GAME ASSET GRID GALLERY --- */}
            {projectIndex === 2 && (
              <div className="w-full flex flex-col animate-fade-in p-6 md:p-10 lg:p-14 pt-0">
                {/* Custom back and forth cinematic panning style */}
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes slow-bg-pan-cinematic {
                    0% { transform: scale(1.4) translate(-14%, 0%); }
                    50% { transform: scale(1.4) translate(14%, 0%); }
                    100% { transform: scale(1.4) translate(-14%, 0%); }
                  }
                  .animate-cinematic-pan {
                    animation: slow-bg-pan-cinematic 56s ease-in-out infinite;
                  }
                `}} />

                <div className="relative w-[calc(100%+3rem)] md:w-[calc(100%+5rem)] lg:w-[calc(100%+7rem)] -mx-6 md:-mx-10 lg:-mx-14 border-y border-[#E5E2DC] overflow-hidden bg-[#E5E2DC] gap-[1px] grid grid-cols-1 md:grid-cols-12 md:grid-rows-[680px_480px] select-none">
                  {/* Image 1: Column start 1, span 3, row span 1 */}
                  <div 
                    onClick={() => setIsTopLeftClicked(!isTopLeftClicked)}
                    className="md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-2 h-[580px] md:h-full relative overflow-hidden group/scene bg-[#FAF9F5] cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out" 
                      style={{ opacity: isTopLeftClicked ? 0 : 1, zIndex: isTopLeftClicked ? 0 : 1 }}
                    >
                      <img 
                        src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/aset/desain%20karakter%201.1.webp"
                        alt="Dudung Character Concept"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                      />
                    </div>
                    <div 
                      className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out" 
                      style={{ opacity: isTopLeftClicked ? 1 : 0, zIndex: isTopLeftClicked ? 1 : 0 }}
                    >
                      <img 
                        src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/desain%20karakter%201.2.webp"
                        alt="Dudung Character Final Design"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                      />
                    </div>
                    {/* Caption Pill */}
                    <div className="absolute bottom-4 left-4 bg-[#161616]/95 border border-[#E5E2DC]/10 px-3 py-1.5 rounded text-[10px] font-mono tracking-wider text-white uppercase shadow-md select-none transition-all duration-300 z-10">
                      <span className="text-[#F05C3B] font-bold mr-1.5">&#9670;</span>
                      {isTopLeftClicked ? "final design by 090ucu" : "concept character by kupi cake"}
                    </div>
                  </div>

                  {/* Image 3: Column start 4, span 9, row span 1 */}
                  <div className="md:col-start-4 md:col-end-13 md:row-start-1 md:row-end-2 h-[480px] md:h-full relative overflow-hidden group/scene bg-[#FAF9F5]">
                    {topRightImages.map((src, idx) => (
                      <div 
                        key={idx}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{ 
                          opacity: currentTopRightIdx === idx ? 1 : 0, 
                          zIndex: currentTopRightIdx === idx ? 1 : 0 
                        }}
                      >
                        <img 
                          src={src} 
                          alt={`Deadliner Stylising Progression Stage ${idx}`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {/* Stage Pill */}
                    <div className="absolute top-4 right-4 bg-[#161616]/95 border border-[#E5E2DC]/10 px-3 py-1.5 rounded text-[9px] font-mono tracking-wider text-white uppercase shadow-md select-none flex items-center gap-1.5 z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F05C3B] animate-pulse" />
                      <span>{
                        currentTopRightIdx === 0 ? "1. concept" :
                        currentTopRightIdx === 1 ? "2. lineart" :
                        currentTopRightIdx === 2 ? "3. base color" :
                        currentTopRightIdx === 3 ? "4. shading" : "5. lighting"
                      }</span>
                    </div>
                  </div>

                  {/* Image 4 (Represented as Image 2 in sequence visually): Column start 1, span 12, row span 1 */}
                  <div className="md:col-start-1 md:col-end-13 md:row-start-2 md:row-end-3 h-[360px] md:h-full relative overflow-hidden group/scene bg-[#FAF9F5]">
                    <img 
                      src={deadlinerAssets[3].url} 
                      alt={deadlinerAssets[3].name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover origin-center animate-cinematic-pan"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PREVIOUS / NEXT FOOTER ROW */}
          <div className="bg-[#FAF9F5] border-b border-[#E5E2DC] py-2 lg:py-4 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E5E2DC] justify-stretch">
            <button
              onClick={onPrev}
              className="flex-1 p-6 md:p-8 flex flex-col items-start hover:bg-[#F3F1EC] transition-all bg-transparent group cursor-pointer text-left"
            >
              <span className="font-mono text-[8px] md:text-[9px] text-[#AE9E8E] uppercase tracking-widest block mb-1.5 mb-2 transition-transform group-hover:-translate-x-1">
                [ ⟵ PREV CASE STUDY ]
              </span>
              <span className="font-sans text-lg md:text-xl font-normal tracking-tight text-[#161616]">
                Go back to previous project details.
              </span>
            </button>

            <button
              onClick={onNext}
              className="flex-1 p-6 md:p-8 flex flex-col items-end hover:bg-[#F3F1EC] transition-all bg-transparent group cursor-pointer text-right"
            >
              <span className="font-mono text-[8px] md:text-[9px] text-[#F05C3B] uppercase tracking-widest block mb-1.5 mb-2 transition-transform group-hover:translate-x-1">
                [ NEXT CASE STUDY ⟶ ]
              </span>
              <span className="font-sans text-lg md:text-xl font-normal tracking-tight text-[#161616]">
                Navigate forward to next work.
              </span>
            </button>
          </div>

          {/* BACK TO PORTFOLIO ACTION BLOCK */}
          <div className="bg-[#FAF9F5] py-24 px-8 md:px-16 flex flex-col justify-center items-center text-center">
            <div className="w-1.5 h-1.5 bg-[#F05C3B] rounded-full animate-bounce mb-6" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#AE9E8E] uppercase mb-3 block select-none">
              STUDIO ENDINGS
            </span>
            <h2 className="text-2xl md:text-4xl font-normal leading-tight tracking-tight text-[#161616] max-w-lg mb-8">
              Want to see more curated design explorations?
            </h2>
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-5 px-8 py-3.5 rounded-full border-2 border-[#161616] hover:bg-[#161616] hover:text-white transition-all duration-300 text-xs md:text-sm tracking-widest font-bold text-[#161616] bg-transparent cursor-pointer uppercase"
            >
              <span>Back To Main Grid Portfolio</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

        </div>

        {/* Right column margin */}
        <div className="bg-[#FAF9F5] min-h-screen col-start-3 col-end-4 row-start-1 flex flex-col justify-between py-12 items-center text-[#8c8275] border-l border-[#E5E2DC]/30">
          <div className="text-[10px] font-mono tracking-widest uppercase -rotate-90 origin-right -translate-x-3 text-right mt-14 whitespace-nowrap">
            GRID EDITION // © 2026
          </div>
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E2DC] hover:border-[#F05C3B] hover:text-[#F05C3B] transition-colors cursor-pointer"
            title="Return to home grid"
          >
            ←
          </button>
        </div>

      </div>
    </div>
  );
}
