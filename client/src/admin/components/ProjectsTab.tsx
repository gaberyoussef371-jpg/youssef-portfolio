import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PortfolioProject } from "@/lib/data/types";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/lib/data/projects";

type FormState = {
  title: string;
  description: string;
  techStack: string;
  liveUrl: string;
  imageUrl: string;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  techStack: "",
  liveUrl: "",
  imageUrl: "",
};

export function ProjectsTab() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(await getProjects());
    } catch {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  function openCreateDialog() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEditDialog(project: PortfolioProject) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      liveUrl: project.liveUrl,
      imageUrl: project.imageUrl,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim() || !form.liveUrl.trim()) {
      toast.error("Title and Live URL are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl.trim(),
      imageUrl: form.imageUrl.trim(),
    };

    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, payload);
        toast.success("Project updated.");
      } else {
        await createProject(payload);
        toast.success("Project created.");
      }
      setDialogOpen(false);
      await loadProjects();
    } catch {
      toast.error("Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted.");
      await loadProjects();
    } catch {
      toast.error("Failed to delete project.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          Manage portfolio projects shown on the public site.
        </p>
        <Button
          onClick={openCreateDialog}
          className="bg-[#C9A96E] text-black hover:bg-[#D4B87A]"
        >
          <Plus className="size-4" />
          Add Project
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/60">Title</TableHead>
              <TableHead className="text-white/60 hidden md:table-cell">Tech Stack</TableHead>
              <TableHead className="text-white/60 hidden lg:table-cell">Live URL</TableHead>
              <TableHead className="text-white/60 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-white/40 py-8">
                  Loading projects…
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-white/40 py-8">
                  No projects yet. Add your first one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="border-white/10">
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-white/50 text-sm">
                    {project.techStack.slice(0, 3).join(", ")}
                    {project.techStack.length > 3 ? "…" : ""}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C9A96E] text-sm hover:underline truncate block max-w-xs"
                    >
                      {project.liveUrl}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openEditDialog(project)}
                        className="text-white/60 hover:text-white"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDelete(project.id)}
                        className="text-red-400/80 hover:text-red-400"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#12121a] border-white/10 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="bg-white/5 border-white/10 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
              <Input
                id="techStack"
                value={form.techStack}
                onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                placeholder="Shopify, Liquid, UI/UX"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                type="url"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-white/10 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#C9A96E] text-black hover:bg-[#D4B87A]"
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
