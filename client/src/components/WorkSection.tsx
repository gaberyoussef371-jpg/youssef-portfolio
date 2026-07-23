/**
 * WorkSection — Project showcase with 3D card hover effects
 * Design: Liquid Obsidian
 * Desktop: 2x2 grid with 3D tilt | Mobile: horizontal scroll carousel with large cards
 */
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/data/projects";
import type { PortfolioProject } from "@/lib/data/types";

type DisplayProject = {
  image: string;
  name: string;
  client: string;
  url: string;
  category: string;
  description: string;
  technologies: string[];
  results: string;
};

function toDisplayProject(project: PortfolioProject): DisplayProject {
  return {
    image: project.imageUrl,
    name: project.title,
    client: project.client ?? project.title,
    url: project.liveUrl,
    category: project.category ?? "Portfolio Project",
    description: project.description,
    technologies: project.techStack,
    results: project.results ?? "",
  };
}

export default function WorkSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [projects, setProjects] = useState<DisplayProject[]>([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data.map(toDisplayProject)));
  }, []);

  return (
    <section id="work" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#090910] to-black" />

      <div ref={ref} className="relative z-10 container max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-20"
        >
          <p className="text-[#C9A96E] text-xs font-mono tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
            PROJECTS THAT <span className="text-gold-gradient">DELIVER RESULTS</span>
          </h2>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {projects.length === 0 && (
            <p className="col-span-2 text-center text-white/30 text-sm font-mono py-12">
              Loading projects…
            </p>
          )}
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Mobile: Horizontal Scroll Carousel */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="shrink-0 snap-center"
              >
                <MobileProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-2">
            {projects.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/30"
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center text-white/20 text-[10px] font-mono mt-3"
          >
            ← Swipe through projects →
          </motion.p>
        </div>

        {/* More projects note */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-white/30 text-xs md:text-sm font-mono">
            More projects coming soon — ready to add your own work
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Desktop Project Card ─── */
function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: DisplayProject;
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
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-[#C9A96E]/20 hover:shadow-[0_20px_60px_rgba(201,169,110,0.08)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-sm text-[#C9A96E] border border-[#C9A96E]/20">
                {project.category}
              </span>
            </div>
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
      </a>
    </motion.div>
  );
}

/* ─── Mobile Project Card ─── */
function MobileProjectCard({
  project,
  index,
}: {
  project: DisplayProject;
  index: number;
}) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="w-[280px]">
        <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-sm text-[#C9A96E] border border-[#C9A96E]/15">
                {project.category}
              </span>
            </div>
            {/* External link icon on mobile */}
            <div className="absolute bottom-3 right-3">
              <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 backdrop-blur-sm flex items-center justify-center border border-[#C9A96E]/20">
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A96E]" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <div>
              <h3 className="text-white font-display font-semibold text-sm">{project.name}</h3>
              <p className="text-white/35 text-[11px]">{project.client}</p>
            </div>
            <p className="text-white/45 text-[11px] leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/[0.03] text-white/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-2 border-t border-white/5">
              <p className="text-[#C9A96E] text-[10px] font-medium">{project.results}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
