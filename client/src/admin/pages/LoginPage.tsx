import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAdminAuth } from "@/admin/contexts/AdminAuthContext";

export default function AdminLoginPage() {
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/admin");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
      toast.success("Welcome back.");
      setLocation("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Spinner className="size-8 text-[#C9A96E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,110,0.08)_0%,_transparent_50%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C9A96E]/70 mb-3">
            Secure Access
          </p>
          <h1 className="font-display text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-white/40 text-sm mt-2">Sign in to manage your portfolio</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#12121a]/80 backdrop-blur-sm p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/60 text-xs font-mono uppercase">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/30" />
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-white/20"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/60 text-xs font-mono uppercase">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/30" />
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-white/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C9A96E] text-black font-semibold hover:bg-[#D4B87A] h-11"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
