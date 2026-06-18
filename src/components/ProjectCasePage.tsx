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
  ChevronRight
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
              <span key={i}>
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
                    loading="lazy"
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
  { w: "imagination—doing", h: true },
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
  { w: "rediscovery.", h: true },
  { w: "When", h: false },
  { w: "I", h: false },
  { w: "finally", h: false },
  { w: "create,", h: true },
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
  { w: "in.", h: true },
];

const conceptWordsSweetheart = [
  { w: "The", h: false },
  { w: "story", h: false },
  { w: "follows", h: false },
  { w: "Avi", h: true },
  { w: "Sina,", h: true },
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
  { w: "mysterious,", h: true },
  { w: "intimidating", h: true },
  { w: "boy", h: true },
  { w: "who", h: false },
  { w: "secretly", h: false },
  { w: "harbors", h: false },
  { w: "feelings", h: true },
  { w: "for", h: false },
  { w: "her.", h: false },
  { w: "This", h: false },
  { w: "unexpected", h: true },
  { w: "encounter", h: false },
  { w: "sparks", h: false },
  { w: "a", h: false },
  { w: "chaotic", h: true },
  { w: "and", h: false },
  { w: "heartwarming", h: true },
  { w: "new", h: false },
  { w: "chapter", h: false },
  { w: "in", h: false },
  { w: "their", h: false },
  { w: "school", h: false },
  { w: "lives.", h: true },
];

const conceptWordsDeadliner = [
  { w: "The", h: false },
  { w: "main", h: false },
  { w: "illustration", h: false },
  { w: "depics", h: false },
  { w: "the", h: false },
  { w: "overwhelming", h: true },
  { w: "anxiety", h: true },
  { w: "and", h: false },
  { w: "manic", h: true },
  { w: "energy", h: true },
  { w: "of", h: false },
  { w: "academic", h: false },
  { w: "deadline", h: true },
  { w: "struggles.", h: true },
  { w: "It", h: false },
  { w: "follows", h: false },
  { w: "Dudung,", h: true },
  { w: "a", h: false },
  { w: "sleep-deprived,", h: true },
  { w: "optimistic", h: false },
  { w: "perfectionist", h: false },
  { w: "student,", h: false },
  { w: "dodging", h: false },
  { w: "obstacles,", h: false },
  { w: "chasing", h: false },
  { w: "late-night", h: false },
  { w: "espresso", h: true },
  { w: "boosts,", h: false },
  { w: "and", h: false },
  { w: "racing", h: false },
  { w: "frantically", h: false },
  { w: "against", h: false },
  { w: "ticking", h: true },
  { w: "hours", h: true },
  { w: "to", h: false },
  { w: "conquer", h: false },
  { w: "his", h: false },
  { w: "final", h: false },
  { w: "thesis", h: true },
  { w: "before", h: false },
  { w: "exhaustion", h: true },
  { w: "strikes.", h: true },
];

