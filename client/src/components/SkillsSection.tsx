/**
 * SkillsSection — Premium 3D horizontal carousel
 * Design: Liquid Obsidian
 * Desktop: 3D perspective slider with mouse drag + parallax
 * Mobile: Touch-friendly swipe carousel with snap
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Layout,
  Sparkles,
  Monitor,
  MessageCircle,
  Box,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const skills = [
  {
    icon: Layout,
    title: "DESIGN SYSTEMS",
    shortLabel: "Design",
    description: "Creating consistent, scalable design systems that make brands feel professional and recognizable.",
    color: "#C9A96E",
  },
  {
    icon: Sparkles,
    title: "ANIMATION",
    shortLabel: "Motion",
    description: "Creating smooth animations and micro-interactions that make websites feel alive.",
    color: "#8A8D91",
  },
  {
    icon: Monitor,
    title: "UI/UX",
    shortLabel: "UI/UX",
    description: "Designing interfaces that are beautiful, intuitive, and easy to use.",
    color: "#C9A96E",
  },
  {
    icon: MessageCircle,
    title: "WHATSAPP AUTOMATION",
    shortLabel: "Automation",
    description: "Creating automated customer communication systems that improve customer experience and business operations.",
    color: "#25D366",
  },
  {
    icon: Box,
    title: "3D MODELING",
    shortLabel: "3D",
    description: "Creating and integrating 3D objects and visual experiences into digital products.",
    color: "#8A8D91",
  },
  {
    icon: TrendingUp,
    title: "E-COMMERCE STRATEGY",
    shortLabel: "Strategy",
    description: "Building websites based on business goals, customer behavior, and conversion strategy.",
    color: "#C9A96E",
  },
];

// Extended carousel with duplicated items for seamless infinite loop
const extendedSkills = [...skills, ...skills, ...skills];

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="skills" className="relative py-12 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#08080c] to-black" />

      {/* Ambient depth layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#C9A96E]/[0.03] blur-[120px]"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-72 md:h-72 rounded-full bg-[#C9A96E]/[0.02] blur-[100px]"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 md:mb-10"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-3">
            Capabilities
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
            MY <span className="text-gold-gradient">EXPERTISE</span>
          </h2>
        </motion.div>

        {/* 3D Carousel */}
        <SkillsCarousel isVisible={isVisible} />
      </div>
    </section>
  );
}

