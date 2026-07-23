import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/admin/contexts/AdminAuthContext";

export function AdminLayout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const { user, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="border-b border-white/10 bg-[#0d0d14]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C9A96E]/70">
              Admin
            </p>
            <h1 className="font-display text-lg font-semibold">{title ?? "Dashboard"}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-white/40 font-mono">{user?.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="border-white/10 bg-transparent hover:bg-white/5 text-white/80"
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
