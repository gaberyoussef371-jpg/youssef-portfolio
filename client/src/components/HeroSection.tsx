/**
 * HeroSection — Full-screen cinematic hero with 3D character and floating elements
 * Design: Liquid Obsidian
 * Desktop: 2-column with avatar + text | Mobile: centered compact with floating badges
 */
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useScrollAnimation";
import { MessageSquare, Mail, Send } from "lucide-react";

export default function HeroSection() {
  const mouseOffset = useMouseParallax();
  const [showContact, setShowContact] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663843627654/BUgICFdQRxMEZovn.png"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </motion.div>

      {/* Cursor Spotlight — desktop only */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${50 + mouseOffset.x * 20}% ${50 + mouseOffset.y * 20}%, rgba(201,169,110,0.04) 0%, transparent 60%)`,
        }}
      />

      {/* Floating 3D Elements */}
      <FloatingElements mouseOffset={mouseOffset} />

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 container max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[70vh] md:min-h-[80vh]">
          {/* Text Content — Left Side (desktop) / Center (mobile) */}
          <div className={`space-y-6 md:space-y-8 ${
            // Desktop: left column
            // Mobile: centered text with floating avatar badge
            "lg:col-span-7"
          }`}>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/5"
            >
              <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="text-[#C9A96E] text-[10px] md:text-xs font-mono tracking-wider uppercase">
                Available for Projects
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display font-bold text-white leading-[1.05] tracking-tight"
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                I BUILD SHOPIFY
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1">
                EXPERIENCES THAT
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 text-gold-gradient">
                CONVERT.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-white/50 text-sm md:text-lg max-w-md md:max-w-xl leading-relaxed font-light"
            >
              Custom Shopify stores designed around customer psychology, conversion,
              and unforgettable digital experiences.
            </motion.p>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col gap-1"
            >
              <h2 className="text-white text-lg md:text-xl font-display font-semibold">
                Youssef Shehata
              </h2>
              <p className="text-[#C9A96E]/80 text-xs md:text-sm font-mono">
                Shopify Developer & E-Commerce Experience Designer
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => setShowContact(true)}
                className="group relative px-6 md:px-8 py-3.5 md:py-4 bg-[#C9A96E] text-black font-semibold text-xs md:text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] active:scale-95 text-center"
              >
                <span className="relative z-10">LET'S BUILD SOMETHING THAT CONVERTS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A96E] to-[#E8D5A3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 md:px-8 py-3.5 md:py-4 border border-white/10 text-white font-medium text-xs md:text-sm rounded-full hover:border-[#C9A96E]/30 hover:bg-[#C9A96E]/5 transition-all duration-300 text-center"
              >
                VIEW MY WORK
              </a>
            </motion.div>
          </div>

          {/* Character — Right Side (desktop only) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
              style={{
                transform: `translate(${mouseOffset.x * -15}px, ${mouseOffset.y * -10}px)`,
              }}
            >
              <div className="relative w-80 h-96 mx-auto">
                <div className="absolute inset-0 bg-[#C9A96E]/10 rounded-full blur-3xl scale-150" />
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663843627654/DhahEeswOAmUDaDM.png"
                    alt="Youssef Shehata"
                    className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(201,169,110,0.2)]"
                    style={{ filter: "brightness(1.05) contrast(1.05)" }}
                  />
                </motion.div>
                <FloatingBadge label="Shopify" x={-60} y={20} delay={0} />
                <FloatingBadge label="CRO" x={80} y={60} delay={0.5} />
                <FloatingBadge label="UI/UX" x={-70} y={160} delay={1} />
                <FloatingBadge label="3D" x={90} y={200} delay={1.5} />
              </div>
            </motion.div>
          </div>

          {/* Mobile: Compact avatar with floating badges */}
          <div className="lg:hidden flex justify-center mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative w-32 h-32"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-[#C9A96E]/10 rounded-full blur-2xl scale-150" />

              {/* Avatar circle */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-full overflow-hidden border border-[#C9A96E]/20"
              >
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663843627654/DhahEeswOAmUDaDM.png"
                  alt="Youssef Shehata"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating mini badges around avatar */}
              <motion.div
                className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full glass text-[#C9A96E] text-[8px] font-mono"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Shopify
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full glass text-[#C9A96E] text-[8px] font-mono"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                CRO
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-3 px-2 py-0.5 rounded-full glass text-[#C9A96E] text-[8px] font-mono"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                3D
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#C9A96E] to-transparent"
        />
      </motion.div>

      {/* Contact Modal */}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </section>
  );
}

function FloatingElements({ mouseOffset }: { mouseOffset: { x: number; y: number } }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines — desktop only */}
      <div
        className="absolute inset-0 opacity-[0.03] hidden md:block"
        style={{
          backgroundImage: `linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          transform: `translate(${mouseOffset.x * 5}px, ${mouseOffset.y * 5}px)`,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-24 md:w-32 h-24 md:h-32 rounded-full bg-[#C9A96E]/5 blur-2xl"
        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-32 md:w-48 h-32 md:h-48 rounded-full bg-[#C9A96E]/3 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

function FloatingBadge({ label, x, y, delay }: { label: string; x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute px-3 py-1.5 glass rounded-full"
      style={{ left: `calc(50% + ${x}px)`, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 1.2, duration: 0.4 }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        className="text-[#C9A96E]/80 text-xs font-mono"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md glass rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          ×
        </button>

        <h3 className="text-white text-xl font-display font-bold mb-2">
          Let's Build Something
        </h3>
        <p className="text-white/50 text-sm mb-6">
          Choose how you'd like to connect:
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/2001272929847"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-white hover:bg-[#25D366]/20 transition-all duration-300"
          >
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            <div>
              <p className="text-sm font-medium">WhatsApp</p>
              <p className="text-xs text-white/40">01272929847</p>
            </div>
          </a>

          <a
            href="mailto:gaberyoussef371@gmail.com"
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-white hover:bg-[#C9A96E]/20 transition-all duration-300"
          >
            <Mail className="w-5 h-5 text-[#C9A96E]" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-white/40">gaberyoussef371@gmail.com</p>
            </div>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
          >
            <Send className="w-5 h-5 text-[#C9A96E]" />
            <div>
              <p className="text-sm font-medium">Submit a Project Request</p>
              <p className="text-xs text-white/40">Fill out the project form</p>
            </div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
