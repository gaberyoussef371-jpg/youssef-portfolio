import { Route, Switch } from "wouter";
import { AdminAuthProvider } from "@/admin/contexts/AdminAuthContext";
import AdminDashboardPage from "@/admin/pages/DashboardPage";
import AdminLoginPage from "@/admin/pages/LoginPage";

/**
 * Isolated admin routing — no portfolio nav, footer, or cursor.
 * Mounted from App.tsx without affecting the public layout.
 */
export default function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Switch>
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin" component={AdminDashboardPage} />
      </Switch>
    </AdminAuthProvider>
  );
}
