import { useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { Spinner } from "@/components/ui/spinner";
import { useAdminAuth } from "@/admin/contexts/AdminAuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Spinner className="size-8 text-[#C9A96E]" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
