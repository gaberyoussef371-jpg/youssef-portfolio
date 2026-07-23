import { useEffect, useState } from "react";
import { FolderKanban, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/lib/data/projects";
import { getMessages } from "@/lib/data/messages";

export function OverviewTab() {
  const [projectCount, setProjectCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, messages] = await Promise.all([getProjects(), getMessages()]);
        setProjectCount(projects.length);
        setMessageCount(messages.length);
        setUnreadCount(messages.filter((m) => !m.read).length);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white/70">Total Projects</CardTitle>
          <FolderKanban className="size-4 text-[#C9A96E]" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-display font-bold">
            {loading ? "—" : projectCount}
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/[0.03]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white/70">Total Messages</CardTitle>
          <Mail className="size-4 text-[#C9A96E]" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-display font-bold">
            {loading ? "—" : messageCount}
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/[0.03] sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-white/70">Unread Leads</CardTitle>
          <Mail className="size-4 text-[#C9A96E]/60" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-display font-bold">
            {loading ? "—" : unreadCount}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
