import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import Lenis from "lenis";

const ProjectCasePage = lazy(() => import("./components/ProjectCasePage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
import {
  Dribbble,
  Instagram,
  Play,
  Linkedin,
  Menu,
  X,
  Figma,
  PenTool,
  Box,
  Palette,
  Sparkles,
  Film,
  ArrowUpRight,
  Github,
  Layers,
  Paintbrush,
  BookOpen,
  Video,
  MapPin,
  MessageCircle,
} from "lucide-react";

const getPathForIndex = (index: number) => {
  if (index === 0) return "/case-1-procrastination";
  if (index === 1) return "/case-2-scary-sweetheart";
  if (index === 2) return "/case-3-deadliner";
  return "/";
};

const getIndexForPath = (path: string) => {
  const p = path.toLowerCase().replace(/\/$/, "");
  if (p.includes("case-1-procrastination")) return 0;
  if (p.includes("case-2-scary-sweetheart")) return 1;
  if (p.includes("case-3-deadliner")) return 2;
  return -1;
};

const projectSamples = [
  {
    num: "01",
    title: "PROCRASTINATION",
    category: "BRAND IDENTITY • YOGYAKARTA, INDONESIA",
    subtitle: "Brand identity, creative direction and dynamic illustration art",
    description: "o\tAbout the Project This project is dedicated to myself and my family, who have always supported me. It serves as a personal showcase, bridging emotional storytelling with motion art to express my identity as a creator.\n\no\tThe Concept The main illustration features a tired young man escaping into his imagination—doing anything but working. This reflects my own creative process: a journey of overthinking and self-doubt, which ultimately leads to rediscovery. When I finally create, I find myself again, shaping the world I want to live in.",
    role: "CONCEPT ARTIST, ILLUSTRATOR, ANIMATOR",
    roleDesc: "CORE ROLES",
    client: "SELF PROJECT",
    clientDesc: "PERSONAL EXPLORATION",
    palette: ["#212327", "#F4F3EF", "#D19875"],
    paletteNames: ["Dark Obsidian", "Warm Alabaster", "Ochre Terracotta"],
    image: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/1.%20PROCRASTINATION/step%204.webp",
    foregroundImage: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/1.%20PROCRASTINATION/menungso.webp",
    imageLabel: "[ SAMPLE // ID_01 ]",
    tools: ["ADOBE PHOTOSHOP", "ADOBE AFTER EFFECT", "GITHUB"]
  },
  {
    num: "02",
    title: "SCARY SWEETHEART",
    category: "WEBTOON ARTIST • INDONESIA",
    subtitle: "Storyboards, layouts and characters for LINE Webtoon Contest 2025",
    description: "The LINE Webtoon Contest 2025 is a major industry event challenging creators to pitch original stories for a chance at a grand prize and an official debut. The Story: The story follows Avi Sina, an awkward high school girl who accidentally crosses paths with a mysterious, intimidating boy who secretly harbors feelings for her. This unexpected encounter sparks a chaotic and heartwarming new chapter in their school lives.",
    role: "CONCEPT, STORY BOARD",
    roleDesc: "VISUAL STORYTELLING & DIRECTING",
    client: "KUPI CAKE X 090UCU",
    clientDesc: "COLLABORATIVE PROJECT",
    palette: ["#707A8A", "#FFFDF2", "#C4A48A"],
    paletteNames: ["Slate Grey", "Cream Custard", "Pale Almond"],
    image: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/Cover%20finish_fix.webp",
    foregroundImage: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/Menungso-cover.webp",
    imageLabel: "[ SAMPLE // WEB_02 ]",
    tools: ["ADOBE PHOTOSHOP", "CLIP STUDIO PAINT", "WEBTOON"]
  },
  {
    num: "03",
    title: "DEADLINER",
    category: "GAME DEVELOPER • SOLO, INDONESIA",
    subtitle: "Classic 2D platformer following Dudung's academic struggle",
    description: "This game is the final capstone project for my Microcredential Game Developer graduation requirement under the MBKM (Merdeka Belajar-Kampus Merdeka) program.\n\nComing from a Nuclear Engineering background, this project marks a milestone in my journey to pivot and deepen my passion for visual art. It challenged me to apply my artistic skills to a fast-paced, collaborative tech environment.",
    role: "GAME ARTIST",
    roleDesc: "CONCEPT ARTIST & ILLUSTRATOR",
    client: "ICE INSTITUTE X KEMENDIKBUDRISTEK",
    clientDesc: "INSTITUTIONAL PROJECT",
    palette: ["#C9BFDB", "#E6D3E3", "#6A5D7B"],
    paletteNames: ["Soft Lavender", "Orchid Mist", "Deep Amethyst"],
    image: "https://github.com/kupicake/database/raw/HERO-SECTION/3.%20DEADLINER/screen%20menu-final.webm",
    foregroundImage: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/Menungso.webp",
    imageLabel: "[ SAMPLE // GAME_03 ]",
    tools: ["ADOBE PHOTOSHOP", "CLIP STUDIO PAINT", "FIGMA"]
  }
];

const getToolIcon = (toolName: string) => {
  const name = toolName.toUpperCase();
  if (name.includes("FIGMA")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 md:w-4.5 md:h-4.5"
      >
        <path d="M12 2H8.5a3.5 3.5 0 0 0 0 7H12" />
        <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12" />
        <path d="M12 9H8.5a3.5 3.5 0 0 0 0 7H12" />
        <circle cx="15.5" cy="12.5" r="3.5" />
        <path d="M5 19.5a3.5 3.5 0 0 1 3.5-3.5H12v3.5a3.5 3.5 0 1 1-7 0z" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    );
  }
  if (name.includes("PHOTOSHOP")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 md:w-4.5 md:h-4.5"
      >
        <g transform="translate(-4.25, -3.6) scale(1.3)">
          <path d="M7 17V7h3.5a2.5 2.5 0 0 1 0 5H7" />
          <path d="M13.5 15.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-.5c0-.6-.3-.9-.8-1.1l-.8-.3c-.5-.2-.7-.6-.7-1.1v-.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5" />
        </g>
      </svg>
    );
  }
  if (name.includes("CLIP STUDIO") || name.includes("PAINT")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 md:w-4.5 md:h-4.5"
      >
        <path d="M 12.5 10.5 C 10 12, 6 12, 5.5 10 C 5 8, 9 5.5, 14 5.5 C 18.5 5.5, 20 8, 20 11.5 C 20 15, 16 16.5, 13.5 18 C 12.5 19, 13 20.5, 15 21" />
      </svg>
    );
  }
  if (name.includes("GITHUB")) {
    return <Github className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[1.25]" />;
  }
  if (name.includes("AFTER EFFECT")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 md:w-4.5 md:h-4.5"
      >
        <g transform="translate(-4.25, -3.6) scale(1.3)">
          <path d="M 6.5 17 L 8.5 7 L 10.5 17 M 7.7 13 h 1.6" />
          <path d="M 12.8 14 H 16.5 C 16.5 11 12.8 11 12.8 14 C 12.8 17 16.5 17 16.5 15" />
        </g>
      </svg>
    );
  }
  if (name.includes("WEBTOON")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 md:w-4.5 md:h-4.5"
      >
        <path
          d="M 4.5 5.5 L 19.5 3 L 18 9.5 L 21.5 10 L 19 18 L 13.5 17.5 L 13.5 21 L 11.5 17.5 L 5.5 18.5 L 4.5 10 L 2.5 9.5 Z"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <text
          x="11.5"
          y="10.5"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="4.2"
          fill="currentColor"
          stroke="none"
          letterSpacing="0.02em"
        >
          WEB
        </text>
        <text
          x="11.5"
          y="14.8"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="4.2"
          fill="currentColor"
          stroke="none"
          letterSpacing="0.02em"
        >
          TOON
        </text>
      </svg>
    );
  }
  return <Box className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[1.25]" />;
};

const ALL_PRELOAD_IMAGES = [
  // Hero and general assets
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/1.%20PROCRASTINATION/step%204.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/1.%20PROCRASTINATION/menungso.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/Cover%20finish_fix.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/Menungso-cover.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/Menungso.webp",
  "https://raw.githubusercontent.com/kupicake/database/main/raw%20concept.webp",
  "https://raw.githubusercontent.com/kupicake/database/main/full%20illustration.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/MY%20LIFE%20ONE%20DAY.webp",

  // Procrastination case steps
  "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%200.webp",
  "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%201.webp",
  "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%202.webp",
  "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%203.webp",
  "https://github.com/kupicake/database/raw/HERO-SECTION/1.%20PROCRASTINATION/step%204.webp",

  // Sweetheart case scenes
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/scene1-color.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/thumbnail.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/scene4-color.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/scene2-color.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/baris2_003.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/thumbnail2.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/baris7_001.webp",

  // Sweetheart concept lineup
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/DESIGN%20CHARACTER/1_01.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/DESIGN%20CHARACTER/1_02.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/DESIGN%20CHARACTER/1_03.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/DESIGN%20CHARACTER/1_04.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/DESIGN%20CHARACTER/1_05.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/DESIGN%20CHARACTER/1_06.webp",

  // Sweetheart moodboard images
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Female%20Lead.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Male%20Lead.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%201.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%202.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%203.webp",
  "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/MOODBOARD/Side%20Character%20-%204.webp"
];