const pipelineWords = [
  { w: "The", h: false },
  { w: "production", h: true },
  { w: "workflow", h: false },
  { w: "is", h: false },
  { w: "broken", h: false },
  { w: "down", h: false },
  { w: "into", h: false },
  { w: "six", h: true },
  { w: "distinct", h: false },
  { w: "stages,", h: true },
  { w: "tracing", h: false },
  { w: "the", h: false },
  { w: "evolution", h: true },
  { w: "from", h: false },
  { w: "abstract", h: true },
  { w: "thought", h: false },
  { w: "to", h: false },
  { w: "kinetic", h: true },
  { w: "canvas.", h: true },
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

  // Case 3: Deadliner
  const [thesisProgress, setThesisProgress] = useState(0);
  const [dudungState, setDudungState] = useState<"running" | "jumping" | "boosting" | "graduated">("running");
  const [dudungLives, setDudungLives] = useState(3);
  const [score, setScore] = useState(0);
  const [activeObstacle, setActiveObstacle] = useState("Buggy Code");
  const [gameLog, setGameLog] = useState<string[]>([
    "Dudung is drinking cold coffee and starting chapters...",
  ]);

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

  // Case 3 game routines
  const doThesisStep = () => {
    if (thesisProgress >= 100) return;
    setThesisProgress((p) => {
      const next = p + Math.floor(Math.random() * 16) + 12;
      if (next >= 100) {
        setDudungState("graduated");
        setScore((s) => s + 500);
        setGameLog((prev) => [
          "🎓 THESIS SUBMITTED! Dudung gets a perfect GPA! Confetti rain!",
          ...prev,
        ]);
        return 100;
      }
      return next;
    });

    setScore((s) => s + 85);
    setDudungState("boosting");
    setTimeout(() => setDudungState("running"), 600);

    const logStatements = [
      "Dudung refitted the introduction paragraph in true academic prose.",
      "Added 4 scientific-sounding citations to look extremely wise.",
      "Fixed alignment of Table 4.3 using pixel margins.",
      "Rewrote the methodology chapter. Pure scientific brilliance!",
    ];
    const item = logStatements[Math.floor(Math.random() * logStatements.length)];
    setGameLog((prev) => [item, ...prev]);
  };

  const handleJump = () => {
    if (dudungState === "graduated" || dudungState === "jumping") return;
    setDudungState("jumping");
    setScore((s) => s + 50);

    // Obstacle calculation
    const isSuccess = Math.random() > 0.15;
    if (isSuccess) {
      setGameLog((prev) => [
        `✨ Leap! Dudung successfully jumped over [${activeObstacle}] like a true scholar!`,
        ...prev,
      ]);
    } else {
      setDudungLives((l) => {
        const nextLives = l > 1 ? l - 1 : 3;
        if (nextLives === 3) {
          setThesisProgress(0);
          setScore(0);
          setGameLog((prev) => [
            "💔 Fatal Exception! Thesis corrupted! Restarting draft from scratch...",
            ...prev,
          ]);
        } else {
          setGameLog((prev) => [
            `💥 Ouch! Dudung walked into [${activeObstacle}]. Lost 1 life. Caffeine crash!`,
            ...prev,
          ]);
        }
        return nextLives;
      });
    }

    setTimeout(() => {
      setDudungState("running");
      const obstacles = [
        "Buggy Code",
        "Coffee shortage",
        "Printer Jam",
        "Anxiety attack",
        "Sudden Windows Update",
        "Peer-review rejection",
      ];
      setActiveObstacle(obstacles[Math.floor(Math.random() * obstacles.length)]);
    }, 850);
  };

  const handleDrinkCoffee = () => {
    setCoffeeCups((c) => c + 1);
    setDudungState("boosting");
    setScore((s) => s + 20);
    setGameLog((prev) => [
      "☕ Double Espresso activated! CPU ticking speed doubled!",
      ...prev,
    ]);
    setTimeout(() => setDudungState("running"), 1000);
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
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover blur-[8px] transition-transform duration-100 ease-out brightness-95"
                  style={{
                    transform: `translateY(${currentScroll * 0.15}px) scale(1.15)`,
                    transformOrigin: "center center",
                  }}
                />
                
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
                      loading="lazy"
                      alt={`${project.title} Character Foreground`}
                      className="h-[105%] w-auto object-contain object-bottom scale-[1.08] origin-bottom transition-all duration-1000 ease-out"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Background Image with Parallax for simple full designs */}
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-100 ease-out"
                  style={{
                    transform: `translateY(${currentScroll * 0.15}px) scale(1.15)`,
                    transformOrigin: "center center",
                  }}
                />
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
                  <>
                    <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-4">
                      The Core Concept & Creative Motivation
                    </h3>
                    <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text whitespace-pre-line">
                      {project.description}
                    </p>
                  </>
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
                  <span key={i}>
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
          </div>

          {/* DYNAMIC CASE SHOWCASE HUB (05) */}
          <div className={`w-full bg-[#FAF9F5] border-b border-[#E5E2DC] ${projectIndex === 0 ? "p-0" : "p-6 md:p-10 lg:p-14"}`}>
            {projectIndex !== 0 ? (
              <>
                <span className="font-mono text-[9px] text-[#F05C3B] uppercase tracking-widest block mb-4.5">
                  {projectIndex === 1 ? "05 // CREATIVE CONTRIBUTION" : "05 // INTERACTIVE METAPHOR EXPLORER"}
                </span>
                <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-3">
                  {projectIndex === 1 && "Visual Development & Comic Craft"}
                  {projectIndex === 2 && "Dudung Thesis Sprint Simulator"}
                </h3>
                <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text mb-10">
                  {projectIndex === 1 && "Key contributions as Character Designer, Cover Artist, and Storyboarder."}
                  {projectIndex === 2 && "A retro interactive debugger dashboard showing play states & levels."}
                </p>
              </>
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
              <div className="w-full flex flex-col gap-16 lg:gap-24 animate-fade-in">
                {/* Stacked Grid Layout (Alternate Column Order on Large Screens) */}
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

                    {/* Concept Characters - One Row Grid with No Gap */}
                    <div className="grid grid-cols-5 border-y border-[#E5E2DC] bg-[#fbfbf8]/40 rounded-none overflow-hidden divide-x divide-[#E5E2DC] -mx-6 md:-mx-10 lg:-mx-14 w-[calc(100%+3rem)] md:w-[calc(100%+5rem)] lg:w-[calc(100%+7rem)] items-end mt-4">
                      {[
                        "Character-Concept_01.webp",
                        "Character-Concept_02.webp",
                        "Character-Concept_03.webp",
                        "Character-Concept_04.webp",
                        "Character-Concept_05.webp"
                      ].map((filename, index) => (
                        <div 
                          key={index} 
                          className="w-full aspect-[3/8] relative group/visual overflow-hidden"
                        >
                          <img
                            src={`https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/Concept%20Character-convert/${filename}`}
                            alt={`Character Concept ${index + 1}`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/visual:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-[1px] bg-[#E5E2DC]/50" />

                  {/* Row 2: Cover Design & Composition (Alternated: Media on Left for Desktop) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* Cover Design Visual (Cols 1-7 on Large, Order 1 on Mobile, but Order 2 on Large handled by grid ordering) */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#E5E2DC] bg-[#fbfbf8] relative group/visual shadow-3xs hover:shadow-2xs transition-all duration-500">
                        <img
                          src={project.image}
                          alt="Cover Design & Composition"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/visual:scale-102"
                        />
                      </div>
                    </div>

                    {/* Cover Design Text (Cols 8-12, Order 1 on Mobile, Order 2 on Large) */}
                    <div className="lg:col-span-5 order-1 lg:order-2">
                      <div className="flex items-center gap-3 mb-4.5">
                        <span className="font-mono text-[9px] text-[#F05C3B] uppercase tracking-widest block">CREATIVE FOCUS 02</span>
                        <span className="font-mono text-[8px] text-[#F05C3B] uppercase tracking-widest font-semibold bg-[#F05C3B]/10 px-2 py-0.5 rounded">DIRECTOR</span>
                      </div>
                      <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-3">
                        Cover Design & Composition
                      </h3>
                      <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text">
                        In designing the main cover, the challenge was to encapsulate the entire narrative essence within a single, compelling frame. I opted for a high-angle shot (POV), dynamic composition. This perspective not only emphasizes the characters' body language clearly but also creates an engaging, unambiguous focal point that draws potential readers in.
                      </p>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-[1px] bg-[#E5E2DC]/50" />

                  {/* Row 3: Storyboarding */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* Storyboard Text (Cols 1-5) */}
                    <div className="lg:col-span-5 order-1">
                      <div className="flex items-center gap-3 mb-4.5">
                        <span className="font-mono text-[9px] text-[#F05C3B] uppercase tracking-widest block">CREATIVE FOCUS 03</span>
                        <span className="font-mono text-[8px] text-[#F05C3B] uppercase tracking-widest font-semibold bg-[#F05C3B]/10 px-2 py-0.5 rounded">STORYBOARD</span>
                      </div>
                      <h3 className="font-sans text-xl md:text-2xl font-light leading-snug text-[#161616] mb-3">
                        Storyboarding
                      </h3>
                      <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text">
                        As the storyboard artist, I was responsible for the visual pacing and narrative flow. I carefully structured the panel transitions to ensure a seamless, engaging reading experience, translating the script into a dynamic visual guide that guides the reader’s emotions from panel to panel.
                      </p>
                    </div>

                    {/* Storyboard Visual (Cols 6-12) */}
                    <div className="lg:col-span-7 order-2">
                      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#E5E2DC] bg-[#fbfbf8] relative group/visual p-6 flex items-center justify-center shadow-3xs hover:shadow-2xs transition-all duration-500">
                        <img
                          src={project.foregroundImage}
                          alt="Storyboard Character Focus"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="h-[95%] w-auto object-contain object-bottom transition-transform duration-700 ease-out group-hover/visual:scale-103"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* --- INTERACTIVE 3: DEADLINER --- */}
            {projectIndex === 2 && (
              <div className="w-full bg-[#1e1329] rounded-2xl border border-purple-900/40 p-6 lg:p-12 text-[#E6D3E3]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Gameplay Canvas Screen representation */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    
                    {/* Header Debug Panel */}
                    <div className="flex justify-between items-center text-xs font-mono border-b border-purple-800/20 pb-2 bg-black/30 p-3 rounded-lg shadow-inner shrink-0 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <span className="text-red-400 font-bold uppercase tracking-wider">DEADLINER_BUILD_v0.3A</span>
                      </div>
                      <div className="flex gap-2">
                        <span>HP: {dudungLives}/3</span>
                        <span>SCORE: {score}</span>
                      </div>
                    </div>

                    {/* Pixel Arena Display */}
                    <div className="my-5 flex-grow aspect-video bg-black/80 rounded-2xl border-2 border-purple-800/40 p-5 flex flex-col justify-between relative overflow-hidden select-none">
                      <div className="absolute inset-0 opacity-5 pointer-events-none bg-radial-gradient from-purple-500 to-transparent" />
                      
                      {/* Sub-level coordinates */}
                      <span className="absolute top-2.5 right-3.5 font-mono text-[8px] text-purple-400 tracking-widest uppercase">
                        LEVEL 1-2 // THE LIBRARY SPRINT
                      </span>

                      {/* Active Action Object indicator */}
                      {dudungState !== "graduated" && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-purple-900/70 border border-purple-500/30 rounded-full font-mono text-[9px] uppercase tracking-widest text-[#FAF9F5]">
                          <span>OBSTACLE APPROACHING: </span>
                          <span className="font-extrabold text-[#F05C3B] animate-pulse">{activeObstacle}</span>
                        </div>
                      )}

                      {/* Dudung Render State Character block */}
                      <div className="flex-grow flex items-center justify-center relative">
                        {/* Graduated Screen */}
                        {dudungState === "graduated" ? (
                          <div className="text-center flex flex-col justify-center items-center gap-3 py-4 animate-scale-up">
                            <Award className="w-14 h-14 text-yellow-400 animate-bounce" />
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">DUDUNG COMPLETED THESIS!</h3>
                            <button
                              onClick={() => {
                                setThesisProgress(0);
                                setScore(0);
                                setDudungState("running");
                                setGameLog(["Restarted progress simulator cleanly!"]);
                              }}
                              className="py-1.5 px-4.5 bg-[#F05C3B] text-black text-[10px] font-mono uppercase font-black rounded hover:bg-opacity-95 transition-all cursor-pointer"
                            >
                              Reset thesis sprint
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            
                            {/* Dudung Character Avatar Box */}
                            <div 
                              className={`w-20 h-20 bg-purple-300 border-2 border-purple-950 rounded-xl flex items-center justify-center relative transition-all duration-300 ${
                                dudungState === "jumping" 
                                  ? "-translate-y-16 scale-95 border-b-6" 
                                  : dudungState === "boosting"
                                  ? "skew-x-12 scale-105 border-l-4"
                                  : "translate-y-0"
                              }`}
                            >
                              <User className="w-10 h-10 text-purple-950" />
                              
                              {/* Caffeine overlay bolt */}
                              {dudungState === "boosting" && (
                                <span className="absolute -top-3 -right-2 bg-[#F05C3B] text-black p-0.5 rounded shadow-xs text-[8px] font-mono font-bold uppercase tracking-wider animate-bounce">
                                  COFFEE!
                                </span>
                              )}
                            </div>

                            {/* State Label */}
                            <span className="font-mono text-[9px] uppercase text-purple-400 mt-2 font-bold select-none">[ {dudungState} ]</span>
                          </div>
                        )}
                      </div>

                      {/* Floor Platform ground line */}
                      <div className="w-full h-1 bg-purple-950 border-t border-purple-400 shrink-0" />
                    </div>

                    {/* Progress sliders meter */}
                    <div className="shrink-0 space-y-1.5 select-none bg-black/25 p-3 rounded-lg border border-purple-800/10">
                      <div className="flex justify-between items-baseline font-mono text-[9px]">
                        <span>DUDUNG THESIS COMPLETION PROGRESS</span>
                        <span className="font-bold">{thesisProgress}%</span>
                      </div>
                      <div className="w-full bg-purple-950 h-3 rounded-full overflow-hidden border border-purple-700/20">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-[#F05C3B] h-full transition-all duration-[600ms]"
                          style={{ width: `${thesisProgress}%` }}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Actions & Console Output Logs logs */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[9.5px] font-mono text-purple-400 uppercase tracking-widest block mb-1">DUDUNG ENGINE INTERFACE CONTROLS</span>
                      <h4 className="text-xl md:text-2xl font-light text-white mb-4">
                        Action Keys / Debug Console
                      </h4>
                      <p className="text-[#AE9E8E] text-xs leading-relaxed mb-6">
                        Simulating level layouts inside Deadliner study. Jump over academic obstacles continuously, write code scripts, or replenish Dudung's stamina using instant coffee cups. If Dudung hits an obstacle, he will lose a life or corrupt his research!
                      </p>

                      <div className="flex flex-wrap gap-2.5 mb-6.5 shrink-0 select-none">
                        <button
                          disabled={dudungState === "graduated" || dudungState === "jumping"}
                          onClick={handleJump}
                          className="bg-[#6A5D7B] hover:bg-opacity-90 disabled:opacity-40 text-white font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest py-3 px-5 rounded-xl flex items-center gap-2.5 cursor-pointer shadow-md select-none border border-purple-600/20"
                        >
                          <Play className="w-3.5 h-3.5 stroke-[2] fill-current" />
                          <span>Leap Jump (Space)</span>
                        </button>

                        <button
                          disabled={dudungState === "graduated"}
                          onClick={doThesisStep}
                          className="bg-[#FAF9F5] hover:bg-neutral-100 disabled:opacity-40 text-[#1e1329] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest py-3 px-5 rounded-xl flex items-center gap-2.5 cursor-pointer shadow-md select-none border border-white"
                        >
                          <FileText className="w-3.5 h-3.5 stroke-[2]" />
                          <span>Write Thesis (+%)</span>
                        </button>

                        <button
                          disabled={dudungState === "graduated"}
                          onClick={handleDrinkCoffee}
                          className="bg-[#FAF9F5]/10 hover:bg-[#FAF9F5]/15 disabled:opacity-40 border border-purple-500/20 text-[#E6D3E3] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest py-3 px-5 rounded-xl flex items-center gap-2.5 cursor-pointer shadow-md select-none"
                        >
                          <Coffee className="w-3.5 h-3.5" />
                          <span>Double Coffee</span>
                        </button>
                      </div>
                    </div>

                    {/* Console Logger box */}
                    <div>
                      <span className="text-[8px] font-mono text-purple-400 uppercase tracking-wider block mb-1.5 select-none">STATION CONSOLE LOGGER:</span>
                      <div className="w-full bg-black/45 md:h-36 h-28 border border-purple-800/20 rounded-xl p-3.5 font-mono text-[9.5px] leading-relaxed text-[#dfdfd8]/85 overflow-y-auto space-y-1 bg-opacity-70 scrollbar-thin select-text">
                        {gameLog.map((log, lIdx) => (
                          <div 
                            key={lIdx} 
                            className={`flex items-start gap-1 ${
                              log.startsWith("🎓") 
                                ? "text-yellow-400 font-bold" 
                                : log.startsWith("💥") || log.startsWith("💔")
                                ? "text-red-400" 
                                : log.startsWith("✨")
                                ? "text-emerald-400"
                                : "text-neutral-400"
                            }`}
                          >
                            <span className="text-purple-600 shrink-0 select-none">&gt;&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>

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
