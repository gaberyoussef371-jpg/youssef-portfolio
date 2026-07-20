/**
 * CROSection — Conversion optimization showcase with animated funnel
 * Design: Liquid Obsidian
 * Desktop: vertical funnel | Mobile: horizontal scroll funnel + compact grid
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  MousePointerClick,
  Eye,
  Shield,
  ShoppingCart,
  CreditCard,
  Repeat,
} from "lucide-react";

const funnelSteps = [
  { icon: MousePointerClick, label: "Visitor", color: "#8A8D91" },
  { icon: Eye, label: "Interest", color: "#A09070" },
  { icon: Shield, label: "Trust", color: "#B0A080" },
  { icon: ShoppingCart, label: "Add to Cart", color: "#C0B088" },
  { icon: CreditCard, label: "Purchase", color: "#C9A96E" },
  { icon: Repeat, label: "Repeat Customer", color: "#E8D5A3" },
];

const optimizations = [
  "Clear CTAs",
  "Product pages",
  "Reduce friction",
  "Trust signals",
  "Info placement",
  "Upsells",
  "Cross-sells",
  "Bundles",
  "Mobile-first",
  "Performance",
  "Journey mapping",
  "Data-driven",
];

export default function CROSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: funnelRef, isVisible: funnelVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c12] to-black" />

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
            Conversion Rate Optimization
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            BEAUTIFUL IS GOOD.
            <br />
            <span className="text-gold-gradient">CONVERTING IS BETTER.</span>
          </h2>
          <p className="text-white/40 mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            Every element of a Shopify store should have a purpose. Beautiful design
            attracts attention — but strategic design drives revenue.
          </p>
        </motion.div>

        {/* Animated Funnel */}
        <div ref={funnelRef} className="max-w-4xl mx-auto mb-10 md:mb-24">
          {/* Desktop version */}
          <div className="hidden md:flex flex-col items-center gap-4">
            {funnelSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={funnelVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex items-center justify-center"
              >
                <div
                  className="absolute left-0 right-0 h-full"
                  style={{
                    width: `${100 - i * 8}%`,
                    marginLeft: `${i * 4}%`,
                    background: `linear-gradient(90deg, transparent, ${step.color}08, transparent)`,
                    borderRadius: "999px",
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative flex items-center gap-4 px-6 py-3 rounded-full border backdrop-blur-sm ${
                    i === funnelSteps.length - 1
                      ? "border-[#C9A96E]/30 bg-[#C9A96E]/10"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                  style={{ width: `calc(${80 - i * 5}%)` }}
                >
                  <step.icon className="w-5 h-5 shrink-0" style={{ color: step.color }} />
                  <span className="text-white/80 text-sm font-medium">{step.label}</span>
                  <span className="ml-auto text-xs font-mono text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                {i < funnelSteps.length - 1 && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile: Horizontal scroll funnel */}
          <div className="md:hidden">
            <div className="flex items-end gap-2 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
              {funnelSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={funnelVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="shrink-0 snap-center"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className={`relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl border ${
                      i === funnelSteps.length - 1
                        ? "border-[#C9A96E]/25 bg-[#C9A96E]/8"
                        : "border-white/[0.06] bg-white/[0.03]"
                    }`}
                    style={{ minWidth: "96px" }}
                  >
                    <span className="text-[9px] font-mono text-[#C9A96E]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                    <span className="text-white/70 text-[11px] font-medium text-center">
                      {step.label}
                    </span>
                  </motion.div>
                  {/* Connector arrow */}
                  {i < funnelSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 text-[#C9A96E]/20 text-[10px]">
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={funnelVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="text-center text-white/20 text-[10px] font-mono mt-2"
            >
              ← Swipe through the funnel →
            </motion.p>
          </div>
        </div>

        {/* Optimization Features */}
        <div ref={listRef} className="max-w-4xl mx-auto">
          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-4 gap-3">
            {optimizations.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={listVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C9A96E]/20 hover:bg-[#C9A96E]/5 transition-all duration-300"
              >
                <div className="w-1 h-1 rounded-full bg-[#C9A96E] shrink-0" />
                <span className="text-white/60 text-xs font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Staggered scattered composition */}
          <div className="md:hidden relative">
            {/* Row 1 */}
            <div className="flex gap-2 mb-2">
              {optimizations.slice(0, 3).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={listVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                  style={{ flex: i === 1 ? 1.2 : 1 }}
                >
                  <div className="w-1 h-1 rounded-full bg-[#C9A96E] shrink-0" />
                  <span className="text-white/50 text-[11px] font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            {/* Row 2 — offset */}
            <div className="flex gap-2 mb-2 ml-4">
              {optimizations.slice(3, 6).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={listVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: (i + 3) * 0.08 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                  style={{ flex: i === 1 ? 1.3 : 1 }}
                >
                  <div className="w-1 h-1 rounded-full bg-[#C9A96E] shrink-0" />
                  <span className="text-white/50 text-[11px] font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            {/* Row 3 — offset right */}
            <div className="flex gap-2 mb-2 ml-2">
              {optimizations.slice(6, 9).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={listVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: (i + 6) * 0.08 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                >
                  <div className="w-1 h-1 rounded-full bg-[#C9A96E] shrink-0" />
                  <span className="text-white/50 text-[11px] font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            {/* Row 4 — center */}
            <div className="flex justify-center gap-2">
              {optimizations.slice(9, 12).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  animate={listVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: (i + 9) * 0.08 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#C9A96E]/5 border border-[#C9A96E]/10"
                >
                  <div className="w-1 h-1 rounded-full bg-[#C9A96E] shrink-0" />
                  <span className="text-[#C9A96E]/70 text-[11px] font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
