/**
 * Footer — Minimal footer with branding and links
 */
import { MessageSquare, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Branding */}
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/logo_328c4d31.png"
              alt="YS"
              className="w-8 h-8"
            />
            <div>
              <p className="text-white font-display font-semibold text-sm">Youssef Shehata</p>
              <p className="text-white/30 text-xs">Shopify Developer & E-Commerce Designer</p>
            </div>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right - Contact */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/2001272929847"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-white/60" />
            </a>
            <a
              href="mailto:gaberyoussef371@gmail.com"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A96E]/20 transition-colors"
            >
              <Mail className="w-4 h-4 text-white/60" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Youssef Shehata. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-mono">
            Built with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
