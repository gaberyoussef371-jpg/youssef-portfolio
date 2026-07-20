/**
 * WorkSection — Project showcase with 3D card hover effects
 * Design: Liquid Obsidian — large interactive cards with perspective rotation
 */
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    image: "/manus-storage/project-1_91fb388c.png",
    name: "Luxury Fashion Store",
    client: "Premium Fashion Brand",
    category: "Shopify Development",
    description: "Complete custom Shopify development with conversion-optimized product pages, advanced filtering, and premium checkout experience.",
    technologies: ["Shopify", "Liquid", "Custom Sections", "Tailwind"],
    results: "150% increase in conversion rate",
  },
  {
    image: "/manus-storage/project-2_0cb15783.png",
    name: "Beauty & Cosmetics",
    client: "Beauty Brand",
    category: "UI/UX Design",
    description: "Full UI/UX redesign focusing on product discovery, social proof integration, and streamlined purchase flow.",
    technologies: ["Shopify", "UI/UX", "CRO", "Figma"],
    results: "85% improvement in mobile conversion",
  },
  {
    image: "/manus-storage/project-3_4813aea2.png",
    name: "Health & Supplements",
    client: "Wellness Company",
    category: "E-Commerce Strategy",
    description: "Strategic e-commerce redesign with subscription model, upsell flows, and automated customer retention systems.",
    technologies: ["Shopify Plus", "Subscriptions", "Automation", "Analytics"],
    results: "3x increase in average order value",
  },
  {
    image: "/manus-storage/project-4_894f2119.png",
    name: "Tech & Electronics",
    client: "Electronics Brand",
    category: "Custom Code",
    description: "High-performance custom Shopify theme with 3D product visualization, advanced comparison tools, and real-time inventory.",
    technologies: ["Shopify", "React", "Three.js", "API"],
    results: "200ms page load improvement",
  },
];

export default function WorkSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#090910] to-black" />

      <div ref={ref} className="relative z-10 container max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            PROJECTS THAT <span className="text-gold-gradient">DELIVER RESULTS</span>
          </h2>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Add more projects note */}
        <div className="mt-12 text-center">
          <p className="text-white/30 text-sm font-mono">
            More projects coming soon — ready to add your own work
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: typeof projects[0];
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useTransform(y, [-150, 150], [6, -6]);
  const rotateY = useTransform(x, [-150, 150], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-[#C9A96E]/20 hover:shadow-[0_20px_60px_rgba(201,169,110,0.08)]"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-sm text-[#C9A96E] border border-[#C9A96E]/20">
              {project.category}
            </span>
          </div>

          {/* View project button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 right-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-black" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div>
            <h3 className="text-white font-display font-semibold text-lg">{project.name}</h3>
            <p className="text-white/40 text-sm">{project.client}</p>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md text-xs font-mono bg-white/5 text-white/40"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="pt-2 border-t border-white/5">
            <p className="text-[#C9A96E] text-xs font-medium">{project.results}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
