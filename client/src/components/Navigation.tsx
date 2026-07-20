/**
 * Navigation — minimal floating nav with glassmorphism on scroll
 * Design: Liquid Obsidian — transforms from transparent to frosted glass
 * Mobile: compact top bar + horizontal pill nav below
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "#home", label: "Home", icon: "H" },
  { href: "#about", label: "About", icon: "A" },
  { href: "#skills", label: "Skills", icon: "S" },
  { href: "#work", label: "Work", icon: "W" },
  { href: "#process", label: "Process", icon: "P" },
  { href: "#contact", label: "Contact", icon: "C" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 md:py-3 bg-black/60 backdrop-blur-xl border-b border-white/5"
          : "py-3 md:py-5 bg-transparent"
      }`}
    >
      <div className="container max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2 group" onClick={(e) => {
          e.preventDefault();
          handleNavClick("#home");
        }}>
          <img
            src="/manus-storage/logo_328c4d31.png"
            alt="YS"
            className="w-7 h-7 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-display font-bold text-white text-sm md:text-lg tracking-tight hidden sm:block">
            YOUSSEF
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C9A96E] group-hover:w-3/4 transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className="hidden md:inline-flex px-5 py-2.5 text-sm font-medium bg-[#C9A96E] text-black rounded-full hover:bg-[#D4B87A] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
        >
          Let's Talk
        </a>

        {/* Mobile: Let's Talk icon button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className="md:hidden w-9 h-9 rounded-full bg-[#C9A96E] flex items-center justify-center"
        >
          <span className="text-black text-xs font-bold">→</span>
        </a>
      </div>

      {/* Mobile: Horizontal pill nav */}
      <div className="md:hidden mt-2">
        <div className="flex gap-1 overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide snap-x">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`shrink-0 snap-start px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider border transition-all duration-300 ${
                scrolled
                  ? "border-white/[0.06] bg-white/[0.03] text-white/50"
                  : "border-white/5 bg-black/40 text-white/40"
              }`}
              style={{
                minWidth: "56px",
                textAlign: "center",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
