/**
 * SkillsSection — Interactive 3D skills display with central object and orbiting cards
 * Design: Liquid Obsidian — hover-reactive cards with metallic borders
 */
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
    description: "Creating consistent, scalable design systems that make brands feel professional and recognizable.",
    color: "#C9A96E",
  },
  {
    icon: Sparkles,
    title: "ANIMATION",
    description: "Creating smooth animations and micro-interactions that make websites feel alive.",
    color: "#8A8D91",
  },
  {
    icon: Monitor,
    title: "UI/UX",
    description: "Designing interfaces that are beautiful, intuitive, and easy to use.",
    color: "#C9A96E",
  },
  {
    icon: MessageCircle,
    title: "WHATSAPP AUTOMATION",
    description: "Creating automated customer communication systems that improve customer experience and business operations.",
    color: "#25D366",
  },
  {
    icon: Box,
    title: "3D MODELING",
    description: "Creating and integrating 3D objects and visual experiences into digital products.",
    color: "#8A8D91",
  },
  {
    icon: TrendingUp,
    title: "E-COMMERCE STRATEGY",
    description: "Building websites based on business goals, customer behavior, and conversion strategy.",
    color: "#C9A96E",
  },
];

export default function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#08080c] to-black" />

      <div ref={ref} className="relative z-10 container max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            MY <span className="text-gold-gradient">EXPERTISE</span>
          </h2>
        </motion.div>

        {/* Skills Grid with 3D Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
      </div>
    </section>
  );
}

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
      style={{
        perspective: 1000,
      }}
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
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
          isHovered ? "bg-[#C9A96E]/10" : "bg-white/5"
        }`}>
          <skill.icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isHovered ? skill.color : "rgba(201,169,110,0.6)" }}
          />
        </div>

        {/* Title */}
        <h3 className="text-white font-display font-semibold text-base mb-2 tracking-tight">
          {skill.title}
        </h3>

        {/* Description */}
        <motion.p
          className="text-white/40 text-sm leading-relaxed"
          animate={{
            height: isHovered ? "auto" : "2.8em",
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          {skill.description}
        </motion.p>

        {/* Hover glow */}
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
