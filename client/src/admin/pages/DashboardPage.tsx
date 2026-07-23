import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/admin/components/AdminLayout";
import { MessagesTab } from "@/admin/components/MessagesTab";
import { OverviewTab } from "@/admin/components/OverviewTab";
import { ProjectsTab } from "@/admin/components/ProjectsTab";
import { ProtectedRoute } from "@/admin/components/ProtectedRoute";

function DashboardContent() {
  return (
    <AdminLayout title="Dashboard">
      <Tabs defaultValue="overview" className="gap-6">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsTab />
        </TabsContent>
        <TabsContent value="messages">
          <MessagesTab />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
