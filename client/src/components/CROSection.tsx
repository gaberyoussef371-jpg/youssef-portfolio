/**
 * CROSection — Conversion optimization showcase with animated funnel
 * Design: Liquid Obsidian — funnel steps animate on scroll
 */
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
  "Clear calls to action",
  "Better product page structure",
  "Reducing friction before purchase",
  "Trust-building elements",
  "Strategic placement of information",
  "Upsell systems",
  "Cross-sell systems",
  "Product bundles",
  "Mobile optimization",
  "Website performance",
  "Customer journey optimization",
  "Data-driven improvements",
];

export default function CROSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: funnelRef, isVisible: funnelVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c12] to-black" />

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
            Conversion Rate Optimization
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            BEAUTIFUL IS GOOD.
            <br />
            <span className="text-gold-gradient">CONVERTING IS BETTER.</span>
          </h2>
          <p className="text-white/40 mt-6 max-w-2xl mx-auto">
            Every element of a Shopify store should have a purpose. Beautiful design
            attracts attention — but strategic design drives revenue.
          </p>
        </motion.div>

        {/* Animated Funnel */}
        <div
          ref={funnelRef}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="flex flex-col items-center gap-4">
            {funnelSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={funnelVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex items-center gap-4"
              >
                {/* Funnel width indicator */}
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

                {/* Connector line */}
                {i < funnelSteps.length - 1 && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Optimization Features Grid */}
        <div ref={listRef} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
        </div>
      </div>
    </section>
  );
}
