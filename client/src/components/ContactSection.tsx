/**
 * ContactSection — Final CTA with project inquiry form
 * Design: Liquid Obsidian
 * Desktop: 2-column | Mobile: stacked but compact with quick-contact pills
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MessageSquare, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { submitMessage } from "@/lib/data/messages";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandName: "",
    projectType: "",
    budget: "",
    details: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitMessage({
        name: formData.name,
        email: formData.email,
        brandName: formData.brandName || undefined,
        projectType: formData.projectType || undefined,
        budget: formData.budget || undefined,
        details: formData.details || undefined,
      });
    } catch {
      // Non-blocking: mailto fallback still works if storage fails
    }

    const subject = encodeURIComponent(`Project Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nBrand: ${formData.brandName}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\n\nDetails:\n${formData.details}`
    );
    window.location.href = `mailto:gaberyoussef371@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0a08] to-black" />

      <div ref={ref} className="relative z-10 container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-8 md:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            HAVE A STORE THAT
            <br />
            <span className="text-gold-gradient">DESERVES MORE?</span>
          </h2>
          <p className="text-white/40 mt-4 md:mt-6 max-w-2xl mx-auto text-sm">
            Let's build a Shopify experience that looks different, works better, and converts more.
          </p>
        </motion.div>

        {/* Desktop: 2-column */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <ContactMethods isVisible={isVisible} />
          <ProjectForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isVisible={isVisible} />
        </div>

        {/* Mobile: Compact stacked */}
        <div className="lg:hidden max-w-md mx-auto">
          {/* Quick contact pills — horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 mb-6"
          >
            <a
              href="https://wa.me/2001272929847"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-white text-xs font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              WhatsApp
            </a>
            <a
              href="mailto:gaberyoussef371@gmail.com"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-white text-xs font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-[#C9A96E]" />
              Email
            </a>
          </motion.div>

          {/* Project Form — compact */}
          <ProjectForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isVisible={isVisible}
            compact
          />
        </div>
      </div>
    </section>
  );
}

function ContactMethods({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <h3 className="text-white font-display font-semibold text-xl">
        Start a Conversation
      </h3>
      <a
        href="https://wa.me/2001272929847"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
          <MessageSquare className="w-5 h-5 text-[#25D366]" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">Message on WhatsApp</p>
          <p className="text-white/40 text-xs mt-0.5">01272929847</p>
        </div>
      </a>
      <a
        href="mailto:gaberyoussef371@gmail.com"
        className="flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#C9A96E]/30 hover:bg-[#C9A96E]/5 transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center group-hover:bg-[#C9A96E]/20 transition-colors">
          <Mail className="w-5 h-5 text-[#C9A96E]" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">Send an Email</p>
          <p className="text-white/40 text-xs mt-0.5">gaberyoussef371@gmail.com</p>
        </div>
      </a>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("project-form-mobile")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-3.5 bg-[#C9A96E] text-black font-semibold text-sm rounded-full text-center hover:bg-[#D4B87A] hover:shadow-[0_0_30px_rgba(201,169,110,0.3)] transition-all duration-300 active:scale-95"
        >
          START A PROJECT
        </a>
        <a
          href="https://wa.me/2001272929847"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 border border-white/10 text-white font-medium text-sm rounded-full text-center hover:border-[#C9A96E]/30 transition-all duration-300"
        >
          MESSAGE ME ON WHATSAPP
        </a>
      </div>
    </motion.div>
  );
}

function ProjectForm({
  formData,
  setFormData,
  handleSubmit,
  isVisible,
  compact,
}: {
  formData: any;
  setFormData: any;
  handleSubmit: (e: React.FormEvent) => void;
  isVisible: boolean;
  compact?: boolean;
}) {
  return (
    <motion.div
      id={compact ? "project-form-mobile" : "project-form"}
      initial={{ opacity: 0, x: 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {compact ? (
          <>
            {/* Mobile compact form */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-[10px] font-mono mb-1.5 block">NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-white/40 text-[10px] font-mono mb-1.5 block">EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-white/40 text-[10px] font-mono mb-1.5 block">BUSINESS / BRAND NAME</label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors"
                placeholder="Your brand name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-[10px] font-mono mb-1.5 block">PROJECT TYPE</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:border-[#C9A96E]/30 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-[#0a0a0f]">Select type</option>
                  <option value="new-store" className="bg-[#0a0a0f]">New Shopify Store</option>
                  <option value="redesign" className="bg-[#0a0a0f]">Store Redesign</option>
                  <option value="optimization" className="bg-[#0a0a0f]">CRO / Optimization</option>
                  <option value="custom-code" className="bg-[#0a0a0f]">Custom Development</option>
                  <option value="full-service" className="bg-[#0a0a0f]">Full Service</option>
                </select>
              </div>
              <div>
                <label className="text-white/40 text-[10px] font-mono mb-1.5 block">BUDGET</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs focus:border-[#C9A96E]/30 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-[#0a0a0f]">Select range</option>
                  <option value="1k-3k" className="bg-[#0a0a0f]">$1,000 — $3,000</option>
                  <option value="3k-5k" className="bg-[#0a0a0f]">$3,000 — $5,000</option>
                  <option value="5k-10k" className="bg-[#0a0a0f]">$5,000 — $10,000</option>
                  <option value="10k+" className="bg-[#0a0a0f]">$10,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-white/40 text-[10px] font-mono mb-1.5 block">PROJECT DETAILS</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
          </>
        ) : (
          <>
            {/* Desktop form */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs font-mono mb-2 block">NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs font-mono mb-2 block">EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs font-mono mb-2 block">BUSINESS / BRAND NAME</label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors"
                placeholder="Your brand name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs font-mono mb-2 block">PROJECT TYPE</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-[#C9A96E]/30 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-[#0a0a0f]">Select type</option>
                  <option value="new-store" className="bg-[#0a0a0f]">New Shopify Store</option>
                  <option value="redesign" className="bg-[#0a0a0f]">Store Redesign</option>
                  <option value="optimization" className="bg-[#0a0a0f]">CRO / Optimization</option>
                  <option value="custom-code" className="bg-[#0a0a0f]">Custom Development</option>
                  <option value="full-service" className="bg-[#0a0a0f]">Full Service</option>
                </select>
              </div>
              <div>
                <label className="text-white/50 text-xs font-mono mb-2 block">BUDGET</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:border-[#C9A96E]/30 focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-[#0a0a0f]">Select range</option>
                  <option value="1k-3k" className="bg-[#0a0a0f]">$1,000 — $3,000</option>
                  <option value="3k-5k" className="bg-[#0a0a0f]">$3,000 — $5,000</option>
                  <option value="5k-10k" className="bg-[#0a0a0f]">$5,000 — $10,000</option>
                  <option value="10k+" className="bg-[#0a0a0f]">$10,000+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs font-mono mb-2 block">PROJECT DETAILS</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-[#C9A96E]/30 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project, goals, and timeline..."
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3.5 bg-[#C9A96E] text-black font-semibold text-xs md:text-sm rounded-xl hover:bg-[#D4B87A] hover:shadow-[0_0_40px_rgba(201,169,110,0.2)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          SUBMIT PROJECT REQUEST
        </button>
      </form>
    </motion.div>
  );
}