export default function App() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);
  // Note: To re-activate the loading screen, set the initial state below to false.
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [isServiceZoomed, setIsServiceZoomed] = useState(false);
  const [activeProject, setActiveProject] = useState(() => {
    if (typeof window !== "undefined") {
      const index = getIndexForPath(window.location.pathname);
      return index !== -1 ? index : 0;
    }
    return 0;
  });
  const [hoveredWorkFrame, setHoveredWorkFrame] = useState<string | null>(null);
  const [sampleTouched, setSampleTouched] = useState(false);

  useEffect(() => {
    if (sampleTouched) {
      const timer = setTimeout(() => {
        setSampleTouched(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sampleTouched]);

  // --- MAGNETIC CURSOR GRAVITATIONAL PULL EFFECT ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;

      const elements = document.querySelectorAll(".magnetic-element");
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;

        const dx = mouseX - elX;
        const dy = mouseY - elY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const threshold = parseInt(htmlEl.getAttribute("data-magnetic-radius") || "50", 10);
        const strength = parseFloat(htmlEl.getAttribute("data-magnetic-strength") || "0.3");

        if (distance < threshold) {
          const ratio = 1 - distance / threshold;
          const pullX = dx * strength * ratio;
          const pullY = dy * strength * ratio;

          htmlEl.style.transform = `translate(${pullX}px, ${pullY}px)`;
          htmlEl.style.transition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)";
        } else {
          htmlEl.style.transform = "translate(0px, 0px)";
          htmlEl.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const bentoContainerRef = useRef<HTMLDivElement | null>(null);
  const moreWorkRef = useRef<HTMLDivElement | null>(null);

  const handleBentoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    if (!bentoContainerRef.current) return;
    const rect = bentoContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    if (xPercent < 46.5) {
      if (yPercent < 62) {
        setHoveredWorkFrame("left-top");
      } else {
        setHoveredWorkFrame("left-bottom");
      }
    } else {
      if (yPercent < 25) {
        setHoveredWorkFrame("right-top");
      } else {
        setHoveredWorkFrame("right-bottom-image");
      }
    }
  };

  const handleBentoMouseLeave = () => {
    setHoveredWorkFrame(null);
  };

  const getLeftBlockStyle = () => {
    if (hoveredWorkFrame === "left-top" || hoveredWorkFrame === "left-bottom") {
      return { flex: "1.34 1 0%" };
    } else if (hoveredWorkFrame === "right-top" || hoveredWorkFrame === "right-bottom-image") {
      return { flex: "1.26 1 0%" };
    }
    return { flex: "1.3 1 0%" };
  };

  const getRightBlockStyle = () => {
    if (hoveredWorkFrame === "left-top" || hoveredWorkFrame === "left-bottom") {
      return { flex: "1.46 1 0%" };
    } else if (hoveredWorkFrame === "right-top" || hoveredWorkFrame === "right-bottom-image") {
      return { flex: "1.54 1 0%" };
    }
    return { flex: "1.5 1 0%" };
  };

  const getLeftTopStyle = () => {
    if (hoveredWorkFrame === "left-top") {
      return { height: "64%" };
    } else if (hoveredWorkFrame === "left-bottom") {
      return { height: "60%" };
    }
    return { height: "62%" };
  };

  const getLeftBottomStyle = () => {
    if (hoveredWorkFrame === "left-top") {
      return { height: "36%" };
    } else if (hoveredWorkFrame === "left-bottom") {
      return { height: "40%" };
    }
    return { height: "38%" };
  };

  const getLeftBottomRoleStyle = () => {
    return { flex: "1 1 0%" };
  };

  const getLeftBottomClientStyle = () => {
    return { flex: "1 1 0%" };
  };

  const getRightTopStyle = () => {
    if (hoveredWorkFrame === "right-top") {
      return { height: "27%" };
    } else if (hoveredWorkFrame === "right-bottom-image") {
      return { height: "23%" };
    }
    return { height: "25%" };
  };

  const getRightBottomStyle = () => {
    if (hoveredWorkFrame === "right-top") {
      return { height: "73%" };
    } else if (hoveredWorkFrame === "right-bottom-image") {
      return { height: "77%" };
    }
    return { height: "75%" };
  };

  const [activeView, _setActiveView] = useState<{ type: "home" } | { type: "project"; index: number } | { type: "about" }>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
      if (path.includes("/about-me") || path.includes("/about")) {
        return { type: "about" };
      }
      const index = getIndexForPath(window.location.pathname);
      if (index !== -1) {
        return { type: "project", index };
      }
    }
    return { type: "home" };
  });

  const setActiveView = (view: { type: "home" } | { type: "project"; index: number } | { type: "about" } | ((prev: any) => any)) => {
    const nextView = typeof view === "function" ? view(activeView) : view;
    _setActiveView(nextView);
    if (typeof window !== "undefined") {
      if (nextView.type === "project") {
        const path = getPathForIndex(nextView.index);
        if (window.location.pathname !== path) {
          window.history.pushState({ type: "project", index: nextView.index }, "", path);
        }
        setActiveProject(nextView.index);
      } else if (nextView.type === "about") {
        if (window.location.pathname !== "/about") {
          window.history.pushState({ type: "about" }, "", "/about");
        }
      } else {
        if (window.location.pathname !== "/") {
          window.history.pushState({ type: "home" }, "", "/");
        }
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, "");
      if (path.includes("/about-me") || path.includes("/about")) {
        _setActiveView({ type: "about" });
      } else {
        const index = getIndexForPath(window.location.pathname);
        if (index !== -1) {
          _setActiveView({ type: "project", index });
          setActiveProject(index);
        } else {
          _setActiveView({ type: "home" });
        }
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const currentProject = projectSamples[activeProject];

  const isAtHero = activeView.type === "home" && scrollY < 50;
  const headerBoxClass = "w-[55px] lg:w-[85px] h-[55px] lg:h-[85px]";
  const scrollHeight = typeof window !== "undefined" && typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 0;
  const pageScrollProgress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowRotateWarning(isMobile && isPortrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  const handlePrevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projectSamples.length - 1 : prev - 1));
  };

  const handleNextProject = () => {
    setActiveProject((prev) => (prev === projectSamples.length - 1 ? 0 : prev + 1));
  };

  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };
  const lenisRef = useRef<Lenis | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const serviceVideoRef = useRef<HTMLVideoElement | null>(null);
  const serviceTimerRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const fadeIntervalRef = useRef<number | null>(null);

  const fadeAudioTo = (targetVolume: number, duration: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const audio = audioRef.current;
    
    // Ensure the source is playing if we are fading in
    if (targetVolume > 0 && audio.paused) {
      audio.volume = 0;
      audio.play().catch(() => {});
    }

    const startVolume = audio.volume;
    const volumeDifference = targetVolume - startVolume;
    if (volumeDifference === 0) {
      if (onComplete) onComplete();
      return;
    }

    const stepTime = 30; // ms per step
    const steps = duration / stepTime;
    const volumeStep = volumeDifference / steps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++;
      let newVolume = startVolume + volumeStep * currentStep;

      // Bound checking
      if (targetVolume > startVolume) {
        if (newVolume >= targetVolume) {
          newVolume = targetVolume;
          window.clearInterval(fadeIntervalRef.current!);
          fadeIntervalRef.current = null;
        }
      } else {
        if (newVolume <= targetVolume) {
          newVolume = targetVolume;
          window.clearInterval(fadeIntervalRef.current!);
          fadeIntervalRef.current = null;
        }
      }

      audio.volume = newVolume;

      if (!fadeIntervalRef.current) {
        if (onComplete) onComplete();
      }
    }, stepTime);
  };

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Active preloading of all images used in the application
  useEffect(() => {
    let loadedCount = 0;
    const total = ALL_PRELOAD_IMAGES.length;
    if (total === 0) {
      setAssetsPreloaded(true);
      return;
    }

    let active = true;

    ALL_PRELOAD_IMAGES.forEach((url) => {
      const img = new Image();
      img.onload = () => {
        if (!active) return;
        loadedCount++;
        if (loadedCount >= total) {
          setAssetsPreloaded(true);
        }
      };
      img.onerror = () => {
        if (!active) return;
        // Even if some assets fail, we still increment so loading is not blocked.
        loadedCount++;
        if (loadedCount >= total) {
          setAssetsPreloaded(true);
        }
      };
      img.src = url;
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 98) {
          if (assetsPreloaded) {
            clearInterval(interval);
            return 100;
          }
          return 98;
        }
        const next = prev + Math.floor(Math.random() * 4) + 1;
        if (next >= 98) {
          if (assetsPreloaded) {
            clearInterval(interval);
            return 100;
          }
          return 98;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [assetsPreloaded]);

  useEffect(() => {
    serviceTimerRef.current = window.setInterval(() => {
      setActiveService((p) => (p + 1) % 3);
    }, 5000);
    return () => {
      if (serviceTimerRef.current) clearInterval(serviceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setIsServiceZoomed(false);
    if (activeService === 2 && serviceVideoRef.current) {
      serviceVideoRef.current.play().catch(() => {});
    } else if (serviceVideoRef.current) {
      serviceVideoRef.current.pause();
    }
  }, [activeService]);

  const handleServiceEnter = (index: number) => {
    setActiveService(index);
    if (serviceTimerRef.current) clearInterval(serviceTimerRef.current);
  };

  const handleServiceLeave = () => {
    if (serviceTimerRef.current) clearInterval(serviceTimerRef.current);
    serviceTimerRef.current = window.setInterval(() => {
      setActiveService((p) => (p + 1) % 3);
    }, 5000);
  };

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      if (isSoundOn) {
        if (videoRef.current && videoRef.current.muted) {
          videoRef.current.muted = false;
          videoRef.current.play().catch(() => {});
        }
        if (audioRef.current && audioRef.current.paused) {
          fadeAudioTo(1, 1000);
        }
      }
    };
    window.addEventListener("pointerdown", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [isSoundOn]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isSoundOn;
      if (isSoundOn) {
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
    if (audioRef.current) {
      if (isSoundOn && hasInteracted) {
        fadeAudioTo(1, 1200);
      } else if (!isSoundOn) {
        fadeAudioTo(0, 1000, () => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
        });
      }
    }
  }, [isSoundOn, hasInteracted]);

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 3,
      wheelMultiplier: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    setWindowHeight(window.innerHeight);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen || !isFullyLoaded) {
      document.body.style.overflow = "hidden";
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, !isFullyLoaded]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.body.classList.add("custom-cursor-active");
      } else {
        document.body.classList.remove("custom-cursor-active");
        if (cursor) cursor.style.display = "none";
      }
    };

    handleMediaChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      cursor.style.opacity = "1";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".cursor-pointer") || 
        window.getComputedStyle(target).cursor === "pointer";
      
      if (isInteractive) {
        cursor.classList.add("cursor-hover");
      } else {
        cursor.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    let rafId: number;
    const updateCursor = () => {
      if (currentX === -100 && currentY === -100) {
        currentX = mouseX;
        currentY = mouseY;
      } else {
        currentX += (mouseX - currentX) * 0.3;
        currentY += (mouseY - currentY) * 0.3;
      }
      
      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(updateCursor);
    };
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  const isScrolled = scrollY > 115;
  const isAtBottom =
    windowHeight > 0 && typeof document !== "undefined"
      ? scrollY + windowHeight >= document.documentElement.scrollHeight - 50
      : false;

  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  let aboutTitleProgress = 0;
  if (aboutTitleRef.current && windowHeight > 0) {
    const rect = aboutTitleRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    aboutTitleProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY)),
    );
  }

  const aboutRef = useRef<HTMLParagraphElement>(null);
  let scrollProgress = 0;
  if (aboutRef.current && windowHeight > 0) {
    const rect = aboutRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    scrollProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY)),
    );
  }

  const principleRef = useRef<HTMLParagraphElement>(null);
  let principleProgress = 0;
  if (principleRef.current && windowHeight > 0) {
    const rect = principleRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    principleProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY)),
    );
  }

  const whatIDoRef = useRef<HTMLHeadingElement>(null);
  let whatIDoProgress = 0;
  if (whatIDoRef.current && windowHeight > 0) {
    const rect = whatIDoRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    whatIDoProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY)),
    );
  }

  const myWorkRef = useRef<HTMLHeadingElement>(null);
  let myWorkProgress = 0;
  if (myWorkRef.current && windowHeight > 0) {
    const rect = myWorkRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    myWorkProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY)),
    );
  }

  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  let contactTitleProgress = 0;
  if (contactTitleRef.current && windowHeight > 0) {
    const rect = contactTitleRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    contactTitleProgress = Math.max(
      0,
      Math.min(1, (startY - rect.top) / (startY - endY)),
    );
  }

  const principleWords1 = [
    { w: "Design", h: false },
    { w: "with", h: false },
    { w: "intent,", h: true },
    { w: "animate", h: false },
    { w: "with", h: false },
    { w: "soul.", h: true },
  ];

  const aboutWords = [
    { w: "I", h: false },
    { w: "am", h: false },
    { w: "a", h: false },
    { w: "multidisciplinary", h: true },
    { w: "visual", h: true },
    { w: "artist", h: true },
    { w: "dedicated", h: false },
    { w: "to", h: false },
    { w: "creating", h: false },
    { w: "vibrant", h: true },
    { w: "worlds", h: true },
    { w: "that", h: false },
    { w: "capture", h: false },
    { w: "the", h: false },
    { w: "imagination", h: false },
    { w: "and", h: false },
    { w: "stay", h: false },
    { w: "with", h: false },
    { w: "the", h: false },
    { w: "audience", h: false },
    { w: "long", h: false },
    { w: "after.", h: false },
  ];
  
  let moreWorkParallaxY = 0;
  if (moreWorkRef.current && windowHeight > 0) {
    const rect = moreWorkRef.current.getBoundingClientRect();
    const elementTop = rect.top + scrollY;
    const centerOffset = elementTop - (windowHeight - rect.height) / 2;
    moreWorkParallaxY = (scrollY - centerOffset) * 0.12;
  }

  return (
    <main className="bg-[#E5E2DC] flex flex-col gap-[1px] w-full min-h-screen font-sans">
      {/* LOADING SCREEN */}
      {!isFullyLoaded && (
        <div
          onClick={() => {
            if (loadingProgress === 100 && !isExiting) {
              setIsExiting(true);
              setHasInteracted(true);
              if (isSoundOn && audioRef.current) {
                fadeAudioTo(1, 1500);
              }
              setTimeout(() => {
                setIsFullyLoaded(true);
              }, 2000);
            }
          }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 delay-1000 ${loadingProgress === 100 && !isExiting ? "cursor-pointer" : ""} ${isExiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          {/* Base Light Background */}
          <div className="absolute inset-0 bg-[#faf9f5] -z-20" />

          {/* White Dazzle Flash */}
          <div
            className={`absolute inset-0 transition-all duration-[1000ms] ${isExiting ? "opacity-100 bg-white" : "opacity-0 bg-transparent"} -z-10`}
          />

          <div
            className={`font-mono text-4xl md:text-6xl font-light tracking-widest flex items-baseline relative transition-all duration-[1000ms] ${isExiting ? "opacity-0 scale-[2.0] blur-xl" : "opacity-100 scale-100 blur-0"} text-[#1a1a1a]`}
          >
            <span className="w-24 md:w-32 text-right">{loadingProgress}</span>
            <span className="text-[#F05C3B] text-2xl md:text-3xl">%</span>
          </div>
          <div
            className={`absolute bottom-20 mt-12 text-[#737370] font-mono text-xs tracking-widest uppercase transition-opacity duration-500 ease-in-out ${loadingProgress === 100 && !isExiting ? "opacity-100 animate-pulse" : "opacity-0 pointer-events-none"}`}
          >
            Click to Enter
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src="https://raw.githubusercontent.com/kupicake/database/main/Scott%20Buckley%20-%20Growing%20Up.mp3"
        loop
      />

      {/* MENU BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* GRID-STYLE NAV OVERLAY */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[400px] lg:w-[460px] bg-white border-l border-[#e5e5e2] z-40 flex flex-col justify-between transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header grid matching background template grid increments */}
        <div className="grid grid-cols-[1fr_55px] lg:grid-cols-[1fr_85px] h-[55px] lg:h-[85px] border-b border-[#e5e5e2] flex-shrink-0">
          <div className="border-r border-[#e5e5e2] flex items-center px-6 lg:px-10">
            <div className="font-mono text-[9px] lg:text-xs text-[#737370] tracking-widest uppercase">
              Navigation Grid
            </div>
          </div>
          {/* Empty spacer block where the floating trigger sits exactly */}
          <div className="bg-[#fafa95]/5" />
        </div>

        {/* Dynamic Nav Links with fine vertical border division */}
        <div className="flex-grow flex flex-col justify-center divide-y divide-[#e5e5e2]">
          {[
            { name: "About", num: "01", id: "about" },
            { name: "Work", num: "02", id: "work" },
            { name: "Contact", num: "03", id: "contact" },
          ].map((item, idx) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                if (lenisRef.current) {
                  lenisRef.current.start();
                }
                document.body.style.overflow = "";

                if (activeView.type !== "home") {
                  setActiveView({ type: "home" });
                  setTimeout(() => {
                    const element = document.getElementById(item.id);
                    if (element) {
                      lenisRef.current?.scrollTo(element, { immediate: true });
                    } else {
                      const el = document.getElementById(item.id);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 150);
                } else {
                  setTimeout(() => {
                    const element = document.getElementById(item.id);
                    if (element) {
                      lenisRef.current?.scrollTo(element);
                    } else {
                      const el = document.getElementById(item.id);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 50);
                }
              }}
              className="group relative flex-grow flex items-center justify-between px-8 lg:px-12 hover:bg-[#F05C3B]/5 transition-all duration-500 overflow-hidden"
            >
              {/* Vertical side glow indicator on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#F05C3B] transition-all duration-300 group-hover:w-[4px]" />

              <div className="flex items-baseline gap-4 lg:gap-6">
                <span className="font-mono text-[10px] lg:text-xs text-[#8a8a85] group-hover:text-[#F05C3B] transition-colors duration-500">
                  {item.num}
                </span>
                <span className="text-2xl lg:text-4xl font-extrabold uppercase tracking-[0.1em] lg:tracking-[0.15em] text-[#1a1a1a] group-hover:text-[#F05C3B] group-hover:translate-x-2 transition-all duration-500 select-none">
                  {item.name}
                </span>
              </div>
              <div className="text-[#8a8a85] group-hover:text-[#F05C3B] group-hover:translate-x-2 transition-all duration-500 font-mono text-sm lg:text-base">
                [ → ]
              </div>
            </a>
          ))}
        </div>

        {/* Footer social nodes & copy indicator */}
        <div className="border-t border-[#e5e5e2] bg-[#fbfbfa] flex-shrink-0">
          <div className="grid grid-cols-4 divide-x divide-[#e5e5e2] text-center border-b border-[#e5e5e2]">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/kupicake_/", label: "Instagram" },
              { 
                imgSrc: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/LOGO%20KUPICAKE/VGen%20Badge%20-%20outline.webp", 
                href: "https://vgen.co/kupicake_", 
                label: "VGen" 
              },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/riskirw17", label: "LinkedIn" },
              { Icon: MessageCircle, href: "https://wa.me/6289673731449", label: "WhatsApp" },
            ].map(({ Icon, imgSrc, href, label }) => (
              <a
                key={label}
                href={href}
                className="py-6 lg:py-8 flex flex-col items-center justify-center gap-2 hover:bg-[#F05C3B]/5 hover:text-[#F05C3B] text-[#737370] transition-all duration-500 group"
              >
                {imgSrc ? (
                  <div className="relative w-4 h-4 lg:w-5 lg:h-5 scale-[1.03]">
                    <img 
                      src={imgSrc} 
                      alt={label} 
                      className="absolute inset-0 w-full h-full object-contain vgen-icon-nav-idle opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src={imgSrc} 
                      alt={label} 
                      className="absolute inset-0 w-full h-full object-contain vgen-icon-nav-hover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                )}
                <span className="font-mono text-[8px] lg:text-[10px] uppercase tracking-widest">
                  {label}
                </span>
              </a>
            ))}
          </div>

          <div className="py-4 px-6 lg:px-10 flex justify-between items-center font-mono text-[8px] lg:text-[10px] text-[#8a8a85]">
            <span>ART x MOTION</span>
            <span>KUPI CAKE © 2026</span>
          </div>
        </div>
      </div>

      {/* FIXED FLOATING UI */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 transition-colors duration-500`}
      >
        {/* Top Left - Logo */}
        <div className={`absolute top-0 left-0 ${headerBoxClass} flex items-center justify-center pointer-events-auto bg-transparent transition-all duration-300`}>
          <div
            onClick={() => {
              if (activeView.type !== "home") {
                setActiveView({ type: "home" });
                window.scrollTo(0, 0);
                lenisRef.current?.scrollTo(0, { immediate: true });
              }
            }}
            className="cursor-pointer group flex flex-col items-center justify-center magnetic-element"
            data-magnetic-radius="50"
            data-magnetic-strength="0.35"
          >
            <div
              className={`w-10 h-10 lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border bg-white ${
                isAtHero
                  ? "border-white/25 group-hover:border-white/50"
                  : "border-[#E5E2DC] group-hover:border-[#F05C3B]/60"
              }`}
            >
              <img
                src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/LOGO%20KUPICAKE/kupicake%20putih.svg"
                alt="Kupicake Logo"
                className="w-full h-full object-cover translate-y-[50%] group-hover:translate-y-[35%] group-active:translate-y-[35%] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.1)] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Top Right - Nav */}
        <div
          className={`absolute top-0 right-0 ${headerBoxClass} flex items-center justify-center bg-transparent overflow-hidden transition-all duration-300 ${isScrolled || isMenuOpen || activeView.type !== "home" ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isScrolled || isMenuOpen || activeView.type !== "home" ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"}`}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isAtHero ? "text-white mix-blend-difference" : "text-[#1a1a1a]"} hover:text-[#F05C3B] p-2 flex items-center justify-center transition-colors magnetic-element`}
              data-magnetic-radius="45"
              data-magnetic-strength="0.4"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 lg:w-6 lg:h-6" />
              ) : (
                <Menu className="w-5 h-5 lg:w-6 lg:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Center Right - Sound */}
        <div
          className={`absolute bottom-[55px] lg:bottom-[85px] mb-4 lg:mb-8 right-0 ${headerBoxClass} flex items-center justify-center pointer-events-auto bg-transparent group/sound transition-all duration-300`}
          style={
            {
              "--sp": `${
                typeof window !== "undefined"
                  ? (() => {
                      const isDesktop = window.innerWidth >= 1024;
                      const baseOffset = isDesktop ? 117 : 71;
                      const buttonSize = isDesktop ? 85 : 55;
                      const effectiveScroll = scrollY - baseOffset;
                      return Math.min(
                        100,
                        Math.max(0, (effectiveScroll / buttonSize) * 100),
                      );
                    })()
                  : 0
              }%`,
            } as React.CSSProperties
          }
        >
          <div
            onClick={() => setIsSoundOn(!isSoundOn)}
            className="-rotate-90 origin-center cursor-pointer group grid relative select-none magnetic-element"
            data-magnetic-radius="50"
            data-magnetic-strength="0.35"
          >
            {/* Back Layer (Ambient Light for Hero background) */}
            <div className="col-start-1 row-start-1 flex flex-col items-center gap-1 lg:gap-1.5 whitespace-nowrap text-[8px] lg:text-[10px] font-bold tracking-[0.1em] lg:tracking-[0.15em] transition-opacity duration-300 mix-blend-difference text-white">
              <div className="flex items-center gap-1.5">
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  SOUND
                </span>
                <div className="grid overflow-hidden">
                  <span
                    className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"} opacity-90 group-hover:opacity-100`}
                  >
                    OFF
                  </span>
                  <span
                    className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"} opacity-90 group-hover:opacity-100`}
                  >
                    ON
                  </span>
                </div>
              </div>
              
              {/* Dynamic scroll progress loading bar (Hero style) */}
              <div className="w-10 lg:w-12 h-[1.5px] bg-white/30 rounded-full relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-white transition-all duration-300 ease-out"
                  style={{ width: `${pageScrollProgress}%` }}
                />
              </div>
            </div>

            {/* Front Layer using Clip Path (High Contrast Dark/Orange for Content background) */}
            <div
              className="col-start-1 row-start-1 flex flex-col items-center gap-1 lg:gap-1.5 whitespace-nowrap text-[8px] lg:text-[10px] font-bold tracking-[0.1em] lg:tracking-[0.15em]"
              style={{ clipPath: "inset(0 calc(100% - var(--sp)) 0 0)" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[#8c8275] group-hover:text-[#F05C3B] transition-colors">
                  SOUND
                </span>
                <div className="grid overflow-hidden">
                  <span
                    className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"} text-[#161616] group-hover:text-[#F05C3B]`}
                  >
                    OFF
                  </span>
                  <span
                    className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"} text-[#F05C3B]`}
                  >
                    ON
                  </span>
                </div>
              </div>

              {/* Dynamic scroll progress loading bar (Content style) */}
              <div className="w-10 lg:w-12 h-[1.5px] bg-[#161616]/10 rounded-full relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-[#F05C3B] transition-all duration-300 ease-out"
                  style={{ width: `${pageScrollProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Song Info */}
          <div
            className={`absolute right-[calc(50%+15px)] lg:right-[calc(50%+20px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-[8px] lg:text-[9px] font-medium tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#737370] transition-all duration-500 ease-out flex items-center gap-3 bg-white border border-[#e5e5e2] shadow-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full ${
              isSoundOn
                ? "opacity-0 translate-x-4 pointer-events-none group-hover/sound:opacity-100 group-hover/sound:translate-x-0"
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            scott buckley - growing up
            <div className="flex gap-1 items-center h-2.5">
              <span className="w-[1.5px] h-full bg-[#F05C3B] animate-pulse" />
              <span
                className="w-[1.5px] h-2/3 bg-[#F05C3B] animate-pulse"
                style={{ animationDelay: "200ms" }}
              />
              <span
                className="w-[1.5px] h-full bg-[#F05C3B] animate-pulse"
                style={{ animationDelay: "400ms" }}
              />
            </div>
          </div>
        </div>
      </div>

      {activeView.type === "home" ? (
        <>
          {/* HERO SECTION */}
          <div className="relative flex-none h-[100svh] w-full bg-[#faf9f5] grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] grid-rows-[55px_1fr_55px] lg:grid-rows-[85px_1fr_85px] overflow-hidden">
        {/* Full-bleed background video with parallax effect */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none select-none">
          <video
            ref={videoRef}
            src="https://raw.githubusercontent.com/kupicake/database/main/main%20illus_hero%20section.webm"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover origin-center pointer-events-none select-none"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
          {/* Subtle vignette/shading layer to finish the artwork integration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf9f5]/15 pointer-events-none mix-blend-multiply" />
          {/* Radial vignette centered around the character - 10% darker towards outer bounds */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_25%,rgba(0,0,0,0.1)_75%)] pointer-events-none mix-blend-multiply" />
        </div>

        {/* Subtle, refined background accent element */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-transparent pointer-events-none opacity-100 flex items-center justify-center">
          <div className="text-[12rem] md:text-[20rem] font-black text-[#1a1a1a]/[0.02] tracking-tighter select-none font-sans uppercase">
            Art
          </div>
        </div>

        {/* Top Left - Logo (Moved to fixed) */}
        <div className="relative z-10 border-b border-r border-[#e5e5e2]/40 bg-transparent" />

        {/* Top Center - Name */}
        <div className="relative z-10 border-b border-[#e5e5e2]/40 flex flex-col items-start justify-center px-6 md:px-12 lg:px-24 bg-transparent">
          <div className="border border-[#1a1a1a]/10 px-3.5 py-1.5 lg:px-7 lg:py-2.5 rounded-full uppercase tracking-[0.35em] lg:tracking-[0.55em] text-[7.5px] lg:text-[10px] font-extrabold text-[#1a1a1a]/85 bg-white shadow-sm opacity-90 hover:opacity-100 transition-opacity cursor-default">
            KUPI CAKE
          </div>
        </div>

        {/* Top Right - Navigation */}
        <div className="relative z-10 border-b border-l border-[#e5e5e2]/40 flex flex-col items-center justify-center bg-transparent">
          <div className="flex flex-col items-start gap-1.5 lg:gap-2.5">
            {[
              { name: "About", id: "about" },
              { name: "Work", id: "work" },
              { name: "Contact", id: "contact" },
            ].map((item, idx) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (activeView.type !== "home") {
                    setActiveView({ type: "home" });
                    setTimeout(() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        if (lenisRef.current) {
                          lenisRef.current.scrollTo(element, { immediate: true });
                        } else {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }, 150);
                  } else {
                    const element = document.getElementById(item.id);
                    if (element) {
                      if (lenisRef.current) {
                        lenisRef.current.scrollTo(element);
                      } else {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }
                }}
                className={`text-[8px] lg:text-[10px] tracking-[0.1em] lg:tracking-[0.15em] font-bold uppercase transition-all flex items-center gap-1.5 lg:gap-2 group magnetic-element ${
                  isAtHero ? "text-white mix-blend-difference" : "text-[#1a1a1a]"
                } ${
                  idx === 0 ? "opacity-100" : "opacity-65 hover:opacity-100"
                }`}
                data-magnetic-radius="50"
                data-magnetic-strength="0.3"
              >
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Center Left - Social Media */}
        <div className="relative z-10 border-r border-[#e5e5e2]/40 flex flex-col items-center justify-end pb-4 lg:pb-8 gap-8 lg:gap-10 bg-transparent">
          {[
            { 
              imgSrc: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/LOGO%20KUPICAKE/VGen%20Badge%20-%20outline.webp", 
              label: "VGen", 
              href: "https://vgen.co/kupicake_" 
            },
            { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/kupicake_/" },
            { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/riskirw17" },
            { Icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/6289673731449" },
          ].map(({ Icon, imgSrc, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-white mix-blend-difference opacity-70 hover:opacity-100 transition-all hover:scale-110 flex items-center justify-center p-1 magnetic-element"
              data-magnetic-radius="40"
              data-magnetic-strength="0.4"
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={label}
                  className="w-4 h-4 lg:w-5 lg:h-5 object-contain invert scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                Icon && (
                  <Icon
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    strokeWidth={2}
                  />
                )
              )}
            </a>
          ))}
        </div>

        {/* Center Main - Immersive Transparent Grid overlay */}
        <div className="relative z-10 overflow-hidden w-full h-full flex items-center justify-start px-6 md:px-12 lg:px-24 bg-transparent pointer-events-none">
          <div 
            className="flex flex-col items-start text-[#faf9f5] mix-blend-difference select-none max-w-lg md:max-w-2xl gap-16 sm:gap-24 animate-project-fade"
            style={{ transform: 'translate(65%, -25%)' }}
          >
            <div 
              className="flex flex-col gap-1.5 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase"
              style={{ transform: 'translateY(-40%)' }}
            >
              <span className="opacity-65">7.7956° S, 110.3695° E</span>
              <span className="opacity-65">Yogyakarta</span>
            </div>
            <h1 className="font-sans font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[54px] leading-[1.1] md:leading-[1.15] tracking-tight opacity-80">
              Illustrator &<br />Motion Artist
            </h1>
          </div>
        </div>

        {/* Center Right - Blank Area */}
        <div className="relative z-10 border-l border-[#e5e5e2]/40 flex items-center justify-center bg-transparent"></div>

        {/* Bottom Left - Corner Detailing */}
        <div className="relative z-10 border-t border-r border-[#e5e5e2]/40 flex items-center justify-center bg-transparent">
          <div className="w-1.5 h-1.5 bg-[#1a1a1a] opacity-30 rounded-sm transform rotate-45" />
        </div>

        {/* Bottom Center - Empty / Subtle Detail */}
        <div className="relative z-10 border-t border-[#e5e5e2]/40 flex items-center justify-center bg-transparent">
          <div className="w-[100px] h-[1px] bg-[#1a1a1a]/25" />
        </div>

        {/* Bottom Right - Sound (Moved to fixed) */}
        <div className="relative z-10 border-t border-l border-[#e5e5e2]/40 bg-transparent" />
      </div>

      {/* ABOUT SECTION */}
      <div
        id="about"
        className="w-full bg-[#E5E2DC] grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] auto-rows-auto gap-[1px] scroll-mt-[55px] lg:scroll-mt-[85px]"
      >
        {/* Left Grid Margin */}
        <div className="bg-[#faf9f5] col-start-1 col-end-2 row-start-1" />

        {/* Center Content */}
        <div className="bg-[#faf9f5] col-start-2 col-end-3 row-start-1 pt-40 lg:pt-64 pb-48 lg:pb-64 px-8 md:px-12 lg:px-24 flex flex-col justify-center items-start">
          <h2
            ref={aboutTitleRef}
            className="font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase mb-8 md:mb-12"
          >
            <span
              style={{
                backgroundImage: `linear-gradient(to right, #161616 ${Math.min(100, aboutTitleProgress * 100)}%, #b5b5b0 ${Math.min(100, aboutTitleProgress * 100)}%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ABOUT ME
            </span>
          </h2>
          <p
            ref={aboutRef}
            className="text-2xl md:text-4xl xl:text-[52px] font-normal leading-[1.1] md:leading-[1.15] tracking-tight"
          >
            {aboutWords.map((word, i) => {
              const fillPercentage = Math.max(
                0,
                Math.min(100, (scrollProgress * aboutWords.length - i) * 100),
              );
              const targetColor = word.h ? "#F05C3B" : "#161616";
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
                  {i < aboutWords.length - 1 && " "}
                </span>
              );
            })}
          </p>

          <div className="mt-10 md:mt-12 w-full flex justify-end">
            <button
              onClick={() => {
                setActiveView({ type: "about" });
                window.scrollTo(0, 0);
                lenisRef.current?.scrollTo(0, { immediate: true });
              }}
              className="group flex items-center justify-start h-12 md:h-14 rounded-full border border-[#161616]/20 hover:border-[#F05C3B] hover:text-[#F05C3B] bg-transparent transition-all duration-500 ease-out cursor-pointer overflow-hidden w-12 hover:w-48 md:w-14 md:hover:w-56"
              aria-label="More about me"
            >
              <div className="flex items-center w-full h-full">
                {/* Arrow Icon in its own perfect container, centered when idle */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5 text-current" />
                </div>
                {/* Revealed text on hover/touch */}
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold whitespace-nowrap text-[#161616] group-hover:text-[#F05C3B] pr-5 pl-1 -translate-x-2 group-hover:translate-x-0">
                  more about me
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-[#faf9f5] col-start-3 col-end-4 row-start-1" />
      </div>

      {/* --- Section 3: What I Do (Bento Grid) --- */}
      <div className="lg:h-screen lg:min-h-[850px] grid lg:grid-cols-[85px_1fr_85px] grid-cols-[55px_1fr_55px] gap-[1px] bg-[#E5E2DC] overflow-hidden">
        {/* Left Grid Margin */}
        <div className="bg-[#FAF9F5] col-start-1 col-end-2 row-start-1" />

        {/* Center Content */}
        <div className="bg-[#FAF9F5] col-start-2 col-end-3 row-start-1 pt-16 lg:pt-20 pb-24 lg:pb-32 flex flex-col justify-start items-start w-full lg:h-screen lg:min-h-[850px] overflow-hidden">
          {/* Section Header */}
          <div className="w-full flex justify-between items-baseline px-6 md:px-12 lg:px-16 mb-4 xl:mb-6 shrink-0">
            <h2
              ref={whatIDoRef}
              className="font-bold text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase"
            >
              <span
                style={{
                  backgroundImage: `linear-gradient(to right, #161616 ${Math.min(100, whatIDoProgress * 100)}%, #b5b5b0 ${Math.min(100, whatIDoProgress * 100)}%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                WHAT I DO
              </span>
            </h2>
            <span className="font-mono text-[9px] text-[#F05C3B]/60 tracking-wider font-light uppercase hidden md:inline">
              CREATIVE SPECTRUM &bull; CORE SKILLS
            </span>
          </div>

           {/* Splitting Layout into horizontal expanding columns like the reference */}
          <div className="w-full flex-grow lg:min-h-0 overflow-y-auto lg:overflow-hidden border-t border-b border-[#E5E2DC] flex flex-col lg:flex-row gap-[1px] bg-[#E5E2DC]">
            {[
              {
                type: "img",
                src: "https://raw.githubusercontent.com/kupicake/database/main/raw%20concept.webp",
                category: "Concept Art & Layouts",
                title: "Art Concept",
                desc: "Transforming abstract ideas into structured visual blueprints, from conceptual environments to character layouts.",
                num: "01",
              },
              {
                type: "img",
                src: "https://raw.githubusercontent.com/kupicake/database/main/full%20illustration.webp",
                category: "Narrative & Character Design",
                title: "Full Illustration",
                desc: "Building rich, immersive worlds, detailed character designs, and full publication layouts.",
                num: "02",
              },
              {
                type: "video",
                src: "https://raw.githubusercontent.com/kupicake/database/main/3.animasi_fin.webm",
                category: "Motion Graphics & 2D Movement",
                title: "Live Animation",
                desc: "Breathing movement into static artwork through traditional frame-by-frame loops and dynamic motion sequences.",
                num: "03",
              },
            ].map((service, index) => {
              const isActive = activeService === index;

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-[800ms] ease-out flex flex-col justify-between overflow-hidden cursor-pointer select-none group
                     ${
                       isActive
                         ? "bg-[#FAF8F4] flex-[1.8] lg:flex-[3] h-[340px] lg:h-full p-6 lg:p-8 min-h-[300px]"
                         : "bg-[#FAF9F5] flex-[0.7] lg:flex-[1] h-[64px] lg:h-full p-4 lg:p-8 hover:bg-[#F3F1EC]"
                     }
                   `}
                  onMouseEnter={() => handleServiceEnter(index)}
                  onTouchStart={() => handleServiceEnter(index)}
                  onMouseLeave={handleServiceLeave}
                  onClick={() => handleServiceEnter(index)}
                >
                  {/* Beautiful Radial Dot Pattern Grid Overlay */}
                  {isActive && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-25"
                      style={{
                        backgroundImage:
                          "radial-gradient(#C4BEB3 1.2px, transparent 1.2px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                  )}

                  {/* Column Header */}
                  <div className="relative z-10 w-full flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2.5 h-2.5 rounded-xs transition-all duration-500 shrink-0 ${isActive ? "bg-[#F05C3B]" : "bg-[#AE9E8E]"}`}
                      />
                      <span
                        className={`font-mono text-[9px] md:text-[10px] uppercase tracking-widest transition-colors duration-500 ${isActive ? "text-[#1a1a1a] font-semibold" : "text-[#8c8275]"}`}
                      >
                        {service.title}
                      </span>
                    </div>
                    {!isActive && (
                      <span className="font-mono text-xs text-[#AE9E8E] font-light">
                        {service.num}
                      </span>
                    )}
                  </div>

                  {/* Floating Asset (Visible only when Active) */}
                  <div
                    className={`relative flex-grow flex items-center justify-center min-h-0 w-full transition-opacity duration-500 ease-out ${isActive ? "opacity-100 py-3 lg:py-4 h-auto" : "opacity-0 pointer-events-none h-0"}`}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsServiceZoomed(!isServiceZoomed);
                      }}
                      className="w-full max-w-[270px] sm:max-w-[310px] md:max-w-[330px] lg:max-w-[232px] xl:max-w-[274px] aspect-[3/4] relative overflow-hidden rounded-2xl shadow-xl border border-[#E5E2DC] bg-[#FAF9F5] cursor-zoom-in group/asset transition-all duration-500 ease-out flex items-center justify-center"
                    >
                      {service.type === "img" ? (
                        <img
                          src={service.src}
                          referrerPolicy="no-referrer"
                          loading="eager"
                          className={`w-full h-full object-cover object-bottom transition-transform duration-700 ease-out select-none pointer-events-none ${isServiceZoomed ? "scale-[1.12]" : "scale-100 group-hover/asset:scale-105"}`}
                          alt={service.title}
                        />
                      ) : (
                        <video
                          ref={serviceVideoRef}
                          src={service.src}
                          className={`w-full h-full object-cover object-bottom transition-transform duration-700 ease-out select-none pointer-events-none ${isServiceZoomed ? "scale-[1.12]" : "scale-100 group-hover/asset:scale-105"}`}
                          loop
                          muted
                          playsInline
                        />
                      )}
                      
                      {/* Interactive Zoom Indicator Button/Label */}
                      <div className="absolute bottom-3 right-3 bg-[#1a1a1a]/85 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-md opacity-0 group-hover/asset:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 pointer-events-none select-none z-10">
                        <span className="text-[8px] font-mono tracking-widest text-[#FAF9F5] uppercase">
                          {isServiceZoomed ? "Click to Zoom Out" : "Click to Zoom In"}
                        </span>
                        <span className="text-[10px] text-[#F05C3B] font-mono leading-none">
                          {isServiceZoomed ? "⤗" : "⤓"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed Center Art Icon (Shown only when NOT active/touched) */}
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-[1200ms] ease-out z-10">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E2DC] flex items-center justify-center text-[#8c8275] group-hover:scale-115 group-hover:text-[#F05C3B] group-hover:border-[#F05C3B]/40 group-hover:shadow-md transition-all duration-[1200ms] ease-out">
                        {index === 0 && <Palette className="w-4.5 h-4.5 stroke-[1.5]" />}
                        {index === 1 && <Sparkles className="w-4.5 h-4.5 stroke-[1.5]" />}
                        {index === 2 && <Film className="w-4.5 h-4.5 stroke-[1.5]" />}
                      </div>
                    </div>
                  )}

                  {/* Static bottom container for texts */}
                  <div className="relative z-10 w-full mt-auto pt-4 lg:pt-5 shrink-0 lg:h-[105px] flex flex-col justify-end">
                    {/* The Line - purely absolute & transitions opacity only, so it NEVER moves */}
                    <div 
                      className={`absolute top-0 lg:top-auto lg:bottom-[54px] left-0 right-0 h-[1px] bg-[#E5E2DC] transition-opacity duration-500 ease-out ${
                        isActive ? "opacity-100" : "opacity-0 lg:opacity-100"
                      }`} 
                    />

                    {/* Content Area with smooth transitions */}
                    <div className="relative w-full flex flex-col justify-end">
                      {/* 1. Inactive State (Hidden on active) */}
                      <div
                        style={{
                          transitionDelay: "0ms",
                          transitionDuration: !isActive ? "200ms" : "75ms",
                        }}
                        className={`hidden lg:flex flex-col gap-1 w-full transition-opacity ease-out ${
                          !isActive ? "opacity-100 relative" : "opacity-0 pointer-events-none absolute bottom-0 left-0 right-0"
                        }`}
                      >
                        <span className="font-mono text-[8px] text-[#AE9E8E] uppercase tracking-wider block truncate">
                          {service.category}
                        </span>
                        <p className="text-[#8c8275] text-[10px] font-light leading-snug line-clamp-2 max-w-xs">
                          {service.desc}
                        </p>
                      </div>

                      {/* 2. Active State (Shown on active) */}
                      <div
                        style={{
                          transitionDelay: isActive ? "250ms" : "0ms",
                          transitionDuration: isActive ? "250ms" : "75ms",
                        }}
                        className={`w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-3 transition-opacity ease-out ${
                          isActive ? "opacity-100 relative" : "opacity-0 pointer-events-none absolute bottom-0 left-0 right-0"
                        }`}
                      >
                        <div className="flex flex-col gap-1 shrink-0 mr-6 md:mr-10 xl:mr-16">
                          <span className="font-mono text-[9px] text-[#AE9E8E] uppercase tracking-widest whitespace-nowrap">
                            {service.category}
                          </span>
                          <div className="flex items-baseline gap-2 whitespace-nowrap">
                            <span className="font-sans text-lg md:text-xl font-normal text-[#1a1a1a] tracking-tight">
                              {service.title}
                            </span>
                            <span className="font-mono text-[10px] text-[#F05C3B] font-light">
                              ({service.num})
                            </span>
                          </div>
                        </div>
                        <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed w-full md:w-[380px] lg:w-[450px] xl:w-[500px] max-w-full line-clamp-2">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-[#FAF9F5] col-start-3 col-end-4 row-start-1" />
      </div>

      {/* STATEMENT SECTION */}
      <div className="w-full bg-[#E5E2DC] grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] auto-rows-auto gap-[1px]">
        {/* Left Grid Margin */}
        <div className="bg-[#faf9f5] col-start-1 col-end-2 row-start-1" />

        {/* Center Content */}
        <div className="bg-[#faf9f5] col-start-2 col-end-3 row-start-1 pt-48 lg:pt-64 pb-48 lg:pb-64 px-8 md:px-12 lg:px-24 flex flex-col justify-center items-center">
          <p
            ref={principleRef}
            className="text-3xl md:text-5xl xl:text-[62px] font-normal leading-[1.1] md:leading-[1.15] tracking-tight text-center max-w-5xl mx-auto"
          >
            <span className="text-[#b5b5b0] mr-2">“</span>
            {principleWords1.map((word, i) => {
              const fillPercentage = Math.max(
                0,
                Math.min(
                  100,
                  (principleProgress * principleWords1.length - i) * 100,
                ),
              );
              const targetColor = word.h ? "#F05C3B" : "#161616";
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
                  {i < principleWords1.length - 1 && " "}
                </span>
              );
            })}
            <span className="text-[#b5b5b0] ml-1">”</span>
          </p>

          <div className="mt-8 md:mt-12 flex flex-col items-center gap-3">
            <span className="h-[1px] w-6 bg-[#161616]/10" />
            <span className="text-[9px] lg:text-[10px] font-light tracking-[0.4em] lg:tracking-[0.5em] text-[#737370] uppercase">
              KUPI CAKE
            </span>
          </div>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-[#faf9f5] col-start-3 col-end-4 row-start-1" />
      </div>

      {/* --- Section 4: My Work --- */}
      <div
        id="work"
        className="h-auto lg:h-screen lg:min-h-[850px] grid lg:grid-cols-[85px_1fr_85px] grid-cols-[55px_1fr_55px] gap-[1px] bg-[#E5E2DC] overflow-visible lg:overflow-hidden scroll-mt-[55px] lg:scroll-mt-[85px]"
      >
        {/* Left Grid Margin */}
        <div className="bg-[#FAF9F5] col-start-1 col-end-2 row-start-1" />

        {/* Center Content */}
        <div className="bg-[#FAF9F5] col-start-2 col-end-3 row-start-1 pt-16 lg:pt-20 pb-16 lg:pb-36 flex flex-col justify-start items-start w-full h-auto lg:h-screen lg:min-h-[850px] overflow-visible lg:overflow-hidden">
          {/* Section Header */}
          <div className="w-full flex justify-between items-baseline px-6 md:px-12 lg:px-16 mb-4 xl:mb-6 shrink-0">
            <h2
              ref={myWorkRef}
              className="font-bold text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase"
            >
              <span
                style={{
                  backgroundImage: `linear-gradient(to right, #161616 ${Math.min(100, myWorkProgress * 100)}%, #b5b5b0 ${Math.min(100, myWorkProgress * 100)}%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                MY WORK
              </span>
            </h2>
            <span className="font-mono text-[9px] text-[#F05C3B]/60 tracking-wider font-light uppercase hidden md:inline">
              CURATED CASE STUDIES &bull; GRID PRESENTATION
            </span>
          </div>
          {/* Bento Grid */}
          {/* DESKTOP BENTO GRID (SLIDER) */}
          <div 
            ref={bentoContainerRef}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
            className="hidden lg:flex w-full flex-grow lg:min-h-0 border-t border-b border-[#E5E2DC] flex-row gap-[1px] bg-[#E5E2DC] overflow-hidden"
          >
            {/* Left Block (Combined Title & Brief on top, side-by-side Role & App columns at bottom) */}
            <div 
              style={getLeftBlockStyle()}
              className="flex flex-col gap-[1px] bg-[#E5E2DC] lg:h-full justify-stretch overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              
              {/* Top part: Outstanding Title & Brief Explanation combined */}
              <div 
                style={getLeftTopStyle()}
                className={`p-6 lg:p-8 flex flex-col justify-between transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] lg:min-h-[240px] relative overflow-hidden shrink-0 group ${
                  hoveredWorkFrame === "left-top" ? "bg-[#F3F1EC]" : "bg-[#FAF9F5]"
                }`}
              >
                {activeProject === 3 && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/1.%20PROCRASTINATION/step%204.webp"
                      alt="Art Frame 1"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-[1200ms]"
                    />
                    <div className="absolute inset-0 bg-[#161616]/40 backdrop-blur-[0.5px]" />
                  </div>
                )}
                {/* Unified slider controls top right */}
                <div className="absolute right-4 top-4 flex items-center gap-2 z-20">
                  <span className="text-[8px] font-mono tracking-widest text-[#AE9E8E] uppercase select-none hidden sm:inline">CASE SAMPLE</span>
                  <div className="flex items-center bg-white border border-[#E5E2DC] rounded-full p-0.5 shadow-2xs">
                    <button
                      onClick={handlePrevProject}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-[#8c8275] hover:text-[#F05C3B] hover:bg-[#FAF9F5] active:scale-90 transition-all duration-300 cursor-pointer text-xs font-bold"
                      title="Previous Case"
                      aria-label="Previous Case"
                    >
                      ←
                    </button>
                    <span className="font-mono text-[9px] text-[#1a1a1a] font-medium px-2.5 select-none min-w-[34px] text-center">
                      {currentProject.num}/{String(projectSamples.length).padStart(2, '0')}
                    </span>
                    <button
                      onClick={handleNextProject}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-[#8c8275] hover:text-[#F05C3B] hover:bg-[#FAF9F5] active:scale-90 transition-all duration-300 cursor-pointer text-xs font-bold"
                      title="Next Case"
                      aria-label="Next Case"
                    >
                      →
                    </button>
                  </div>
                </div>
                
                <div key={activeProject} className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between w-full h-full pt-4 md:pt-6 animate-project-fade z-10">
                  {/* Left Column: Title styling */}
                  <div className="flex-1 space-y-2">
                    <span className="font-mono text-[9px] md:text-[10px] text-[#F05C3B] uppercase tracking-widest block font-bold">
                      {currentProject.num} // CASE STUDY
                    </span>
                    <h3 className={`font-sans text-2xl lg:text-3xl font-normal leading-[1.1] md:leading-[1.15] tracking-tight ${
                      activeProject === 3 ? "text-white" : "text-[#161616]"
                    }`}>
                      {currentProject.title}
                    </h3>
                    <p className={`text-[10px] font-mono tracking-wider uppercase block ${
                      activeProject === 3 ? "text-white/70" : "text-[#AE9E8E]"
                    }`}>
                      {currentProject.category}
                    </p>
                  </div>

                  {/* Right Column: Brief Explanation side by side, fading out as it goes down */}
                  {activeProject !== 3 && (
                    <div className="flex-1 relative h-32 md:h-36 overflow-hidden md:mt-1 pt-1">
                      <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text whitespace-pre-line">
                        {currentProject.description}
                      </p>
                      {/* Bottom fade away overlay */}
                      <div className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t via-transparent to-transparent pointer-events-none transition-colors duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        hoveredWorkFrame === "left-top" ? "from-[#F3F1EC]" : "from-[#FAF9F5]"
                      }`} />
                    </div>
                  )}
                </div>

                <div className="border-t border-[#E5E2DC]/60 pt-4 flex items-center justify-between mt-2 w-full shrink-0 z-10">
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${
                    activeProject === 3 ? "text-white/60" : "text-[#AE9E8E]"
                  }`}>
                    STUDIO EDITION
                  </span>
                  <button
                    onClick={() => {
                      setActiveView({ type: "project", index: activeProject });
                      window.scrollTo(0, 0);
                      lenisRef.current?.scrollTo(0, { immediate: true });
                    }}
                    className={`group/btn inline-flex items-center gap-5 px-6 py-2.5 rounded-full border transition-all duration-500 ease-out text-xs md:text-sm tracking-wide font-normal bg-transparent cursor-pointer text-left ${
                      activeProject === 3 ? "text-white border-white/25 hover:border-[#F05C3B] hover:text-[#F05C3B] hover:bg-white/10" : "text-[#161616] border-[#161616]/20 hover:border-[#F05C3B] hover:text-[#F05C3B]"
                    }`}
                  >
                    <span>Explore Case</span>
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      className="transition-transform duration-500 ease-out group-hover/btn:translate-x-1.5"
                    >
                      <path
                        d="M1,8 L1,5 L13,5"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10,1.5 L13,5 L10,8.5"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom part: Splits into Role (left) & App Used (right) side-by-side */}
              <div 
                style={getLeftBottomStyle()}
                className="flex-1 flex flex-col sm:flex-row gap-[1px] bg-[#E5E2DC] lg:min-h-0 h-full transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                
                {/* Bottom Left: Role */}
                <div 
                  style={getLeftBottomRoleStyle()}
                  className={`p-6 lg:p-8 flex flex-col justify-between transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] min-h-[110px] lg:min-h-0 [content-visibility:auto] relative overflow-hidden group/role ${
                    hoveredWorkFrame === "left-bottom" ? "bg-[#F3F1EC]" : "bg-[#FAF9F5]"
                  }`}
                >
                  {activeProject === 3 ? (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/Cover%20finish_fix.webp"
                        alt="Art Frame 2"
                        referrerPolicy="no-referrer"
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-[1200ms]"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="font-mono text-[9px] md:text-[10px] text-[#AE9E8E] uppercase tracking-widest block">
                        02 // ROLE
                      </span>
                      <div className="mt-2 animate-project-fade" key={activeProject}>
                        <span className="font-sans text-sm lg:text-base font-normal text-[#1a1a1a] block leading-snug">
                          {currentProject.role}
                        </span>
                        <span className="text-[9px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                          {currentProject.roleDesc}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom Right: Client */}
                <div 
                  style={getLeftBottomClientStyle()}
                  className={`p-6 lg:p-8 flex flex-col justify-between transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] min-h-[110px] lg:min-h-0 [content-visibility:auto] relative overflow-hidden group/client ${
                    hoveredWorkFrame === "left-bottom" ? "bg-[#F3F1EC]" : "bg-[#FAF9F5]"
                  }`}
                >
                  {activeProject === 3 ? (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/2.%20Scary%20Sweetheart/Menungso-cover.webp"
                        alt="Art Frame 3"
                        referrerPolicy="no-referrer"
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-[1200ms]"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="font-mono text-[9px] md:text-[10px] text-[#AE9E8E] uppercase tracking-widest block">
                        03 // CLIENT
                      </span>
                      <div className="mt-2 text-left animate-project-fade" key={activeProject}>
                        <span className="font-sans text-sm lg:text-base font-normal text-[#1a1a1a] block leading-snug">
                          {currentProject.client}
                        </span>
                        <span className="text-[9px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                          {currentProject.clientDesc}
                        </span>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* Right Block (Trimmed image frame with brand color palette and tools at the top) */}
            <div 
              style={getRightBlockStyle()}
              className="flex flex-col gap-[1px] bg-[#E5E2DC] lg:h-full overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              {/* Top part: 25% height premium tray showing Color Palette and Tools */}
              <div 
                style={getRightTopStyle()}
                className={`p-5 lg:p-6 flex flex-row items-center justify-between gap-4 shrink-0 min-h-[95px] border-b border-[#E5E2DC] transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden group/palette ${
                  hoveredWorkFrame === "right-top" ? "bg-[#F3F1EC]" : "bg-[#FAF9F5]"
                }`}
              >
                {activeProject === 3 ? (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/3.%20DEADLINER/6.%20lighting.webp"
                      alt="Art Frame 4"
                      referrerPolicy="no-referrer"
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-[1200ms]"
                    />
                  </div>
                ) : (
                  <>
                    {/* 3 Color Palette */}
                    <div className="flex flex-col justify-center">
                      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest block mb-2 select-none min-h-[14px]">
                        {copiedColor ? (
                          <span className="text-[#F05C3B] font-bold animate-pulse">
                            COPIED {copiedColor}!
                          </span>
                        ) : (
                          <span className="text-[#AE9E8E]">04 // PALETTE</span>
                        )}
                      </span>
                      <div className="flex items-center gap-3 animate-project-fade" key={activeProject}>
                        {currentProject.palette.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleCopyColor(color)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/10 shadow-xs transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FAF9F5] focus:ring-offset-2"
                            style={{
                              backgroundColor: color,
                              "--tw-ring-offset-color": color,
                            } as React.CSSProperties}
                            title={`Copy ${currentProject.paletteNames[idx]} (${color})`}
                            aria-label={`Copy ${currentProject.paletteNames[idx]} (${color})`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* App Used / Tools */}
                    <div className="flex flex-col justify-center items-end">
                      <span className="font-mono text-[9px] md:text-[10px] text-[#AE9E8E] uppercase tracking-widest block mb-2 select-none">
                        05 // TOOLS
                      </span>
                      <div className="flex items-center gap-2 animate-project-fade" key={activeProject}>
                        {currentProject.tools.map((tool, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-2 border border-[#E5E2DC]/80 text-[#8c8275] hover:text-[#F05C3B] hover:border-[#F05C3B]/50 transition-all duration-300 rounded-full shadow-2xs cursor-help"
                            title={tool}
                          >
                            {getToolIcon(tool)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom part: 75% height sample frame */}
              <div 
                style={getRightBottomStyle()}
                onTouchStart={() => setSampleTouched(true)}
                className={`group relative flex-grow min-h-[220px] overflow-visible flex flex-col transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  hoveredWorkFrame === "right-bottom-image" ? "bg-[#F3F1EC]" : "bg-[#FAF9F5]"
                }`}
              >
                {/* Background clip wrapper to keep scale/blur restricted inside the frame */}
                <div className="absolute inset-0 overflow-hidden rounded-none z-0">
                  {/* Blueprint dot pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none z-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(#AE9E8E 1.2px, transparent 1.2px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  {currentProject.image.endsWith(".webm") ? (
                    <video
                      src={currentProject.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      key={activeProject}
                      className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out animate-project-fade ${
                        activeProject === 3 ? "blur-none" : "blur-[6px]"
                      } ${
                        activeProject === 0
                          ? "scale-[1.75]"
                          : activeProject === 2
                          ? "scale-[2.0]"
                          : "scale-100"
                      } ${
                        activeProject === 0
                          ? "object-right origin-right translate-x-[15%]"
                          : activeProject === 2
                          ? "translate-x-[5%]"
                          : "object-center"
                      }`}
                    />
                  ) : (
                    <img
                      src={currentProject.image}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      alt={`${currentProject.title} Showcase`}
                      key={activeProject}
                      className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out animate-project-fade ${
                        activeProject === 3 ? "blur-none" : "blur-[6px]"
                      } ${
                        activeProject === 0
                          ? "scale-[1.75]"
                          : activeProject === 2
                          ? "scale-[2.0]"
                          : "scale-100"
                      } ${
                        activeProject === 0
                          ? "object-right origin-right translate-x-[15%]"
                          : activeProject === 2
                          ? "translate-x-[5%]"
                          : "object-center"
                      }`}
                    />
                  )}
                </div>

                {/* Overlapping foreground character image */}
                {activeProject !== 3 && (
                  <div className="absolute inset-x-0 bottom-0 top-[-60px] md:top-[-80px] lg:top-[-90px] xl:top-[-110px] z-10 pointer-events-none flex items-end justify-center select-none overflow-visible">
                      <img
                        src={currentProject.foregroundImage}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        alt={`${currentProject.title} Character Foreground`}
                        key={`fg-${activeProject}`}
                       className={`h-full w-auto object-contain object-bottom animate-project-fade transition-all duration-[1400ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom ${
                         activeProject === 0 ? "scale-[0.85] translate-x-0" : activeProject === 2 ? "scale-[0.85] translate-x-[20%]" : "scale-[1.05]"
                       }`}
                     />
                  </div>
                )}

                {/* Floating side navigation buttons inside image area */}

                <button
                  onClick={handleNextProject}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 text-[#1a1a1a] hover:bg-[#F05C3B] hover:text-white hover:scale-110 active:scale-90 border border-[#E5E2DC] flex items-center justify-center shadow-sm transition-all duration-500 z-30 cursor-pointer hidden sm:flex font-bold ${
                    sampleTouched ? "opacity-100 scale-102" : "opacity-0 group-hover:opacity-100"
                  }`}
                  aria-label="Next sample"
                  title="Next Case"
                >
                  →
                </button>

                {/* Page dot indicator overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-1.5 z-20 bg-[#1a1a1a]/45 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/5">
                  {projectSamples.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveProject(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                        idx === activeProject ? "w-6 bg-[#F05C3B]" : "w-1.5 bg-white/50 hover:bg-white"
                      }`}
                      title={`Switch to Sample ${idx + 1}`}
                      aria-label={`Switch to Sample ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Custom circular 'explore' button with arrow matching user request - smaller & transparent */}
                <button
                  onClick={() => {
                    setActiveView({ type: "project", index: activeProject });
                    window.scrollTo(0, 0);
                    lenisRef.current?.scrollTo(0, { immediate: true });
                  }}
                  className="absolute bottom-6 right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/30 hover:border-white/80 bg-white/10 hover:bg-white/25 backdrop-blur-[2px] text-white flex items-center justify-center transition-all duration-300 z-20 shadow-xs hover:scale-105 active:scale-95 cursor-pointer animate-project-fade group/explore"
                  aria-label="Explore Case Studies"
                  title="Explore Case Studies"
                >
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75] transition-transform duration-300 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP BOTTOM CONTROLS ON WHITE SPACE */}
          <div className="hidden lg:flex w-full items-center justify-between mt-8 px-6 md:px-12 lg:px-16 shrink-0 z-20">
            {/* Left side: Active Case indicator */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-[#AE9E8E] uppercase tracking-widest select-none">
                ACTIVE FOCUS
              </span>
              <div className="flex items-center gap-1.5 bg-[#FAF9F5] p-1 rounded-full border border-[#E5E2DC]/40">
                {projectSamples.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveProject(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      idx === activeProject ? "w-6 bg-[#F05C3B]" : "w-1.5 bg-[#AE9E8E]/30 hover:bg-[#F05C3B]/50"
                    }`}
                    title={`Switch to Sample ${idx + 1}`}
                    aria-label={`Switch to Sample ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right side: Previous & Next triggers */}
            <div className="flex items-center gap-4">
              {/* Previous button */}
              <button
                onClick={handlePrevProject}
                className="group/prevcase flex items-center gap-4 py-2.5 px-5 rounded-full border border-[#161616]/10 hover:border-[#F05C3B] bg-[#FAF9F5] hover:bg-white shadow-2xs hover:shadow-xs transition-all duration-500 ease-out cursor-pointer text-left h-[48px]"
                title="Go to Previous Case Study"
                aria-label="Go to Previous Case Study"
              >
                <div className="w-8 h-8 rounded-full border border-[#161616]/10 group-hover/prevcase:border-[#F05C3B] group-hover/prevcase:bg-[#F05C3B] group-hover/prevcase:text-white flex items-center justify-center transition-all duration-500 text-[#161616]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-500 ease-out group-hover/prevcase:-translate-x-0.5"
                  >
                    <path
                      d="M10,6 L2,6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5,3 L2,6 L5,9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col pr-1">
                  <span className="font-mono text-[8px] text-[#AE9E8E] uppercase tracking-[0.2em] leading-none mb-1 select-none">
                    PREV CASE
                  </span>
                  <span className="font-sans text-[10px] font-normal text-[#AE9E8E] group-hover/prevcase:text-[#161616] transition-colors duration-300 truncate max-w-[120px] uppercase">
                    {projectSamples[(activeProject - 1 + projectSamples.length) % projectSamples.length].title}
                  </span>
                </div>
              </button>

              {/* Next button */}
              <button
                onClick={handleNextProject}
                className="group/nextcase flex items-center gap-4 py-2.5 px-5 rounded-full border border-[#161616]/10 hover:border-[#F05C3B] bg-[#FAF9F5] hover:bg-white shadow-2xs hover:shadow-xs transition-all duration-500 ease-out cursor-pointer text-left h-[48px]"
                title="Skip to Next Case Study"
                aria-label="Skip to Next Case Study"
              >
                <div className="flex flex-col pl-1">
                  <span className="font-mono text-[8px] text-[#AE9E8E] uppercase tracking-[0.2em] leading-none mb-1 select-none text-right">
                    NEXT CASE
                  </span>
                  <span className="font-sans text-[10px] font-normal text-[#161616] group-hover/nextcase:text-[#F05C3B] transition-colors duration-300 truncate max-w-[120px] uppercase text-right">
                    {projectSamples[(activeProject + 1) % projectSamples.length].title}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#161616]/10 group-hover/nextcase:border-[#F05C3B] group-hover/nextcase:bg-[#F05C3B] group-hover/nextcase:text-white flex items-center justify-center transition-all duration-500 text-[#161616]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-500 ease-out group-hover/nextcase:translate-x-0.5"
                  >
                    <path
                      d="M2,6 L10,6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7,3 L10,6 L7,9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* MOBILE ALL PROJECTS (VERTICAL STACK) */}
          <div className="flex lg:hidden flex-col gap-10 w-full pt-4 md:pt-6 bg-[#FAF9F5]">
            {projectSamples.map((project, idx) => (
              <div
                key={idx}
                className="flex flex-col border border-[#E5E2DC] bg-[#FAF9F5] rounded-2xl overflow-hidden shadow-3xs hover:shadow-2xs transition-all duration-300"
              >
                {/* Image Showcase frame */}
                <div className="relative aspect-video w-full overflow-visible bg-slate-100 border-b border-[#E5E2DC]">
                  {/* Background clipped area */}
                  <div className="absolute inset-0 overflow-hidden rounded-t-2xl z-0">
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none z-10"
                      style={{
                        backgroundImage: "radial-gradient(#AE9E8E 1.2px, transparent 1.2px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    {project.image.endsWith(".webm") ? (
                      <video
                        src={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full h-full object-cover transition-all duration-[500ms] ${
                          idx === 3 ? "blur-none" : "blur-[6px]"
                        } ${
                          idx === 0
                            ? "scale-[1.75]"
                            : idx === 2
                            ? "scale-[2.0]"
                            : "scale-100"
                        } ${
                          idx === 0
                            ? "object-right origin-right translate-x-[15%]"
                            : idx === 2
                            ? "translate-x-[5%]"
                            : "object-center"
                        }`}
                      />
                    ) : (
                      <img
                        src={project.image}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        alt={`${project.title} Showcase`}
                        className={`w-full h-full object-cover transition-all duration-[500ms] ${
                          idx === 3 ? "blur-none" : "blur-[6px]"
                        } ${
                          idx === 0
                            ? "scale-[1.75]"
                            : idx === 2
                            ? "scale-[2.0]"
                            : "scale-100"
                        } ${
                          idx === 0
                            ? "object-right origin-right translate-x-[15%]"
                            : idx === 2
                            ? "translate-x-[5%]"
                            : "object-center"
                        }`}
                      />
                    )}
                  </div>

                  {/* Overlapping foreground character image on mobile */}
                  {idx !== 3 && (
                    <div className="absolute inset-x-0 bottom-0 top-[-40px] z-10 pointer-events-none flex items-end justify-center select-none overflow-visible">
                      <img
                        src={project.foregroundImage}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        alt={`${project.title} Character Foreground Mobile`}
                        className={`h-full w-auto object-contain object-bottom origin-bottom ${
                          idx === 0 ? "scale-[0.85] translate-x-0" : idx === 2 ? "scale-[0.85] translate-x-[20%]" : "scale-[1.05]"
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Project Meta Information Info Body */}
                <div className="p-5 md:p-7 flex flex-col gap-3">
                  <span className="font-mono text-[9px] md:text-[10px] text-[#F05C3B] uppercase tracking-widest block font-semibold">
                    {project.num} // CASE STUDY
                  </span>
                  <h3 className="font-sans text-xl md:text-2xl font-normal tracking-tight text-[#161616] uppercase">
                    {project.title}
                  </h3>
                  {idx !== 3 && (
                    <p className="text-[#AE9E8E] text-[8.5px] font-mono tracking-wider uppercase block">
                      {project.category}
                    </p>
                  )}
                  
                  <div className="relative mt-1">
                    {/* Fading text content */}
                    {idx !== 3 && (
                      <div className="relative overflow-hidden pb-1">
                        <p className="text-[#5a564e] text-xs md:text-sm font-light leading-relaxed select-text line-clamp-2 pr-20 xs:pr-24 sm:pr-32">
                          {project.description}
                        </p>
                        <div className="absolute inset-x-0 bottom-0 h-4.5 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/40 to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Integrated Overlapping Explore Button */}
                    <div className={`absolute bottom-0 right-0 z-10 pl-6 pt-1 bg-[#FAF9F5] ${
                      idx === 3 ? "relative mt-2" : "absolute bg-gradient-to-l from-[#FAF9F5] via-[#FAF9F5] to-transparent"
                    }`}>
                      <button
                        onClick={() => {
                          setActiveView({ type: "project", index: idx });
                          window.scrollTo(0, 0);
                          lenisRef.current?.scrollTo(0, { immediate: true });
                        }}
                        className="group/btn inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-full border border-[#161616]/15 bg-[#161616]/5 hover:bg-[#F05C3B] hover:text-white hover:border-[#F05C3B] transition-all duration-300 text-[10px] tracking-wide font-normal text-[#161616] cursor-pointer"
                      >
                        <span>Explore Case</span>
                        <ArrowUpRight className="w-3 h-3 stroke-[1.75] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Role and Client dynamic grids */}
                {idx !== 3 && (
                  <div className="grid grid-cols-2 bg-[#E5E2DC] gap-[1px] border-t border-b border-[#E5E2DC]">
                    <div className="bg-[#FAF9F5] p-4 flex flex-col justify-start">
                      <span className="font-mono text-[9px] md:text-[10px] text-[#AE9E8E] uppercase tracking-widest block mb-1">
                        ROLE
                      </span>
                      <span className="font-sans text-xs font-semibold text-[#161616]">
                        {project.role}
                      </span>
                      <span className="text-[7.5px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                        {project.roleDesc}
                      </span>
                    </div>

                    <div className="bg-[#FAF9F5] p-4 flex flex-col justify-start">
                      <span className="font-mono text-[9px] md:text-[10px] text-[#AE9E8E] uppercase tracking-widest block mb-1">
                        CLIENT
                      </span>
                      <span className="font-sans text-xs font-semibold text-[#161616]">
                        {project.client}
                      </span>
                      <span className="text-[7.5px] font-mono text-[#AE9E8E] uppercase tracking-widest block mt-0.5">
                        {project.clientDesc}
                      </span>
                    </div>
                  </div>
                )}

                {/* Palette Swatches & Tools */}
                {idx !== 3 && (
                  <div className="p-5 md:p-7 bg-[#FAF9F5] flex flex-col gap-5">
                    {/* Swatches (Left) and Tools (Right) */}
                    <div className="flex justify-between items-center w-full">
                      {/* Palette */}
                      <div>
                        <span className="font-mono text-[9px] md:text-[10px] text-[#AE9E8E] uppercase tracking-widest block mb-1.5 select-none font-semibold">
                          SWATCHES
                        </span>
                        <div className="flex items-center gap-1.5">
                          {project.palette.map((color, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleCopyColor(color)}
                              className="w-6 h-6 rounded-full border border-black/10 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
                              style={{ backgroundColor: color }}
                              title={`Copy ${project.paletteNames[cIdx]} swatches color hex`}
                              aria-label={`Copy swatches color ${color}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Tools */}
                      <div className="text-right">
                        <span className="font-mono text-[9px] md:text-[10px] text-[#AE9E8E] uppercase tracking-widest block mb-1.5 select-none font-semibold">
                          TOOLS
                        </span>
                        <div className="flex items-center justify-end gap-1.5">
                          {project.tools.map((tool, tIdx) => (
                            <div
                              key={tIdx}
                              className="bg-white p-1.5 border border-[#E5E2DC]/80 text-[#8c8275] rounded-full shadow-3xs"
                              title={tool}
                            >
                              {getToolIcon(tool)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-[#FAF9F5] col-start-3 col-end-4 row-start-1" />
      </div>

      {/* --- New Blank Section: More Work --- */}
      <div
        id="more-work-section"
        ref={moreWorkRef}
        className="relative w-full overflow-hidden bg-[#FAF9F5] grid lg:grid-cols-[85px_1fr_85px] grid-cols-[55px_1fr_55px] gap-[1px] border-b border-[#E5E2DC]"
      >
        {/* Full-bleed Parallax Background Layer across left, center, and right margins */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/MY%20LIFE%20ONE%20DAY.webp"
            referrerPolicy="no-referrer"
            className="absolute left-0 w-full h-[150%] -top-[25%] object-cover opacity-[0.65] pointer-events-none select-none mix-blend-multiply"
            style={{
              transform: `translateY(${moreWorkParallaxY}px)`,
            }}
            alt="More work background artwork"
          />
          {/* Top and Bottom Fade Overlays removed as requested */}
        </div>

        {/* Mathematically perfectly-aligned vertical grid lines */}
        <div className="absolute inset-0 grid lg:grid-cols-[85px_1fr_85px] grid-cols-[55px_1fr_55px] gap-[1px] pointer-events-none z-20">
          <div className="col-start-1 col-end-2 relative h-full bg-transparent">
            <div className="absolute top-0 bottom-0 -right-[1px] w-[1px] bg-[#F0EEEB]" />
          </div>
          <div className="col-start-2 col-end-3 h-full bg-transparent" />
          <div className="col-start-3 col-end-4 relative h-full bg-transparent">
            <div className="absolute top-0 bottom-0 -left-[1px] w-[1px] bg-[#F0EEEB]" />
          </div>
        </div>

        {/* Left Grid Margin */}
        <div className="col-start-1 col-end-2 py-20 md:py-28 relative z-10" />

        {/* Center Content */}
        <div className="col-start-2 col-end-3 py-20 md:py-28 flex flex-col justify-center items-center w-full relative z-10 min-h-[300px]">
          {/* Interactive Actions */}
          <div className="flex flex-col items-center gap-4">
            <button
              id="more-work-btn"
              onClick={() => {
                const msg = document.getElementById("more-work-status-msg");
                if (msg) {
                  msg.classList.remove("opacity-0", "translate-y-1");
                  msg.classList.add("opacity-100", "translate-y-0");
                  setTimeout(() => {
                    msg.classList.remove("opacity-100", "translate-y-0");
                    msg.classList.add("opacity-0", "translate-y-1");
                  }, 3000);
                }
              }}
              className="group/btn inline-flex items-center gap-6 px-10 py-4 md:py-5 rounded-full border border-[#161616]/15 hover:border-[#F05C3B] text-xs md:text-sm tracking-[0.25em] uppercase font-bold text-[#161616] hover:text-[#F05C3B] transition-all duration-500 ease-out cursor-pointer bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] hover:shadow-xs relative"
            >
              <span>MORE WORK</span>
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                className="transition-transform duration-500 ease-out group-hover/btn:translate-x-2 text-[#737370] group-hover/btn:text-[#F05C3B]"
              >
                <path
                  d="M1,5 L13,5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9,1.5 L13,5 L9,8.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            <span
              id="more-work-status-msg"
              className="font-mono text-[9px] text-[#AE9E8E] tracking-[0.3em] uppercase opacity-0 translate-y-1 transition-all duration-500 pointer-events-none select-none font-medium"
            >
              NEW CASE STUDIES IN DEVELOPMENT
            </span>
          </div>
        </div>

        {/* Right Grid Margin */}
        <div className="col-start-3 col-end-4 py-20 md:py-28 relative z-10" />
      </div>

      {/* --- Section 5: Contact (Grid Style) --- */}
      <div
        id="contact"
        className="w-full bg-[#E5E2DC] grid lg:grid-cols-[85px_1fr_85px] grid-cols-[55px_1fr_55px] auto-rows-auto gap-[1px] scroll-mt-[55px] lg:scroll-mt-[85px]"
      >
        {/* Left Grid Margin */}
        <div className="bg-[#faf9f5] col-start-1 col-end-2 row-start-1" />

        {/* Center Content */}
        <div className="bg-[#faf9f5] col-start-2 col-end-3 row-start-1 pt-32 lg:pt-48 pb-32 lg:pb-48 flex flex-col justify-start items-start w-full">
          <h2
            ref={contactTitleRef}
            className="px-6 md:px-12 lg:px-24 font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase mb-16 md:mb-24 lg:mb-32"
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

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[#E5E2DC] border-t border-b border-[#E5E2DC]">
            {/* Box 1: Status & Info */}
            <div className="bg-[#faf9f5] hover:bg-white transition-colors duration-500 p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[300px] lg:min-h-[380px]">
              <div>
                <span className="text-[#8a8a85] font-mono text-[10px] md:text-xs uppercase tracking-wider block mb-4">
                  01 // AVAILABILITY
                </span>
                <h3 className="text-[#1a1a1a] font-normal text-2xl md:text-3xl lg:text-[40px] leading-tight mb-6">
                  Open for new projects and remote collaborations.
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-8">
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
            <div className="bg-[#faf9f5] hover:bg-white transition-colors duration-500 p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[300px] lg:min-h-[380px] group/contact-box relative overflow-hidden">
              <div>
                <span className="text-[#8a8a85] font-mono text-[10px] md:text-xs uppercase tracking-wider block mb-4">
                  02 // DIRECT INQUIRY
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("kupicake@gmail.com");
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-[#1a1a1a] hover:text-[#F05C3B] font-normal text-2xl md:text-3xl lg:text-[40px] leading-tight text-left block break-all transition-colors duration-500 bg-transparent border-none p-0 cursor-pointer select-all"
                    >
                      kupicake@gmail.com
                    </button>
                    {copied && (
                      <span className="text-xs font-mono text-[#F05C3B] uppercase tracking-wider animate-pulse whitespace-nowrap">
                        [ copied! ]
                      </span>
                    )}
                  </div>
                  
                  <a
                    href="https://wa.me/6289673731449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#737370] hover:text-[#F05C3B] font-normal text-xl md:text-2xl lg:text-[28px] leading-tight block transition-colors duration-500"
                  >
                    +62 896 7373 1449
                  </a>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center w-full mt-8 flex-wrap gap-4 z-10 relative">
                {/* Social Links on Left */}
                <div className="flex items-center gap-3">
                  {[
                    {
                      Icon: Instagram,
                      href: "https://www.instagram.com/kupicake_/",
                      label: "Instagram",
                    },
                    {
                      imgSrc: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/LOGO%20KUPICAKE/VGen%20Badge%20-%20outline.webp",
                      href: "https://vgen.co/kupicake_",
                      label: "VGen",
                    },
                    {
                      Icon: Linkedin,
                      href: "https://www.linkedin.com/in/riskirw17",
                      label: "LinkedIn",
                    },
                  ].map(({ Icon, imgSrc, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#e5e2dc] bg-transparent hover:bg-[#F05C3B]/5 hover:border-[#F05C3B] hover:text-[#F05C3B] text-[#737370] transition-all duration-300 flex items-center justify-center group"
                    >
                      {imgSrc ? (
                        <div className="relative w-4 h-4 md:w-5 md:h-5">
                          <img 
                            src={imgSrc} 
                            alt={label} 
                            className="absolute inset-0 w-full h-full object-contain vgen-icon-nav-idle opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <img 
                            src={imgSrc} 
                            alt={label} 
                            className="absolute inset-0 w-full h-full object-contain vgen-icon-nav-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        Icon && <Icon className="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-[#faf9f5] col-start-3 col-end-4 row-start-1" />
      </div>
        </>
      ) : activeView.type === "about" ? (
        <Suspense fallback={
          <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center font-sans font-light text-xs text-[#8c8275] tracking-widest uppercase select-none">
            <div className="w-8 h-8 rounded-full border border-[#E5E2DC] border-t-[#F05C3B] animate-spin mb-4" />
            Loading Profile...
          </div>
        }>
          <AboutPage
            onBack={() => {
              setActiveView({ type: "home" });
              window.scrollTo(0, 0);
              lenisRef.current?.scrollTo(0, { immediate: true });
            }}
          />
        </Suspense>
      ) : (
        <Suspense fallback={
          <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center font-sans font-light text-xs text-[#8c8275] tracking-widest uppercase select-none">
            <div className="w-8 h-8 rounded-full border border-[#E5E2DC] border-t-[#F05C3B] animate-spin mb-4" />
            Loading Case Study...
          </div>
        }>
          <ProjectCasePage
            project={projectSamples[activeView.index]}
            projectIndex={activeView.index}
            totalProjects={projectSamples.length}
            scrollY={scrollY}
            onBack={() => {
              setActiveView({ type: "home" });
              window.scrollTo(0, 0);
              lenisRef.current?.scrollTo(0, { immediate: true });
            }}
            onPrev={() => {
              const prevIdx = activeView.index === 0 ? projectSamples.length - 1 : activeView.index - 1;
              setActiveView({ type: "project", index: prevIdx });
              window.scrollTo(0, 0);
              lenisRef.current?.scrollTo(0, { immediate: true });
            }}
            onNext={() => {
              const nextIdx = activeView.index === projectSamples.length - 1 ? 0 : activeView.index + 1;
              setActiveView({ type: "project", index: nextIdx });
              window.scrollTo(0, 0);
              lenisRef.current?.scrollTo(0, { immediate: true });
            }}
            getToolIcon={getToolIcon}
          />
        </Suspense>
      )}
      {/* Portrait Warning Screen */}
      {showRotateWarning && (
        <div className="fixed inset-0 bg-[#FAF9F5] z-[99999] flex flex-col items-center justify-center p-8 text-center select-none pointer-events-auto">
          {/* Decorative Blueprint dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#AE9E8E 1.2px, transparent 1.2px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center max-w-xs">
            {/* Rotating phone icon */}
            <div className="w-16 h-16 rounded-full border border-[#E5E2DC] flex items-center justify-center text-[#F05C3B] mb-6 bg-white shadow-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 animate-[spin_4s_linear_infinite]"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <path d="M12 18h.01" />
                <path d="m15 6-3-3-3 3" />
                <path d="M12 3v8" />
              </svg>
            </div>
            
            <span className="font-mono text-[9px] text-[#F05C3B] tracking-[0.3em] uppercase mb-2 block font-semibold">
              PORTRAIT DETECTED
            </span>
            <h2 className="font-sans text-xl font-normal text-[#161616] tracking-tight uppercase leading-snug mb-3">
              Please Rotate Your Device
            </h2>
            <p className="text-[#8c8275] font-mono text-[10px] leading-relaxed uppercase">
              To browse this portfolio container and interact with simulated playbeds correctly, please rotate to landscape.
            </p>
          </div>
        </div>
      )}

      {/* Custom Inverse Dot Cursor */}
      <div ref={cursorRef} className="custom-dot-cursor" />
    </main>
  );
}
