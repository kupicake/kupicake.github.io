import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Play, 
  Maximize2,
  Volume2,
  VolumeX,
  Loader2,
  ArrowUpRight,
  Copy,
  Instagram,
  Linkedin
} from "lucide-react";

interface GalleryPageProps {
  onBack: () => void;
  onNavigateToProject: (index: number) => void;
  scrollY?: number;
}

interface Artwork {
  id: string;
  title: string;
  type: "image" | "video" | "folder";
  url: string;
  aspect: string; // Tailwind aspect class
  scenes?: string[];
}

const GALLERY_ITEMS: Artwork[] = [
  {
    id: "my-life-one-day",
    title: "My Life One Day",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/MY%20LIFE%20ONE%20DAY.webp",
    aspect: "aspect-[4/5]",
  },
  {
    id: "budaya-reog",
    title: "Budaya Reog - Desa Sumber",
    type: "folder",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/Budaya%20Reog%20-%20Desa%20Sumber/3.webp",
    aspect: "aspect-[4/3]",
    scenes: Array.from({ length: 10 }, (_, i) => 
      `https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/Budaya%20Reog%20-%20Desa%20Sumber/${i + 1}.webp`
    )
  },
  {
    id: "violet-evergarden",
    title: "Violet Evergarden",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/7.%20Violet%20Evergarden.webp",
    aspect: "aspect-[16/9]",
  },
  {
    id: "main-hero-illustration",
    title: "Procrastination",
    type: "video",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/main%20illus_hero%20section.webm",
    aspect: "aspect-video",
  },
  {
    id: "escoffier",
    title: "Escoffier - Genshin Impact",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/Escoffier%20dadi.webp",
    aspect: "aspect-[4/3]",
  },
  {
    id: "gawr-gura",
    title: "Gawr Gura - Hololive",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/Gawr%20Gura.webp",
    aspect: "aspect-[4/5]",
  },
  {
    id: "illustration-mascot",
    title: "The Lake",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/Illustration.webp",
    aspect: "aspect-square",
  },
  {
    id: "reading-is-elegance",
    title: "Reading is Elegance",
    type: "video",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/Reading%20is%20Elegance.webm",
    aspect: "aspect-[3/4]",
  },
  {
    id: "the-memories",
    title: "The Memories",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/THE%20MEMORIES%20UPDATED.webp",
    aspect: "aspect-[4/5]",
  },
  {
    id: "logo-dadi",
    title: "Moluska Studio Logo",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/logo%20dadi.webp",
    aspect: "aspect-square",
  },
  {
    id: "qiqi",
    title: "Qiqi - Genshin Impact",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/qiqi.webp",
    aspect: "aspect-square",
  },
  {
    id: "screen-menu-concept",
    title: "Deadliner",
    type: "video",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/screen%20menu-final.webm",
    aspect: "aspect-video",
  },
  {
    id: "scary-sweetheart-cover",
    title: "Scary Sweetheart - Webtoon",
    type: "image",
    url: "https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/4.%20GALERY/Cover%20finish_fix.webp",
    aspect: "aspect-[4/5]",
  },
];

