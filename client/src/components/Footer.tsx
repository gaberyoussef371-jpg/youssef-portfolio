/**
 * Footer — Minimal footer with branding and links
 * Desktop: 3-column | Mobile: compact stacked
 */
import { MessageSquare, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-10 md:py-16 border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left - Branding */}
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/logo_328c4d31.png"
              alt="YS"
              className="w-7 h-7 md:w-8 md:h-8"
            />
            <div>
              <p className="text-white font-display font-semibold text-xs md:text-sm">Youssef Shehata</p>
              <p className="text-white/30 text-[10px] md:text-xs">Shopify Developer & E-Commerce Designer</p>
            </div>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-4 md:gap-6">
            {["Home", "Work", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.toLowerCase();
                  if (id === "home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-white/40 text-xs md:text-sm hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right - Contact */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/2001272929847"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60" />
            </a>
            <a
              href="mailto:gaberyoussef371@gmail.com"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A96E]/20 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-[10px] md:text-xs">
            &copy; {new Date().getFullYear()} Youssef Shehata. All rights reserved.
          </p>
          <p className="text-white/20 text-[10px] md:text-xs font-mono">
            Built with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
