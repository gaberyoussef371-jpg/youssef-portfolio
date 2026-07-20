/**
 * AboutSection — "I don't just build stores. I build decision-making systems."
 * Design: Liquid Obsidian
 * Desktop: vertical journey path | Mobile: horizontal scrollable journey + staggered text
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Eye, Shield, Heart, HandCoins, ShoppingCart } from "lucide-react";

const journeySteps = [
  { icon: Eye, label: "Attention", description: "Capture the visitor's eye with premium design" },
  { icon: Shield, label: "Trust", description: "Build credibility through professional presentation" },
  { icon: Heart, label: "Desire", description: "Create emotional connection with the product" },
  { icon: HandCoins, label: "Decision", description: "Guide the customer toward purchase confidence" },
  { icon: ShoppingCart, label: "Purchase", description: "Remove friction and complete the conversion" },
];

export default function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: journeyRef, isVisible: journeyVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />

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
            Why Work With Me
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            I DON'T JUST BUILD STORES.
            <br />
            <span className="text-gold-gradient">I BUILD DECISION-MAKING SYSTEMS.</span>
          </h2>
        </motion.div>

        {/* Customer Journey — Mobile: Horizontal scroll */}
        <div ref={journeyRef} className="relative mb-10 md:mb-24">
          {/* Desktop version — hidden on mobile */}
          <div className="hidden md:block max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
              <div className="grid grid-cols-5 gap-4">
                {journeySteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={journeyVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(201,169,110,0.2)" }}
                      className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 group-hover:border-[#C9A96E]/30 transition-all duration-300"
                    >
                      <step.icon className="w-6 h-6 text-[#C9A96E]" />
                    </motion.div>
                    <h4 className="text-white text-sm font-display font-semibold mb-1">{step.label}</h4>
                    <p className="text-white/40 text-xs leading-relaxed max-w-[140px]">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Horizontal scrollable journey */}
          <div className="md:hidden">
            <motion.div
              className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {journeySteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={journeyVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 w-[140px] snap-center"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className={`relative p-4 rounded-xl border h-full ${
                      i === 4
                        ? "border-[#C9A96E]/25 bg-[#C9A96E]/8"
                        : "border-white/[0.06] bg-white/[0.03]"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 mx-auto">
                      <step.icon className="w-5 h-5 text-[#C9A96E]" />
                    </div>
                    <h4 className="text-white text-sm font-display font-semibold text-center mb-1">
                      {step.label}
                    </h4>
                    <p className="text-white/35 text-[11px] leading-relaxed text-center">
                      {step.description}
                    </p>
                    {/* Step number */}
                    <div className="absolute top-2 right-2 text-[9px] font-mono text-[#C9A96E]/30">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={journeyVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="text-center text-white/20 text-[10px] font-mono mt-2"
            >
              ← Swipe to explore →
            </motion.p>
          </div>
        </div>

        {/* Explanation Text — Desktop: 2-col | Mobile: compact staggered */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 40 }}
          animate={textVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed">
                A beautiful website is not enough. A customer does not buy simply because
                a website looks good. They buy when the website makes the decision easy.
              </p>
              <p className="text-white/70 leading-relaxed">
                I combine design, development, customer psychology, e-commerce strategy,
                and conversion optimization to create Shopify experiences that guide users
                from the first interaction to the purchase.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Design Systems & Visual Identity",
                "Custom Shopify Development",
                "Customer Psychology & CRO",
                "E-Commerce Strategy",
                "Conversion Optimization",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={textVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 text-white/60 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile layout — compact with overlapping layers */}
          <div className="md:hidden space-y-4">
            <p className="text-white/60 text-sm leading-relaxed">
              A beautiful website is not enough. A customer does not buy simply because
              a website looks good. They buy when the website makes the decision easy.
            </p>

            {/* Staggered skill chips */}
            <div className="flex flex-wrap gap-2">
              {["Design Systems", "Shopify Dev", "CRO", "E-Commerce", "Conversion"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={textVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/50 text-[11px] font-mono"
                  style={{
                    transform: i % 2 === 0 ? "translateY(0)" : "translateY(4px)",
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              I combine design, development, customer psychology, and conversion optimization
              to create Shopify experiences that guide users to purchase.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
