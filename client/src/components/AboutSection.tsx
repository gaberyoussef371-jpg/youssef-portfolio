/**
 * AboutSection — "I don't just build stores. I build decision-making systems."
 * Design: Liquid Obsidian — interactive customer journey path with scroll animations
 */
import { motion } from "framer-motion";
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
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />

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
            Why Work With Me
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            I DON'T JUST BUILD STORES.
            <br />
            <span className="text-gold-gradient">I BUILD DECISION-MAKING SYSTEMS.</span>
          </h2>
        </motion.div>

        {/* Customer Journey Path */}
        <div
          ref={journeyRef}
          className="relative max-w-5xl mx-auto mb-24"
        >
          {/* Connection line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
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
                <h4 className="text-white text-sm font-display font-semibold mb-1">
                  {step.label}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed max-w-[140px]">
                  {step.description}
                </p>

                {/* Arrow connector (mobile) */}
                {i < journeySteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <div className="w-[1px] h-6 bg-[#C9A96E]/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Explanation Text */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 40 }}
          animate={textVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
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
        </motion.div>
      </div>
    </section>
  );
}
