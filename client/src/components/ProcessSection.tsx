/**
 * ProcessSection — Interactive 6-step process timeline
 * Design: Liquid Obsidian
 * Desktop: vertical timeline | Mobile: horizontal scroll + staggered cards
 */
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Search, BarChart3, PenTool, Code, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "DISCOVER",
    description: "Understand the brand, product, audience, and business goals.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "STRATEGIZE",
    description: "Analyze the customer journey and identify conversion opportunities.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "DESIGN",
    description: "Create a unique interface and visual direction.",
  },
  {
    number: "04",
    icon: Code,
    title: "DEVELOP",
    description: "Build the experience using custom Shopify development and custom code.",
  },
  {
    number: "05",
    icon: Zap,
    title: "OPTIMIZE",
    description: "Improve performance, user experience, and conversion rate.",
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "GROW",
    description: "Use data and customer behavior to continuously improve the store.",
  },
];

export default function ProcessSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="process" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a10] to-black" />

      <div className="relative z-10 container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-10 md:mb-24"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-4">
            How I Work
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
            A <span className="text-gold-gradient">PROCESS</span> BUILT FOR RESULTS
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          {/* Desktop version */}
          <div className="hidden md:block relative">
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C9A96E]/30 via-[#C9A96E]/10 to-transparent" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <ProcessStep
                  key={step.number}
                  step={step}
                  index={i}
                  isVisible={timelineVisible}
                />
              ))}
            </div>
          </div>

          {/* Mobile: Horizontal scroll process */}
          <div className="md:hidden">
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={timelineVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="shrink-0 snap-center"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className={`relative w-[140px] p-4 rounded-xl border h-full ${
                      i === 5
                        ? "border-[#C9A96E]/25 bg-[#C9A96E]/8"
                        : "border-white/[0.06] bg-white/[0.03]"
                    }`}
                  >
                    <span className="text-[9px] font-mono text-[#C9A96E]/30 mb-2 block">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3">
                      <step.icon className="w-5 h-5 text-[#C9A96E]" />
                    </div>
                    <h3 className="text-white text-sm font-display font-semibold mb-1">
                      {step.title}
                    </h3>
                    <p className="text-white/35 text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={timelineVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="text-center text-white/20 text-[10px] font-mono mt-2"
            >
              ← Swipe through the process →
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  isVisible,
}: {
  step: typeof steps[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative flex gap-6 lg:gap-8 group"
    >
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:border-[#C9A96E]/30 transition-all duration-300 z-10">
          <step.icon className="w-6 h-6 text-[#C9A96E]" />
        </div>
      </div>
      <div className="flex-1 pb-8 group-hover:translate-x-2 transition-transform duration-300">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#C9A96E]/50 text-xs font-mono">{step.number}</span>
          <h3 className="text-white font-display font-semibold text-xl tracking-tight">
            {step.title}
          </h3>
        </div>
        <p className="text-white/40 text-base leading-relaxed max-w-lg">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
