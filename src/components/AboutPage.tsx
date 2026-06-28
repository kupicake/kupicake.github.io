import React, { useRef, useState } from "react";
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
  Eye,
  Copy
} from "lucide-react";

interface AboutPageProps {
  onBack: () => void;
  scrollY?: number;
}

export default function AboutPage({ onBack, scrollY }: AboutPageProps) {
  const [localScrollY, setLocalScrollY] = useState(0);
  React.useEffect(() => {
    if (scrollY !== undefined) return;
    const handleScroll = () => {
      setLocalScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const currentScroll = scrollY !== undefined ? scrollY : localScrollY;

  const [windowHeight, setWindowHeight] = useState(0);
  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contactTitleRef = React.useRef<HTMLHeadingElement>(null);
  let contactTitleProgress = 0;
  if (contactTitleRef.current && windowHeight > 0) {
    const rect = contactTitleRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    contactTitleProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY))
    );
  }

  const statementRef = React.useRef<HTMLDivElement>(null);
  let statementProgress = 0;
  if (statementRef.current && windowHeight > 0) {
    const rect = statementRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.95;
    const endY = windowHeight * 0.45;
    statementProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY))
    );
  }

  let contactParallaxY = 0;
  let contactOpacity = 1;
  let isContactVisible = true;
  if (typeof document !== "undefined" && windowHeight > 0) {
    const scrollHeight = document.documentElement.scrollHeight;
    const maxScroll = scrollHeight - windowHeight;
    if (maxScroll > 0) {
      const revealRange = windowHeight + 100;
      const distanceToBottom = maxScroll - currentScroll;
      if (distanceToBottom < revealRange) {
        isContactVisible = true;
        const pct = Math.max(0, Math.min(1, distanceToBottom / revealRange));
        contactParallaxY = pct * 100; // slides up smoothly from 100px to 0px
        contactOpacity = 1 - pct;     // fades in from 0 to 1
      } else {
        isContactVisible = false;
        contactParallaxY = 100;
        contactOpacity = 0;
      }
    }
  }

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f5] font-sans text-[#1a1a1a] relative overflow-x-hidden selection:bg-[#F05C3B] selection:text-white flex flex-col">
      <div className="relative z-10 w-full bg-[#faf9f5] flex flex-col">
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
              03 // DIGITAL TOOL
            </span>
            <h2 className="font-sans text-xl md:text-2xl lg:text-3xl font-light text-[#1a1a1a] tracking-tight mb-8">
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
                  <h3 className="font-mono text-[10px] md:text-xs tracking-wider text-[#737370] uppercase font-bold mb-3">
                    {group.category}
                  </h3>
                  <ul className="space-y-1.5 font-sans text-sm md:text-base text-[#1a1a1a] font-light">
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

        </div>

        {/* Right spacer column */}
        <div className="col-start-3 col-end-4 border-l border-[#e5e5e2]/30" />
      </main>


    </div>

    {/* --- Section 4: Contact (Grid Style, matching other pages with parallax animations) --- */}
    <div
      id="contact"
      className="group/contact w-full min-h-screen lg:h-screen bg-[#E5E2DC] grid lg:grid-cols-[85px_1fr_85px] grid-cols-[55px_1fr_55px] auto-rows-auto gap-[1px] scroll-mt-[55px] lg:scroll-mt-[85px] sticky bottom-0 z-0"
      style={{
        transform: `translateY(${contactParallaxY}px)`,
        opacity: contactOpacity,
        visibility: isContactVisible ? "visible" : "hidden",
        willChange: "transform, opacity",
      }}
    >
      {/* Left Grid Margin */}
      <div className="bg-[#faf9f5] col-start-1 col-end-2 row-start-1 transition-colors duration-500" />

      {/* Center Content */}
      <div className="bg-[#faf9f5] col-start-2 col-end-3 row-start-1 pt-16 lg:pt-20 pb-0 flex flex-col justify-between items-start w-full min-h-screen lg:h-screen transition-colors duration-500">
        {/* Section Header */}
        <div className="w-full flex justify-between items-baseline px-6 md:px-12 lg:px-16 mb-4 xl:mb-6 shrink-0">
          <h2
            ref={contactTitleRef}
            className="font-bold text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase text-[#161616]"
          >
            <span
              style={{
                backgroundImage: `linear-gradient(to right, #161616 ${Math.min(100, contactTitleProgress * 100)}%, #b5b5b0 ${Math.min(100, contactTitleProgress * 100)}%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              GET IN TOUCH
            </span>
          </h2>
          <span className="font-mono text-[9px] text-[#F05C3B]/60 tracking-wider font-light uppercase hidden md:inline">
            COLLABORATION &bull; DIRECT CHANNELS
          </span>
        </div>

        {/* Bottom Statement Footer */}
        <div ref={statementRef} className="flex-[2] w-full flex justify-center items-center bg-[#faf9f5] py-12 lg:py-16 xl:py-20 px-4 sm:px-6 md:px-12 shrink-0 lg:shrink overflow-hidden">
          <div className="group/statement flex flex-col items-center justify-center w-full max-w-7xl mx-auto cursor-default select-none">
            {/* First line: LET'S + icon + WORK */}
            <div className="flex flex-row items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 font-sans text-[26px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] font-normal leading-none tracking-tight text-[#161616] whitespace-nowrap">
              <span className="text-[#b5b5b0]">“</span>
              <span
                style={{
                  backgroundImage: `linear-gradient(to right, #161616 ${Math.max(0, Math.min(100, (statementProgress * 3 - 0) * 100))}%, #b5b5b0 ${Math.max(0, Math.min(100, (statementProgress * 3 - 0) * 100))}%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                LET'S
              </span>
              
              {/* Centered kupicake icon */}
              <span className="inline-flex items-center justify-center shrink-0">
                <span className="w-8 h-8 xs:w-11 xs:h-11 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-[110px] lg:h-[110px] rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border border-[#E5E2DC] bg-white group-hover/statement:border-[#F05C3B]/60 shadow-xs group-hover/statement:scale-105">
                  <img
                    src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/LOGO%20KUPICAKE/kupicake%20putih.svg"
                    alt="Kupicake Logo"
                    className="w-full h-full object-cover translate-y-[50%] group-hover/statement:translate-y-[35%] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.1)] group-hover/statement:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </span>

              <span
                style={{
                  backgroundImage: `linear-gradient(to right, #161616 ${Math.max(0, Math.min(100, (statementProgress * 3 - 1) * 100))}%, #b5b5b0 ${Math.max(0, Math.min(100, (statementProgress * 3 - 1) * 100))}%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                WORK
              </span>
            </div>

            {/* Second line: TOGETHER */}
            <div className="mt-2 sm:mt-4 md:mt-6 font-sans text-[26px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] font-normal leading-none tracking-tight text-[#161616] whitespace-nowrap flex flex-row items-center justify-center">
              <span
                style={{
                  backgroundImage: `linear-gradient(to right, #F05C3B ${Math.max(0, Math.min(100, (statementProgress * 3 - 2) * 100))}%, #b5b5b0 ${Math.max(0, Math.min(100, (statementProgress * 3 - 2) * 100))}%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                TOGETHER
              </span>
              <span className="text-[#b5b5b0] ml-1 sm:ml-2 md:ml-3">”</span>
            </div>
            
            <div className="mt-8 md:mt-12 flex flex-col items-center gap-3">
              <span className="h-[1px] w-6 bg-[#161616]/10" />
              <span className="text-[9px] lg:text-[10px] font-light tracking-[0.4em] lg:tracking-[0.5em] text-[#737370] uppercase">
                KUPI CAKE
              </span>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[#E5E2DC] border-t border-b border-[#E5E2DC] shrink-0 lg:shrink lg:flex-1">
          {/* Box 1: Status & Info */}
          <div className="bg-[#faf9f5] hover:bg-white transition-colors duration-500 p-5 md:p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[#8a8a85] font-mono text-[10px] md:text-xs uppercase tracking-wider block mb-3">
                01 // AVAILABILITY
              </span>
              <h3 className="text-[#1a1a1a] font-normal text-xl md:text-2xl lg:text-[28px] leading-tight mb-4">
                Open for new projects and remote collaborations.
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-6">
              {/* Left: Location & Status */}
              <div className="flex flex-col gap-1 font-mono text-[10px] md:text-xs text-[#5a5957]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span className="text-[#10b981] font-bold tracking-widest uppercase">
                    YOGYAKARTA, INDONESIA
                  </span>
                </div>
                <span className="text-[#737370]">
                  [ Worldwide delivery ]
                </span>
              </div>

              {/* Right: Capabilities */}
              <div className="font-sans text-xs md:text-[13px] lg:text-sm text-[#737370] leading-relaxed text-left sm:text-right">
                <p>Branding & Visual Identity</p>
                <p>Narrative & Character Design</p>
                <p>Motion Graphics & 2D Movement</p>
              </div>
            </div>
          </div>

          {/* Box 2: Actions & Details */}
          <div className="bg-[#faf9f5] hover:bg-white transition-colors duration-500 p-5 md:p-6 lg:p-8 flex flex-col justify-between group/contact-box relative overflow-hidden">
            <div>
              <span className="text-[#8a8a85] font-mono text-[10px] md:text-xs uppercase tracking-wider block mb-3">
                02 // DIRECT INQUIRY
              </span>
              <div className="flex flex-col gap-3">
                <div className="group/email flex items-center gap-3 relative min-h-[38px]">
                  <a
                    href="mailto:riskirw17@gmail.com"
                    className="text-[#1a1a1a] hover:text-[#F05C3B] font-normal text-xl md:text-2xl lg:text-[28px] leading-tight text-left block break-all transition-colors duration-500 font-sans"
                  >
                    riskirw17@gmail.com
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigator.clipboard.writeText("riskirw17@gmail.com");
                      setEmailCopied(true);
                      setTimeout(() => setEmailCopied(false), 2000);
                    }}
                    className="p-1.5 rounded-full hover:bg-[#F05C3B]/10 text-[#737370] hover:text-[#F05C3B] cursor-pointer opacity-0 group-hover/email:opacity-100 focus:opacity-100 transition-all duration-300 flex items-center justify-center shrink-0 border border-[#E5E2DC]"
                    title="Copy email to clipboard"
                  >
                    {emailCopied ? (
                      <span className="text-xs font-mono text-[#F05C3B] uppercase tracking-wider animate-pulse whitespace-nowrap px-1">
                        copied!
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                <div className="group/phone flex items-center gap-3 relative min-h-[30px]">
                  <a
                    href="https://wa.me/6289673731449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#737370] hover:text-[#F05C3B] font-normal text-lg md:text-xl lg:text-[22px] leading-tight block transition-colors duration-500 font-sans"
                  >
                    +62 896 7373 1449
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigator.clipboard.writeText("+6289673731449");
                      setPhoneCopied(true);
                      setTimeout(() => setPhoneCopied(false), 2000);
                    }}
                    className="p-1.5 rounded-full hover:bg-[#F05C3B]/10 text-[#737370] hover:text-[#F05C3B] cursor-pointer opacity-0 group-hover/phone:opacity-100 focus:opacity-100 transition-all duration-300 flex items-center justify-center shrink-0 border border-[#E5E2DC]"
                    title="Copy phone number to clipboard"
                  >
                    {phoneCopied ? (
                      <span className="text-[10px] font-mono text-[#F05C3B] uppercase tracking-wider animate-pulse whitespace-nowrap px-1">
                        copied!
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center w-full mt-8 flex-wrap gap-4 z-10 relative">
              {/* Social Links on Left */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/kupicake_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#e5e5e2] flex items-center justify-center text-[#5a5957] hover:text-[#F05C3B] hover:border-[#F05C3B] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://vgen.co/kupicake_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#e5e5e2] flex items-center justify-center text-[#5a5957] hover:text-[#F05C3B] hover:border-[#F05C3B] transition-all duration-300 p-1.5"
                  aria-label="VGen"
                >
                  <img
                    src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/LOGO%20KUPICAKE/VGen%20Badge%20-%20outline.webp"
                    alt="VGen"
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/riskirw17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#e5e5e2] flex items-center justify-center text-[#5a5957] hover:text-[#F05C3B] hover:border-[#F05C3B] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* Back to Portfolio on Right */}
              <button
                onClick={onBack}
                className="font-mono text-[10px] uppercase tracking-widest font-bold border border-[#1a1a1a]/15 hover:border-[#1a1a1a] hover:bg-black/5 px-8 py-3.5 rounded-full transition-all duration-300 bg-transparent cursor-pointer text-center"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credit Footer inside Get In Touch */}
        <div className="w-full py-4 px-6 md:px-12 lg:px-16 bg-[#faf9f5] flex justify-between items-center shrink-0 font-mono text-[9px] tracking-wider uppercase text-[#737370] transition-colors duration-500">
          <span>© {new Date().getFullYear()} KUPI CAKE</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>

      {/* Right Grid Margin */}
      <div className="bg-[#faf9f5] col-start-3 col-end-4 row-start-1 transition-colors duration-500" />
    </div>
    </div>
  );
}