const GalleryCard = ({ 
  item, 
  onFolderClick, 
  onImageClick, 
  onNavigateToProject 
}: { 
  key?: string;
  item: Artwork; 
  onFolderClick: (item: Artwork) => void;
  onImageClick: (item: Artwork) => void;
  onNavigateToProject: (index: number) => void;
}) => {
  const isHighlighted = item.id === "main-hero-illustration" || item.id === "screen-menu-concept" || item.id === "scary-sweetheart-cover";
  
  let caseIndex = -1;
  let caseNum = "";
  if (item.id === "main-hero-illustration") {
    caseIndex = 0;
    caseNum = "1";
  } else if (item.id === "scary-sweetheart-cover") {
    caseIndex = 1;
    caseNum = "2";
  } else if (item.id === "screen-menu-concept") {
    caseIndex = 2;
    caseNum = "3";
  }

  return (
    <div 
      className={`w-full group relative bg-neutral-900 overflow-hidden transition-all duration-500 cursor-pointer border-b border-[#E5E2DC]`}
      onClick={() => {
        if (isHighlighted) {
          onNavigateToProject(caseIndex);
        } else if (item.type === "folder") {
          onFolderClick(item);
        } else {
          onImageClick(item);
        }
      }}
    >
      {/* Media Container with Aspect Ratio */}
      <div className={`relative w-full ${item.aspect} overflow-hidden bg-neutral-900`}>
        {item.type === "video" ? (
          <video
            src={item.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          />
        ) : (
          <img
            src={item.url}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            loading="lazy"
          />
        )}

        {/* Corner indicator icon for non-highlighted single items */}
        {!isHighlighted && (
          <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Folder Indicator for multi-scenes */}
        {item.type === "folder" && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#F05C3B] rounded-full text-[9px] font-mono font-bold tracking-wider text-white uppercase shadow-sm">
            {item.scenes?.length || 0} SCENES // FOLDER
          </div>
        )}

        {/* Dynamic Overlay Tag for highlighted items */}
        {isHighlighted && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/65 backdrop-blur-md border border-white/10 rounded-full text-[8px] md:text-[9px] font-mono font-bold tracking-wider text-[#F05C3B] uppercase shadow-sm flex items-center gap-1.5 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05C3B] animate-pulse" />
            CASE STUDY {caseNum}
          </div>
        )}

        {/* Normal overlay footer if not highlighted */}
        {!isHighlighted && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end pointer-events-none">
            <span className="font-mono text-[9px] text-[#F05C3B] tracking-widest uppercase font-semibold mb-1">
              {item.type === "video" ? "MOTION VIDEO" : item.type === "folder" ? "ILLUSTRATION SERIES" : "ILLUSTRATION"}
            </span>
            <h3 className="font-sans text-sm md:text-base font-semibold text-white tracking-wide leading-tight">
              {item.title}
            </h3>
          </div>
        )}

        {/* For highlighted items: beautiful bottom gradient with title, case label, and arrow button */}
        {isHighlighted && (
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-16 flex items-end justify-between gap-4">
            <div className="text-left">
              <span className="font-mono text-[9px] text-[#F05C3B] tracking-widest uppercase font-bold block mb-1">
                PROJECT CASE {caseNum}
              </span>
              <h3 className="font-sans text-sm md:text-base font-bold text-white tracking-tight leading-tight">
                {item.title}
              </h3>
            </div>

            <div
              className="group/case-btn flex items-center justify-start h-10 md:h-11 rounded-full border border-white/20 hover:border-[#F05C3B] hover:text-[#F05C3B] bg-white/10 backdrop-blur-md text-white transition-all duration-500 ease-out overflow-hidden w-10 hover:w-36 md:w-11 md:hover:w-42 shrink-0 shadow-lg"
              aria-label={`Go to case study ${caseNum}`}
            >
              <div className="flex items-center w-full h-full">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out group-hover/case-btn:rotate-45">
                  <ArrowUpRight className="w-4 h-4 text-current" />
                </div>
                <span className="opacity-0 group-hover/case-btn:opacity-100 transition-all duration-500 ease-out font-mono text-[8px] md:text-[9px] uppercase tracking-widest font-bold whitespace-nowrap text-white group-hover/case-btn:text-[#F05C3B] pr-4 pl-1 -translate-x-2 group-hover/case-btn:translate-x-0">
                  VIEW CASE {caseNum}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function GalleryPage({ onBack, onNavigateToProject, scrollY }: GalleryPageProps) {
  const [activeFolder, setActiveFolder] = useState<Artwork | null>(null);
  const [folderSceneIndex, setFolderSceneIndex] = useState<number>(0);
  const [singleLightboxItem, setSingleLightboxItem] = useState<Artwork | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  // Copy indicator states for Contact section
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  // Scroll tracking for parallax contact section
  const [localScrollY, setLocalScrollY] = useState(0);
  useEffect(() => {
    if (scrollY !== undefined) return;
    const handleScroll = () => {
      setLocalScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const currentScroll = scrollY !== undefined ? scrollY : localScrollY;

  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contactTitleRef = useRef<HTMLHeadingElement>(null);
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const openFolder = (item: Artwork) => {
    setActiveFolder(item);
    setFolderSceneIndex(0);
    setIsMediaLoading(true);
  };

  const closeFolder = () => {
    setActiveFolder(null);
  };

  const nextScene = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeFolder?.scenes) return;
    setIsMediaLoading(true);
    setFolderSceneIndex((prev) => (prev + 1) % activeFolder.scenes!.length);
  };

  const prevScene = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeFolder?.scenes) return;
    setIsMediaLoading(true);
    setFolderSceneIndex((prev) => 
      prev === 0 ? activeFolder.scenes!.length - 1 : prev - 1
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeFolder) {
        if (e.key === "ArrowRight") nextScene();
        if (e.key === "ArrowLeft") prevScene();
        if (e.key === "Escape") closeFolder();
      } else if (singleLightboxItem) {
        if (e.key === "Escape") setSingleLightboxItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFolder, singleLightboxItem]);

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

          {/* Center: Title */}
          <div className="px-6 flex justify-between items-center">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#737370] uppercase font-bold">
              ARTWORKS & EXPLORATIONS // ARCHIVE
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

        {/* Content wrapper with margin bands */}
        <main className="grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] min-h-[calc(100vh-85px)] bg-[#faf9f5]">
          {/* Left spacer column */}
          <div className="col-start-1 col-end-2 border-r border-[#e5e5e2]/30 h-full" />

          {/* Center content column */}
          <div className="col-start-2 col-end-3 py-12 md:py-16 w-full text-left flex flex-col">
            
            {/* Section Header */}
            <div className="mb-12 md:mb-16 border-b border-[#e5e5e2] pb-8 px-6 md:px-12 lg:px-20">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[#F05C3B] uppercase font-bold block mb-3">
              CREATIVE PORTFOLIO
            </span>
            <h1 className="font-sans text-3xl md:text-5xl font-light tracking-tight text-[#1a1a1a] leading-tight">
              COLLECTED GALLERY <br />
              <span className="text-[#AE9E8E]">ARTWORKS & CONCEPTS</span>
            </h1>
          </div>

          {/* Premium 2-Column Responsive Grid Layout with zero padding, touching the edges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#E5E2DC] items-stretch w-full px-0 border-y border-[#E5E2DC]">
            
            {/* Column 1 */}
            <div className="flex flex-col bg-[#faf9f5] h-full justify-start">
              {[
                GALLERY_ITEMS.find(item => item.id === "main-hero-illustration"), // Case Study 1
                GALLERY_ITEMS.find(item => item.id === "illustration-mascot"), // Image (The Lake)
                GALLERY_ITEMS.find(item => item.id === "the-memories"), // Image
                GALLERY_ITEMS.find(item => item.id === "reading-is-elegance"), // Video
                GALLERY_ITEMS.find(item => item.id === "qiqi"), // Image
              ].filter(Boolean).map((item) => (
                <GalleryCard
                  key={item!.id}
                  item={item!}
                  onFolderClick={openFolder}
                  onImageClick={setSingleLightboxItem}
                  onNavigateToProject={onNavigateToProject}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col bg-[#faf9f5] h-full justify-start">
              {/* Case Study 2 */}
              {(() => {
                const item = GALLERY_ITEMS.find(i => i.id === "scary-sweetheart-cover");
                return item ? (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onFolderClick={openFolder}
                    onImageClick={setSingleLightboxItem}
                    onNavigateToProject={onNavigateToProject}
                  />
                ) : null;
              })()}

              {/* Special Mini Subgrid for Budaya Reog, Logo and Gawr Gura ("little just like in the image") */}
              {(() => {
                const itemGawr = GALLERY_ITEMS.find(i => i.id === "gawr-gura");
                const itemReog = GALLERY_ITEMS.find(i => i.id === "budaya-reog");
                const itemLogo = GALLERY_ITEMS.find(i => i.id === "logo-dadi");
                
                return (
                  <div className="grid grid-cols-2 gap-[1px] bg-[#E5E2DC]">
                    {/* Left side: two stacked items */}
                    <div className="flex flex-col gap-[1px] bg-[#E5E2DC]">
                      {itemLogo && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSingleLightboxItem(itemLogo);
                          }}
                          className="group/mini relative aspect-square bg-neutral-900 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={itemLogo.url}
                            alt={itemLogo.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/mini:scale-102"
                            loading="lazy"
                          />
                          <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-12 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <h4 className="font-sans text-xs font-medium text-white tracking-wide truncate">
                              {itemLogo.title}
                            </h4>
                          </div>
                        </div>
                      )}
                      {itemReog && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            openFolder(itemReog);
                          }}
                          className="group/mini relative aspect-square bg-neutral-900 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={itemReog.url}
                            alt={itemReog.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/mini:scale-102"
                            loading="lazy"
                          />
                          {/* Folder Indicator for multi-scenes inside mini grid */}
                          <div className="absolute top-4 left-4 z-10 px-2 py-0.5 bg-[#F05C3B] rounded-full text-[8px] font-mono font-bold tracking-wider text-white uppercase shadow-sm">
                            {itemReog.scenes?.length || 0} SCENES
                          </div>
                          <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-12 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <h4 className="font-sans text-xs font-medium text-white tracking-wide truncate">
                              {itemReog.title}
                            </h4>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right side: one tall card */}
                    {itemGawr && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSingleLightboxItem(itemGawr);
                        }}
                        className="group/mini relative bg-neutral-900 overflow-hidden cursor-pointer flex flex-col h-full"
                      >
                        <div className="relative w-full h-full min-h-[160px] md:min-h-[220px]">
                          <img
                            src={itemGawr.url}
                            alt={itemGawr.title}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/mini:scale-102"
                            loading="lazy"
                          />
                          <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-12 opacity-0 group-hover/mini:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <h4 className="font-sans text-xs font-semibold text-white tracking-wide truncate">
                              {itemGawr.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Case Study 3 */}
              {(() => {
                const item = GALLERY_ITEMS.find(i => i.id === "screen-menu-concept");
                return item ? (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onFolderClick={openFolder}
                    onImageClick={setSingleLightboxItem}
                    onNavigateToProject={onNavigateToProject}
                  />
                ) : null;
              })()}

              {/* Rest of the images */}
              {[
                GALLERY_ITEMS.find(item => item.id === "my-life-one-day"), // Image
                GALLERY_ITEMS.find(item => item.id === "escoffier"), // Image
                GALLERY_ITEMS.find(item => item.id === "violet-evergarden"), // Image
              ].filter(Boolean).map((item) => (
                <GalleryCard
                  key={item!.id}
                  item={item!}
                  onFolderClick={openFolder}
                  onImageClick={setSingleLightboxItem}
                  onNavigateToProject={onNavigateToProject}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Right spacer column */}
        <div className="col-start-3 col-end-4 border-l border-[#e5e5e2]/30 h-full" />
      </main>

      {/* Footer Grid Row */}
      <footer className="border-t border-[#e5e5e2] h-[80px] grid grid-cols-[55px_1fr_55px] lg:grid-cols-[85px_1fr_85px] items-center text-xs text-[#737370] bg-[#faf9f5]">
        <div className="border-r border-[#e5e5e2] h-full" />
        <div className="px-6 flex justify-between items-center w-full font-mono text-[9px] tracking-wider uppercase font-medium">
          <span>© {new Date().getFullYear()} RIZKI RIZAL WICAKSONO</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
        <div className="border-l border-[#e5e5e2] h-full" />
      </footer>
    </div> {/* end of relative z-10 w-full */}

    {/* --- Contact (Grid Style, matching other pages with parallax animations) --- */}
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
        <div className="flex-1 w-full flex justify-center items-center bg-[#faf9f5] py-12 lg:py-16 px-4 sm:px-6 md:px-12 shrink-0 overflow-hidden">
          <div className="group/statement flex flex-col items-center justify-center w-full max-w-7xl mx-auto cursor-default select-none">
            {/* First line: LET'S + icon + WORK */}
            <div className="flex flex-row items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 font-sans text-[26px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-normal leading-none tracking-tight text-[#161616] whitespace-nowrap">
              <span className="text-[#b5b5b0]">“</span>
              <span>LET'S</span>
              
              {/* Centered kupicake icon */}
              <span className="inline-flex items-center justify-center shrink-0">
                <span className="w-8 h-8 xs:w-11 xs:h-11 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-[100px] lg:h-[100px] rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border border-[#E5E2DC] bg-white group-hover/statement:border-[#F05C3B]/60 shadow-xs group-hover/statement:scale-105">
                  <img
                    src="https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/LOGO%20KUPICAKE/kupicake%20putih.svg"
                    alt="Kupicake Logo"
                    className="w-full h-full object-cover translate-y-[50%] group-hover/statement:translate-y-[35%] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1.1)] group-hover/statement:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </span>

              <span>WORK</span>
            </div>

            {/* Second line: TOGETHER */}
            <div className="mt-2 sm:mt-4 md:mt-6 font-sans text-[26px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-normal leading-none tracking-tight text-[#161616] whitespace-nowrap flex flex-row items-center justify-center">
              <span className="text-[#F05C3B]">TOGETHER</span>
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

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[#E5E2DC] border-t border-b border-[#E5E2DC] shrink-0 font-sans">
          {/* Box 1: Status & Info */}
          <div className="bg-[#faf9f5] hover:bg-white transition-colors duration-500 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <span className="text-[#8a8a85] font-mono text-[10px] md:text-xs uppercase tracking-wider block mb-4">
                01 // AVAILABILITY
              </span>
              <h3 className="text-[#1a1a1a] font-normal text-2xl md:text-3xl lg:text-[40px] leading-tight mb-6 font-sans">
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
          <div className="bg-[#faf9f5] hover:bg-white transition-colors duration-500 p-6 md:p-8 lg:p-10 flex flex-col justify-between group/contact-box relative overflow-hidden font-sans">
            <div>
              <span className="text-[#8a8a85] font-mono text-[10px] md:text-xs uppercase tracking-wider block mb-4">
                02 // DIRECT INQUIRY
              </span>
              <div className="flex flex-col gap-4">
                <div className="group/email flex items-center gap-3 relative min-h-[48px]">
                  <a
                    href="mailto:riskirw17@gmail.com"
                    className="text-[#1a1a1a] hover:text-[#F05C3B] font-normal text-2xl md:text-3xl lg:text-[40px] leading-tight text-left block break-all transition-colors duration-500 font-sans"
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
                    className="p-2 rounded-full hover:bg-[#F05C3B]/10 text-[#737370] hover:text-[#F05C3B] cursor-pointer opacity-0 group-hover/email:opacity-100 focus:opacity-100 transition-all duration-300 flex items-center justify-center shrink-0 border border-[#E5E2DC]"
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
                
                <div className="group/phone flex items-center gap-3 relative min-h-[36px]">
                  <a
                    href="https://wa.me/6289673731449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#737370] hover:text-[#F05C3B] font-normal text-xl md:text-2xl lg:text-[28px] leading-tight block transition-colors duration-500 font-sans"
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
      </div>

      {/* Right Grid Margin */}
      <div className="bg-[#faf9f5] col-start-3 col-end-4 row-start-1 transition-colors duration-500" />
    </div>

      {/* ========================================================================= */}
      {/* 1. IMMERSIVE LIGHTBOX FOR "BUDAYA REOG - DESA SUMBER" SERIES */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeFolder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col justify-between overflow-hidden selection:bg-[#F05C3B] selection:text-white"
          >
            {/* Background Grain Accent */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://raw.githubusercontent.com/kupicake/database/HERO-SECTION/scene/noise.png')] opacity-[0.03]" />

            {/* Lightbox Header */}
            <div className="relative z-10 w-full h-[60px] md:h-[80px] border-b border-white/10 px-4 md:px-8 flex items-center justify-between bg-neutral-950/90 backdrop-blur-md">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[9px] text-[#F05C3B] tracking-[0.3em] uppercase font-bold">
                  ILLUSTRATION SERIES
                </span>
                <h2 className="font-sans text-sm md:text-base font-medium text-white tracking-wide">
                  {activeFolder.title}
                </h2>
              </div>

              {/* Scene Counter */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] text-white/85 tracking-widest">
                SCENE <span className="text-[#F05C3B] font-bold">{folderSceneIndex + 1}</span> // {activeFolder.scenes?.length}
              </div>

              {/* Close Button */}
              <button
                onClick={closeFolder}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Stage with Large Active Image */}
            <div className="relative flex-1 w-full flex items-center justify-center p-4 md:p-8">
              {/* Loader */}
              {isMediaLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-neutral-950/40">
                  <Loader2 className="w-10 h-10 text-[#F05C3B] animate-spin" />
                </div>
              )}

              {/* Left Arrow Button */}
              <button
                onClick={prevScene}
                className="absolute left-4 md:left-8 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-[#F05C3B] hover:border-[#F05C3B] transition-all duration-300 cursor-pointer"
                aria-label="Previous scene"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Active Image Render */}
              <div className="max-w-[85vw] max-h-[70vh] md:max-h-[75vh] flex items-center justify-center relative rounded-lg overflow-hidden select-none">
                <img
                  src={activeFolder.scenes?.[folderSceneIndex]}
                  alt={`${activeFolder.title} - Scene ${folderSceneIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain shadow-2xl transition-all duration-500"
                  onLoad={() => setIsMediaLoading(false)}
                />
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={nextScene}
                className="absolute right-4 md:right-8 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-[#F05C3B] hover:border-[#F05C3B] transition-all duration-300 cursor-pointer"
                aria-label="Next scene"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* Lightbox Footer Thumbnail / Scene Strip */}
            <div className="w-full h-[80px] md:h-[100px] border-t border-white/10 bg-neutral-950/90 backdrop-blur-md px-4 py-2 flex items-center justify-center overflow-x-auto gap-2.5 md:gap-4 no-scrollbar">
              {activeFolder.scenes?.map((scene, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsMediaLoading(true);
                    setFolderSceneIndex(idx);
                  }}
                  className={`relative h-[50px] md:h-[65px] aspect-[4/3] rounded-md overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                    folderSceneIndex === idx ? "border-[#F05C3B] scale-105" : "border-transparent opacity-55 hover:opacity-100"
                  }`}
                >
                  <img
                    src={scene}
                    alt={`Scene Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-1 right-1 text-[7px] md:text-[8px] font-mono text-white/90 bg-black/60 px-1 py-0.5 rounded">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. STANDARD LIGHTBOX FOR SINGLE ARTWORKS (IMAGE/VIDEO) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {singleLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col justify-between overflow-hidden select-none"
            onClick={() => setSingleLightboxItem(null)}
          >
            {/* Header */}
            <div className="relative z-10 w-full h-[60px] md:h-[80px] border-b border-white/10 px-4 md:px-8 flex items-center justify-between bg-neutral-950/90 backdrop-blur-md">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[9px] text-[#F05C3B] tracking-[0.3em] uppercase font-bold">
                  {singleLightboxItem.type === "video" ? "MOTION VIDEO" : "ILLUSTRATION"}
                </span>
                <h2 className="font-sans text-sm md:text-base font-medium text-white tracking-wide">
                  {singleLightboxItem.title}
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSingleLightboxItem(null)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage */}
            <div className="relative flex-1 w-full flex items-center justify-center p-4 md:p-8" onClick={() => setSingleLightboxItem(null)}>
              {singleLightboxItem.type === "video" ? (
                <div 
                  className="max-w-[85vw] max-h-[70vh] md:max-h-[75vh] flex flex-col items-center justify-center relative rounded-lg overflow-hidden border border-white/10 bg-neutral-950"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    src={singleLightboxItem.url}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain shadow-2xl"
                  />
                  {/* Sound Toggle Overlay */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-[#F05C3B] text-white border border-white/10 transition-all duration-300 cursor-pointer"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              ) : (
                <div 
                  className="max-w-[85vw] max-h-[70vh] md:max-h-[75vh] flex items-center justify-center relative rounded-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={singleLightboxItem.url}
                    alt={singleLightboxItem.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain shadow-2xl"
                  />
                </div>
              )}
            </div>

            {/* Footer details spacer */}
            <div className="w-full h-[50px] bg-neutral-950/90 text-center flex items-center justify-center border-t border-white/5 font-mono text-[9px] text-white/45 tracking-widest uppercase">
              RIZKI RIZAL WICAKSONO // GALLERY ARCHIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
