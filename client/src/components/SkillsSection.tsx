/**
 * SkillsSection — Interactive 3D skills display
 * Design: Liquid Obsidian — desktop: grid with 3D tilt | mobile: staggered spatial composition
 * Mobile: floating cards in asymmetric positions, horizontal scroll row, overlapping layers
 */
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Layout,
  Sparkles,
  Monitor,
  MessageCircle,
  Box,
  TrendingUp,
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

export default function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#08080c] to-black" />

      <div ref={ref} className="relative z-10 container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
            MY <span className="text-gold-gradient">EXPERTISE</span>
          </h2>
        </motion.div>

        {/* Desktop Grid — unchanged */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              index={i}
              isVisible={isVisible}
              isHovered={hoveredIndex === i}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Mobile Staggered Composition */}
        <div className="md:hidden relative">
          <MobileSkillsComposition
            skills={skills}
            isVisible={isVisible}
            expandedIndex={expandedMobile}
            onToggle={(i) => setExpandedMobile(expandedMobile === i ? null : i)}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Desktop Skill Card (preserved) ─── */
function SkillCard({
  skill,
  index,
  isVisible,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  skill: typeof skills[0];
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`relative p-6 rounded-2xl border transition-all duration-300 ${
          isHovered
            ? "border-[#C9A96E]/30 bg-[#C9A96E]/5 shadow-[0_0_40px_rgba(201,169,110,0.1)]"
            : "border-white/5 bg-white/[0.02]"
        } backdrop-blur-sm`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
          isHovered ? "bg-[#C9A96E]/10" : "bg-white/5"
        }`}>
          <skill.icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isHovered ? skill.color : "rgba(201,169,110,0.6)" }}
          />
        </div>
        <h3 className="text-white font-display font-semibold text-base mb-2 tracking-tight">
          {skill.title}
        </h3>
        <motion.p
          className="text-white/40 text-sm leading-relaxed"
          animate={{ height: isHovered ? "auto" : "2.8em" }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          {skill.description}
        </motion.p>
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Mobile Staggered Composition ─── */
function MobileSkillsComposition({
  skills,
  isVisible,
  expandedIndex,
  onToggle,
}: {
  skills: { icon: any; title: string; shortLabel: string; description: string; color: string }[];
  isVisible: boolean;
  expandedIndex: number | null;
  onToggle: (i: number) => void;
}) {
  return (
    <div className="relative" style={{ minHeight: "480px" }}>
      {/* Ambient floating orbs */}
      <motion.div
        className="absolute top-8 right-6 w-20 h-20 rounded-full bg-[#C9A96E]/5 blur-2xl"
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-12 left-4 w-16 h-16 rounded-full bg-[#C9A96E]/3 blur-xl"
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Row 1: Two cards side by side, staggered */}
      <div className="flex gap-3 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 20, x: -10 }}
          animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <MobileSkillBubble
            skill={skills[0]}
            isExpanded={expandedIndex === 0}
            onToggle={() => onToggle(0)}
            floatDelay={0}
            size="large"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, x: 10 }}
          animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 mt-4"
        >
          <MobileSkillBubble
            skill={skills[1]}
            isExpanded={expandedIndex === 1}
            onToggle={() => onToggle(1)}
            floatDelay={0.5}
            size="large"
          />
        </motion.div>
      </div>

      {/* Row 2: Single card, offset right */}
      <div className="flex justify-end mb-3">
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-2/3"
        >
          <MobileSkillBubble
            skill={skills[2]}
            isExpanded={expandedIndex === 2}
            onToggle={() => onToggle(2)}
            floatDelay={1}
            size="medium"
          />
        </motion.div>
      </div>

      {/* Row 3: Two cards, second overlapping slightly */}
      <div className="flex gap-2 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 20, x: -15 }}
          animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-[1.3]"
        >
          <MobileSkillBubble
            skill={skills[3]}
            isExpanded={expandedIndex === 3}
            onToggle={() => onToggle(3)}
            floatDelay={1.5}
            size="large"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, x: 10 }}
          animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex-1"
        >
          <MobileSkillBubble
            skill={skills[4]}
            isExpanded={expandedIndex === 4}
            onToggle={() => onToggle(4)}
            floatDelay={2}
            size="small"
          />
        </motion.div>
      </div>

      {/* Row 4: Full width card, slightly tilted */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <MobileSkillBubble
          skill={skills[5]}
          isExpanded={expandedIndex === 5}
          onToggle={() => onToggle(5)}
          floatDelay={2.5}
          size="full"
        />
      </motion.div>
    </div>
  );
}

function MobileSkillBubble({
  skill,
  isExpanded,
  onToggle,
  floatDelay,
  size,
}: {
  skill: typeof skills[0];
  isExpanded: boolean;
  onToggle: () => void;
  floatDelay: number;
  size: "small" | "medium" | "large" | "full";
}) {
  const sizeClasses = {
    small: "px-3 py-2.5",
    medium: "px-4 py-3",
    large: "px-4 py-3.5",
    full: "px-4 py-3.5",
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-5 h-5",
    full: "w-5 h-5",
  };

  const titleSizes = {
    small: "text-[11px]",
    medium: "text-xs",
    large: "text-sm",
    full: "text-sm",
  };

  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
        rotateZ: isExpanded ? 0 : size === "full" ? 0.5 : 0,
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        rotateZ: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className={`relative ${sizeClasses[size]} rounded-xl border transition-all duration-300 cursor-pointer select-none ${
        isExpanded
          ? "border-[#C9A96E]/30 bg-[#C9A96E]/8 shadow-[0_0_30px_rgba(201,169,110,0.08)]"
          : "border-white/[0.06] bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isExpanded ? "bg-[#C9A96E]/15" : "bg-white/5"
        }`}>
          <skill.icon
            className={iconSizes[size]}
            style={{ color: isExpanded ? skill.color : "rgba(201,169,110,0.5)" }}
          />
        </div>
        <span className={`font-display font-semibold text-white ${titleSizes[size]} tracking-tight`}>
          {skill.title}
        </span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-white/40 text-xs leading-relaxed mt-2 pl-[42px]">
              {skill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow on expand */}
      {isExpanded && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
}
