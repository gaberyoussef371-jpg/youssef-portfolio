import { nanoid } from "nanoid";
import type { PortfolioProject } from "./types";
import { backendConfig } from "@/lib/data/backend";

const STORAGE_KEY = "portfolio_projects";

const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    id: "gents",
    title: "Gents",
    client: "Gents Egypt",
    liveUrl: "https://www.gentseg.com",
    category: "Shopify Development",
    description:
      "Premium jewelry e-commerce store with custom Shopify theme, countdown timers, bundles, and a polished multi-device shopping experience.",
    techStack: ["Shopify", "Custom Theme", "Liquid", "Bundles"],
    results: "Fully responsive multi-device experience",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663843627654/pjVZzXxomOYlDgQp.jpeg",
  },
  {
    id: "book-corner",
    title: "Book Corner",
    client: "Book Corner Egypt",
    liveUrl: "https://bookcorner-eg.myshopify.com",
    category: "Shopify Development",
    description:
      "Online bookstore built on Shopify with clean product catalog, category navigation, and streamlined checkout for book lovers.",
    techStack: ["Shopify", "Theme Customization", "Liquid", "UI/UX"],
    results: "Clean, intuitive browsing experience",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663843627654/FKWCUwgUJjRCnUwG.jpeg",
  },
  {
    id: "dolce",
    title: "Dolce",
    client: "Dolce Egypt",
    liveUrl: "https://dolce-egy.myshopify.com",
    category: "Shopify Development",
    description:
      "Luxury fashion brand e-commerce store with premium product presentation, elegant layout, and conversion-focused design.",
    techStack: ["Shopify", "Custom Sections", "Liquid", "UI/UX"],
    results: "Premium brand presentation",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663843627654/ejeohCKfSKciULRt.jpeg",
  },
  {
    id: "maison-declat",
    title: "Maison Declat",
    client: "Maison Declat",
    liveUrl: "https://maisondeclate.myshopify.com",
    category: "Shopify Development",
    description:
      "Luxury perfume and fragrance store with sophisticated design, product storytelling, and an elevated shopping experience.",
    techStack: ["Shopify", "Custom Theme", "Liquid", "Brand Design"],
    results: "Luxury brand digital presence",
    imageUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663843627654/aPYlCRkwRukXnfuJ.jpeg",
  },
];

function readLocalProjects(): PortfolioProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    return JSON.parse(raw) as PortfolioProject[];
  } catch {
    return DEFAULT_PROJECTS;
  }
}

function writeLocalProjects(projects: PortfolioProject[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

/** Replace with Supabase `from('projects').select()` */
async function fetchProjectsFromSupabase(): Promise<PortfolioProject[]> {
  // Example:
  // const { data, error } = await supabase.from('projects').select('*');
  // if (error) throw error;
  // return data;
  throw new Error("Supabase projects adapter not implemented yet.");
}

/** Replace with Firebase Firestore collection read */
async function fetchProjectsFromFirebase(): Promise<PortfolioProject[]> {
  throw new Error("Firebase projects adapter not implemented yet.");
}

export async function getProjects(): Promise<PortfolioProject[]> {
  switch (backendConfig.provider) {
    case "supabase":
      return fetchProjectsFromSupabase();
    case "firebase":
      return fetchProjectsFromFirebase();
    default:
      return readLocalProjects();
  }
}

export type ProjectInput = Omit<PortfolioProject, "id"> & { id?: string };

export async function createProject(input: ProjectInput): Promise<PortfolioProject> {
  const project: PortfolioProject = {
    id: input.id ?? nanoid(),
    title: input.title,
    description: input.description,
    techStack: input.techStack,
    liveUrl: input.liveUrl,
    imageUrl: input.imageUrl,
    client: input.client,
    category: input.category,
    results: input.results,
  };

  if (backendConfig.provider !== "local") {
    // Supabase: await supabase.from('projects').insert(project);
    throw new Error(`${backendConfig.provider} createProject not implemented yet.`);
  }

  const projects = readLocalProjects();
  projects.push(project);
  writeLocalProjects(projects);
  return project;
}

export async function updateProject(
  id: string,
  input: Partial<ProjectInput>
): Promise<PortfolioProject> {
  if (backendConfig.provider !== "local") {
    // Supabase: await supabase.from('projects').update(input).eq('id', id);
    throw new Error(`${backendConfig.provider} updateProject not implemented yet.`);
  }

  const projects = readLocalProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Project not found");

  const updated: PortfolioProject = { ...projects[index], ...input, id };
  projects[index] = updated;
  writeLocalProjects(projects);
  return updated;
}

export async function deleteProject(id: string): Promise<void> {
  if (backendConfig.provider !== "local") {
    // Supabase: await supabase.from('projects').delete().eq('id', id);
    throw new Error(`${backendConfig.provider} deleteProject not implemented yet.`);
  }

  const projects = readLocalProjects().filter((p) => p.id !== id);
  writeLocalProjects(projects);
}