function SkillsCarousel({ isVisible }: { isVisible: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragCurrentX = useMotionValue(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const cardWidth = 320; // base card width
  const gap = 24; // gap between cards

  // Spring for smooth drag
  const smoothDrag = useSpring(dragCurrentX, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });

  // Determine visible cards based on screen width
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 480) return 1.2;
    if (w < 768) return 1.5;
    if (w < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total translate range
  const totalWidth = extendedSkills.length * (cardWidth + gap);
  const maxTranslate = -(totalWidth - (window.innerWidth || 1200));
  const minTranslate = 0;

  // Constrained translate
  const constrainedTranslate = useTransform(
    smoothDrag,
    [minTranslate - 200, minTranslate, maxTranslate, maxTranslate + 200],
    [minTranslate - 200, minTranslate, maxTranslate, maxTranslate + 200]
  );

  // Desktop mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX.current;
      dragCurrentX.set(delta);
    },
    [isDragging, dragCurrentX]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = dragCurrentX.get();
    const threshold = cardWidth * 0.3;

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else {
        setActiveIndex((prev) => Math.min(skills.length - 1, prev + 1));
      }
    }

    // Reset drag value with spring animation
    dragCurrentX.set(0);
  }, [isDragging, dragCurrentX]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragCurrentX.set(0);
  }, [dragCurrentX]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const delta = e.touches[0].clientX - dragStartX.current;
      dragCurrentX.set(delta);
    },
    [isDragging, dragCurrentX]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = dragCurrentX.get();
    const threshold = 40;

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else {
        setActiveIndex((prev) => Math.min(skills.length - 1, prev + 1));
      }
    }

    dragCurrentX.set(0);
  }, [isDragging, dragCurrentX]);

  // Navigate functions
  const goNext = () => setActiveIndex((prev) => Math.min(skills.length - 1, prev + 1));
  const goPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));

  // Center offset for current active card
  const centerOffset = activeIndex * (cardWidth + gap);

  return (
    <div className="relative w-full">
      {/* 3D Perspective Container */}
      <div
        className="relative overflow-hidden"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
        ref={carouselRef}
      >
        {/* Carousel track */}
        <motion.div
          className="flex items-center"
          style={{
            paddingLeft: "calc(50% - 160px + var(--center-offset, 0px))",
            willChange: "transform",
            x: useTransform(
              smoothDrag,
              [-1000, 0, 1000],
              [-1000 - centerOffset, -centerOffset, 1000 - centerOffset]
            ),
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDragEnd={(_, info) => {
            const delta = info.offset.x;
            if (Math.abs(delta) > 50) {
              if (delta > 0) goPrev();
              else goNext();
            }
          }}
        >
          {extendedSkills.map((skill, i) => {
            const realIndex = i % skills.length;
            const distanceFromCenter = Math.abs(realIndex - activeIndex);

            return (
              <motion.div
                key={`${skill.title}-${i}`}
                className="shrink-0"
                style={{ width: cardWidth, marginRight: gap }}
                initial={false}
                animate={{
                  rotateY: distanceFromCenter === 0 ? 0 : distanceFromCenter === 1 ? -5 : 5,
                  rotateX: distanceFromCenter === 0 ? 0 : 3,
                  scale: distanceFromCenter === 0 ? 1 : distanceFromCenter === 1 ? 0.92 : 0.85,
                  z: distanceFromCenter === 0 ? 40 : 0,
                  opacity: distanceFromCenter === 0 ? 1 : distanceFromCenter === 1 ? 0.75 : 0.5,
                  filter: `blur(${distanceFromCenter > 1 ? 2 : 0}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 0.6,
                }}
                onClick={() => setActiveIndex(realIndex)}
              >
                <SkillCard3D
                  skill={skill}
                  isActive={realIndex === activeIndex}
                  isVisible={isVisible}
                  index={i}
                  onMouseMoveParallax={isDragging}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(201,169,110,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={goPrev}
          disabled={activeIndex === 0}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
            activeIndex === 0
              ? "border-white/5 bg-white/[0.02] text-white/20 cursor-not-allowed"
              : "border-[#C9A96E]/20 bg-black/60 text-[#C9A96E] hover:border-[#C9A96E]/40 cursor-pointer backdrop-blur-sm"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(201,169,110,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={goNext}
          disabled={activeIndex === skills.length - 1}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
            activeIndex === skills.length - 1
              ? "border-white/5 bg-white/[0.02] text-white/20 cursor-not-allowed"
              : "border-[#C9A96E]/20 bg-black/60 text-[#C9A96E] hover:border-[#C9A96E]/40 cursor-pointer backdrop-blur-sm"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Bottom: Dots indicator */}
      <div className="flex justify-center mt-6 md:mt-8 gap-2">
        {skills.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="h-1 rounded-full transition-all duration-500 cursor-pointer"
            animate={{
              width: i === activeIndex ? 24 : 8,
              backgroundColor: i === activeIndex ? "#C9A96E" : "rgba(255,255,255,0.15)",
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Mobile: Swipe hint */}
      <motion.p
        className="md:hidden text-center text-white/25 text-[10px] font-mono mt-3 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        ← SWIPE TO EXPLORE →
      </motion.p>
    </div>
  );
}

function SkillCard3D({
  skill,
  isActive,
  isVisible,
  index,
  onMouseMoveParallax,
}: {
  skill: typeof skills[0];
  isActive: boolean;
  isVisible: boolean;
  index: number;
  onMouseMoveParallax: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth parallax
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: (index % skills.length) * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`relative cursor-pointer select-none`}
    >
      {/* Floating shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-[50%] blur-xl transition-all duration-500"
        animate={{
          backgroundColor: isActive ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.03)",
          scale: isActive ? 1 : 0.8,
          opacity: isActive ? 1 : 0.5,
        }}
      />

      {/* Card body */}
      <motion.div
        className={`relative p-5 md:p-6 rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-500 ${
          isActive
            ? "border-[#C9A96E]/25 bg-gradient-to-br from-[#C9A96E]/8 to-white/[0.03]"
            : "border-white/[0.06] bg-white/[0.02]"
        }`}
        animate={{
          boxShadow: isActive
            ? "0 20px 60px rgba(201,169,110,0.1), 0 0 0 1px rgba(201,169,110,0.05)"
            : "0 8px 32px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${skill.color} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Icon */}
        <motion.div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
            isActive ? "bg-[#C9A96E]/10" : "bg-white/5"
          }`}
          animate={
            isActive
              ? {
                  boxShadow: `0 0 30px ${skill.color}20`,
                  scale: 1.05,
                }
              : { boxShadow: "none", scale: 1 }
          }
        >
          <skill.icon
            className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-500"
            style={{
              color: isActive ? skill.color : "rgba(201,169,110,0.4)",
            }}
          />
        </motion.div>

        {/* Title */}
        <h3 className="font-display font-bold text-white text-base md:text-lg tracking-tight mb-2">
          {skill.title}
        </h3>

        {/* Description */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="text-white/40 text-sm leading-relaxed overflow-hidden"
            >
              {skill.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Active glow accent */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${skill.color}40, transparent)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Hover light sweep */}
        {isHovered && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: 0.06 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
            }}
          />
        )}
      </motion.div>

      {/* Bottom label */}
      <motion.div
        className="text-center mt-3"
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C9A96E]/60">
          {skill.shortLabel}
        </span>
      </motion.div>
    </motion.div>
  );
}
