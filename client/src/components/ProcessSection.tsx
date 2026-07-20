/**
 * ProcessSection — Interactive 6-step process timeline
 * Design: Liquid Obsidian — animated vertical timeline with scroll triggers
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
    <section id="process" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a10] to-black" />

      <div className="relative z-10 container max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-4">
            How I Work
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            A <span className="text-gold-gradient">PROCESS</span> BUILT FOR RESULTS
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="relative">
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C9A96E]/30 via-[#C9A96E]/10 to-transparent" />

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
      {/* Timeline dot */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full glass flex items-center justify-center group-hover:border-[#C9A96E]/30 transition-all duration-300 z-10">
          <step.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#C9A96E]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 group-hover:translate-x-2 transition-transform duration-300">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#C9A96E]/50 text-xs font-mono">{step.number}</span>
          <h3 className="text-white font-display font-semibold text-lg lg:text-xl tracking-tight">
            {step.title}
          </h3>
        </div>
        <p className="text-white/40 text-sm lg:text-base leading-relaxed max-w-lg">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
