/**
 * SkillsSection — Interactive 3D Skill Universe
 * Design: Liquid Obsidian
 * Each skill is a living animated object with unique behavior
 * Desktop: 3D parallax environment with mouse tracking
 * Mobile: Compact touch-friendly animated layout
 */
import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ShoppingBag,
  Palette,
  Box,
  MessageCircle,
  Code2,
  TrendingUp,
} from "lucide-react";

/* ─── Skill Definitions with unique visual behaviors ─── */
const skills = [
  {
    id: "shopify",
    icon: ShoppingBag,
    title: "SHOPIFY DEVELOPMENT",
    shortLabel: "Shopify",
    description:
      "Custom themes, headless storefronts, and full e-commerce experiences built with Liquid, Hydrogen, and React.",
    color: "#95BF47",
    orbitRadius: 200,
    orbitSpeed: 0.0008,
    orbitPhase: 0,
    floatAmplitude: 18,
    floatSpeed: 0.6,
    entryDirection: { x: -120, y: 80 },
    position: { x: -280, y: -60, z: 0 },
  },
  {
    id: "design",
    icon: Palette,
    title: "GRAPHIC DESIGN",
    shortLabel: "Design",
    description:
      "Brand identity systems, UI design, and visual compositions that make products feel premium and professional.",
    color: "#C9A96E",
    orbitRadius: 160,
    orbitSpeed: -0.0012,
    orbitPhase: 1.2,
    floatAmplitude: 14,
    floatSpeed: 0.8,
    entryDirection: { x: 100, y: -100 },
    position: { x: 200, y: -120, z: 40 },
  },
  {
    id: "3d",
    icon: Box,
    title: "3D MODELING",
    shortLabel: "3D",
    description:
      "Interactive 3D experiences, WebGL integrations, and volumetric visual elements that create depth and immersion.",
    color: "#8A8D91",
    orbitRadius: 240,
    orbitSpeed: 0.0006,
    orbitPhase: 2.4,
    floatAmplitude: 22,
    floatSpeed: 0.5,
    entryDirection: { x: -80, y: -140 },
    position: { x: -100, y: 100, z: -20 },
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WHATSAPP AUTOMATION",
    shortLabel: "Automation",
    description:
      "Automated customer communication systems with order confirmations, tracking updates, and support workflows.",
    color: "#25D366",
    orbitRadius: 180,
    orbitSpeed: -0.0009,
    orbitPhase: 3.6,
    floatAmplitude: 16,
    floatSpeed: 0.7,
    entryDirection: { x: 140, y: 60 },
    position: { x: 280, y: 80, z: -40 },
  },
  {
    id: "code",
    icon: Code2,
    title: "CUSTOM CODING",
    shortLabel: "Code",
    description:
      "Custom JavaScript, React, and Node.js solutions that extend beyond standard platform capabilities.",
    color: "#61DAFB",
    orbitRadius: 220,
    orbitSpeed: 0.001,
    orbitPhase: 4.8,
    floatAmplitude: 20,
    floatSpeed: 0.65,
    entryDirection: { x: -160, y: -60 },
    position: { x: -220, y: 140, z: 20 },
  },
  {
    id: "cro",
    icon: TrendingUp,
    title: "CONVERSION OPTIMIZATION",
    shortLabel: "CRO",
    description:
      "Data-driven optimization strategies that increase sales, reduce bounce rates, and maximize every visitor's value.",
    color: "#C9A96E",
    orbitRadius: 190,
    orbitSpeed: -0.0007,
    orbitPhase: 5.4,
    floatAmplitude: 15,
    floatSpeed: 0.75,
    entryDirection: { x: 60, y: 120 },
    position: { x: 140, y: -40, z: -60 },
  },
];

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mouse parallax for desktop
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setMousePos({
      x: (e.clientX - rect.left - centerX) / centerX,
      y: (e.clientY - rect.top - centerY) / centerY,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <section id="skills" className="relative py-12 md:py-24 overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#06060a] to-black" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-3">
            Capabilities
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
            MY <span className="text-gold-gradient">EXPERTISE</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/30 text-xs md:text-sm mt-3 font-mono"
          >
            Hover to explore each skill
          </motion.p>
        </motion.div>

        {/* 3D Skill Universe — Desktop */}
        <div
          ref={containerRef}
          className="hidden md:block relative"
          style={{ height: "520px", perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A96E]/[0.02] blur-[150px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Connection lines between skills */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <AnimatePresence>
              {isVisible &&
                skills.map((skill, i) => {
                  const next = skills[(i + 1) % skills.length];
                  const x1 = (skill.position.x + 340) + 2;
                  const y1 = (skill.position.y + 260) + 2;
                  const x2 = (next.position.x + 340) + 2;
                  const y2 = (next.position.y + 260) + 2;
                  return (
                    <motion.line
                      key={`line-${skill.id}`}
                      initial={{ opacity: 0 }}
                      animate={isVisible ? { opacity: 0.06 } : { opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#C9A96E"
                      strokeWidth="1"
                      strokeDasharray="4 8"
                    />
                  );
                })}
            </AnimatePresence>
          </svg>

          {/* Individual Skill Nodes */}
          {skills.map((skill, i) => (
            <SkillNode
              key={skill.id}
              skill={skill}
              index={i}
              isVisible={isVisible}
              isHovered={hoveredSkill === skill.id}
              isOtherHovered={hoveredSkill !== null && hoveredSkill !== skill.id}
              mousePos={mousePos}
              onHoverStart={() => setHoveredSkill(skill.id)}
              onHoverEnd={() => setHoveredSkill(null)}
            />
          ))}

          {/* Center label */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 0.15, scale: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#C9A96E] uppercase">
              INTERACTIVE SYSTEM
            </p>
          </motion.div>
        </div>

        {/* Mobile: Compact animated layout */}
        {isMobile && (
          <div className="md:hidden">
            <MobileSkillUniverse
              isVisible={isVisible}
              skills={skills}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Desktop: Individual Skill Node ─── */
function SkillNode({
  skill,
  index,
  isVisible,
  isHovered,
  isOtherHovered,
  mousePos,
  onHoverStart,
  onHoverEnd,
}: {
  skill: typeof skills[0];
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  isOtherHovered: boolean;
  mousePos: { x: number; y: number };
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 16);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Base position + orbital movement + float + mouse parallax
  const baseX = skill.position.x;
  const baseY = skill.position.y;
  const depthFactor = 1 + skill.position.z * 0.002;

  // Organic movement
  const orbitX =
    Math.sin(time * skill.orbitSpeed + skill.orbitPhase) *
    skill.orbitRadius *
    0.15;
  const orbitY =
    Math.cos(time * skill.orbitSpeed * 0.7 + skill.orbitPhase) *
    skill.orbitRadius *
    0.1;
  const floatY = Math.sin(time * 0.001 * skill.floatSpeed + skill.orbitPhase) * skill.floatAmplitude;

  // Mouse parallax (deeper objects move less)
  const parallaxX = mousePos.x * 20 * depthFactor;
  const parallaxY = mousePos.y * 15 * depthFactor;

  const x = baseX + orbitX + parallaxX;
  const y = baseY + orbitY + floatY + parallaxY;

  const Icon = skill.icon;

  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: isHovered ? 30 : 10,
      }}
      initial={{
        opacity: 0,
        x: skill.entryDirection.x,
        y: skill.entryDirection.y,
        scale: 0,
        rotate: 90,
      }}
      animate={
        isVisible
          ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
          : { opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.3 + index * 0.15,
        mass: 0.8,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onHoverStart}
    >
      <AnimatePresence>
        {/* Skill-specific animation overlay */}
        {isHovered && <SkillSpecificAnimation skill={skill} />}

        {/* Glow behind icon */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={{
            backgroundColor: isHovered
              ? `${skill.color}18`
              : `${skill.color}06`,
            scale: isHovered ? 2.5 : 1.5,
            opacity: isHovered ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Shadow */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-md"
          style={{ bottom: -12, width: 40, height: 8 }}
          animate={{
            backgroundColor: isHovered
              ? `${skill.color}20`
              : "rgba(0,0,0,0.3)",
            opacity: isHovered ? 1 : 0.5,
            width: isHovered ? 50 : 40,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon container */}
        <motion.div
          className={`relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center border transition-all duration-500 ${
            isHovered
              ? `border-[${skill.color}]/30 bg-[${skill.color}]/10`
              : "border-white/[0.06] bg-white/[0.02]"
          } backdrop-blur-sm`}
          style={{
            boxShadow: isHovered
              ? `0 0 40px ${skill.color}15, 0 20px 40px rgba(0,0,0,0.4)`
              : "0 8px 24px rgba(0,0,0,0.3)",
          }}
          animate={{
            scale: isHovered ? 1.15 : isOtherHovered ? 0.9 : 1,
            rotateZ: isHovered ? 0 : Math.sin(time * 0.001) * 2,
          }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 25 },
            rotateZ: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <SkillIconAnimated icon={Icon} color={skill.color} isHovered={isHovered} time={time} />
        </motion.div>

        {/* Label */}
        <motion.div
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
          animate={{
            opacity: isHovered ? 1 : 0.4,
            y: isHovered ? 0 : 4,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-[10px] font-mono tracking-[0.15em] uppercase"
            style={{ color: isHovered ? skill.color : "#C9A96E60" }}
          >
            {skill.shortLabel}
          </span>
        </motion.div>

        {/* Expanded card on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-full mt-14 left-1/2 -translate-x-1/2 w-64"
              style={{ zIndex: 50 }}
            >
              <div
                className="p-4 rounded-xl border border-white/[0.08] bg-[#0a0a0f]/90 backdrop-blur-xl"
                style={{
                  boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${skill.color}10`,
                }}
              >
                <h3
                  className="font-display font-bold text-sm text-white mb-1.5"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {skill.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  {skill.description}
                </p>
                <div
                  className="mt-3 h-[1px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${skill.color}40, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Skill-specific icon animations ─── */
function SkillIconAnimated({
  icon: Icon,
  color,
  isHovered,
  time,
}: {
  icon: any;
  color: string;
  isHovered: boolean;
  time: number;
}) {
  const size = isHovered ? 28 : 24;

  return (
    <motion.div className="relative flex items-center justify-center">
      {/* Main icon */}
      <motion.div
        animate={{
          color: isHovered ? color : "rgba(201,169,110,0.5)",
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </motion.div>

      {/* Skill-specific particle effects */}
      {isHovered && <SkillParticles skillId={color} />}
    </motion.div>
  );
}

/* ─── Particles for skill-specific animation ─── */
function SkillParticles({ skillId }: { skillId: string }) {
  // Determine particle type based on color
  const isShopify = skillId === "#95BF47";
  const isWhatsApp = skillId === "#25D366";
  const isCode = skillId === "#61DAFB";
  const isCRO = skillId === "#C9A96E";

  return (
    <>
      {isShopify && (
        /* Shopping bag particles */
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`shop-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#95BF47]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i - 1.5) * 30],
                y: [0, -20 - i * 10],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </>
      )}

      {isWhatsApp && (
        /* Message bubble + check */
        <>
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#25D366]/30"
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -top-1 -right-1 text-[8px]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            ✓
          </motion.div>
        </>
      )}

      {isCode && (
        /* Code particles */
        <>
          {["{", "}", "<", "/"].map((char, i) => (
            <motion.span
              key={`code-${i}`}
              className="absolute text-[8px] font-mono text-[#61DAFB]/60"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                x: (i - 1.5) * 24,
                y: -10 - i * 8,
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
              style={{ left: "50%", top: "50%" }}
            >
              {char}
            </motion.span>
          ))}
        </>
      )}

      {isCRO && (
        /* Growth chart */
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`cro-${i}`}
              className="absolute bottom-0 h-[1px] bg-[#C9A96E]/40"
              initial={{ width: 0 }}
              animate={{ width: 12 + i * 8 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              style={{
                left: "50%",
                bottom: i * 6,
                transformOrigin: "left",
                transform: `rotate(${-30 + i * 15}deg)`,
              }}
            />
          ))}
        </>
      )}

      {/* Default: subtle pulse ring */}
      {!isShopify && !isWhatsApp && !isCode && !isCRO && (
        <motion.div
          className="absolute inset-0 rounded-2xl border"
          style={{ borderColor: `${skillId}20` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </>
  );
}

/* ─── Skill-specific visual animation overlay ─── */
function SkillSpecificAnimation({ skill }: { skill: typeof skills[0] }) {
  if (skill.id === "design") {
    /* Drawing line animation */
    return (
      <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none overflow-visible">
        <motion.path
          d="M 10 40 Q 40 10 70 30 T 130 20"
          fill="none"
          stroke={skill.color}
          strokeWidth="1.5"
          strokeDasharray="200"
          initial={{ strokeDashoffset: 200, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 0.4 }}
          exit={{ strokeDashoffset: 200, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (skill.id === "3d") {
    /* 3D rotation indicator */
    return (
      <motion.div
        className="absolute -inset-2 rounded-full border border-[#8A8D91]/10"
        animate={{
          rotateZ: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotateZ: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    );
  }

  return null;
}

/* ─── Mobile: Compact animated layout ─── */
type SkillType = typeof skills[0];

function MobileSkillUniverse({
  isVisible,
  skills,
  hoveredSkill,
  setHoveredSkill,
}: {
  isVisible: boolean;
  skills: SkillType[];
  hoveredSkill: string | null;
  setHoveredSkill: (id: string | null) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="relative px-2">
      {/* Compact grid: 2 per row, tap to expand */}
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          const isExpanded = expandedId === skill.id;
          const isHovered = hoveredSkill === skill.id;

          return (
            <motion.div
              key={skill.id}
              initial={{
                opacity: 0,
                y: 30,
                x: skill.entryDirection.x > 0 ? 40 : -40,
                scale: 0.8,
              }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0, x: 0, scale: 1 }
                  : { opacity: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.3 + i * 0.1,
              }}
              onTap={() => {
                setExpandedId(isExpanded ? null : skill.id);
                setHoveredSkill(isExpanded ? null : skill.id);
              }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              {/* Floating animation */}
              <motion.div
                animate={{
                  y: [0, -3, 0],
                  rotateZ: [0, 1, 0, -1, 0],
                }}
                transition={{
                  y: {
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                  rotateZ: {
                    duration: 5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`relative p-3 rounded-xl border backdrop-blur-sm transition-all duration-500 ${
                  isExpanded
                    ? "col-span-2 border-white/[0.1] bg-white/[0.04]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
                style={{
                  boxShadow: isExpanded
                    ? `0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px ${skill.color}15`
                    : "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <motion.div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isExpanded ? "bg-white/[0.06]" : "bg-white/[0.03]"
                    }`}
                    animate={
                      isExpanded
                        ? {
                            boxShadow: `0 0 20px ${skill.color}15`,
                            scale: 1.05,
                          }
                        : { boxShadow: "none", scale: 1 }
                    }
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{
                        color: isExpanded ? skill.color : "rgba(201,169,110,0.4)",
                      }}
                    />
                  </motion.div>
                  <span className="text-white font-display font-semibold text-xs tracking-tight">
                    {skill.shortLabel}
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2.5">
                        <h4 className="text-white font-display font-bold text-sm mb-1.5">
                          {skill.title}
                        </h4>
                        <p className="text-white/40 text-[11px] leading-relaxed">
                          {skill.description}
                        </p>
                        <div
                          className="mt-2.5 h-[1px]"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${skill.color}30, transparent)`,
                          }}
                        />
                        {/* Skill-specific mini animation */}
                        <SkillMiniAnimation skill={skill} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Mobile: Mini skill-specific animation ─── */
function SkillMiniAnimation({ skill }: { skill: typeof skills[0] }) {
  if (skill.id === "shopify") {
    return (
      <div className="flex gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded border border-[#95BF47]/20 bg-[#95BF47]/5"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    );
  }

  if (skill.id === "design") {
    return (
      <svg className="mt-2 w-full h-6 overflow-visible">
        <motion.path
          d="M 0 12 Q 30 0 60 12 T 120 8"
          fill="none"
          stroke={skill.color}
          strokeWidth="1"
          strokeDasharray="120"
          animate={{ strokeDashoffset: [120, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.3 }}
        />
      </svg>
    );
  }

  if (skill.id === "3d") {
    return (
      <motion.div className="mt-2 w-6 h-6 relative">
        <motion.div
          className="absolute inset-0 border border-[#8A8D91]/20 rounded"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1 border border-[#8A8D91]/10 rounded-sm"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  }

  if (skill.id === "whatsapp") {
    return (
      <div className="flex items-center gap-2 mt-2">
        <motion.div
          className="w-5 h-3 rounded-full border border-[#25D366]/20 bg-[#25D366]/5"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="text-[#25D366] text-[10px]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          ✓
        </motion.span>
      </div>
    );
  }

  if (skill.id === "code") {
    return (
      <div className="mt-2 flex gap-1">
        {["{", "}", ";"].map((char, i) => (
          <motion.span
            key={i}
            className="text-[9px] font-mono text-[#61DAFB]/40"
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  }

  if (skill.id === "cro") {
    return (
      <svg className="mt-2 w-16 h-6 overflow-visible">
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={i * 12}
            y={20 - (i + 1) * 4}
            width="8"
            height={(i + 1) * 4}
            fill={skill.color}
            opacity="0.2"
            animate={{ opacity: [0.1, 0.3, 0.1], height: [(i + 1) * 3, (i + 1) * 5, (i + 1) * 3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </svg>
    );
  }

  return null;
}
