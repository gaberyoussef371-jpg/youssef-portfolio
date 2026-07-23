import { useCallback, useEffect, useState } from "react";
import { MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContactMessage } from "@/lib/data/types";
import { deleteMessage, getMessages, markMessageRead } from "@/lib/data/messages";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function MessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
      setSelectedId((current) => current ?? data[0]?.id ?? null);
    } catch {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const selected = messages.find((m) => m.id === selectedId) ?? null;

  async function handleMarkRead(id: string) {
    try {
      await markMessageRead(id);
      await loadMessages();
    } catch {
      toast.error("Failed to update message.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      if (selectedId === id) setSelectedId(null);
      toast.success("Message deleted.");
      await loadMessages();
    } catch {
      toast.error("Failed to delete message.");
    }
  }

  if (loading) {
    return <p className="text-white/40 text-sm py-8 text-center">Loading messages…</p>;
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
        <p className="text-white/50">No messages yet.</p>
        <p className="text-white/30 text-sm mt-2">
          Submissions from the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
        {messages.map((message) => (
          <button
            key={message.id}
            type="button"
            onClick={() => {
              setSelectedId(message.id);
              if (!message.read) handleMarkRead(message.id);
            }}
            className={`w-full text-left rounded-lg border p-3 transition-colors ${
              selectedId === message.id
                ? "border-[#C9A96E]/40 bg-[#C9A96E]/10"
                : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-sm truncate">{message.name}</p>
              {!message.read && (
                <Badge className="bg-[#C9A96E] text-black text-[10px] shrink-0">New</Badge>
              )}
            </div>
            <p className="text-xs text-white/40 truncate mt-1">{message.email}</p>
            <p className="text-[10px] text-white/30 font-mono mt-2">{formatDate(message.createdAt)}</p>
          </button>
        ))}
      </div>

      {selected ? (
        <Card className="border-white/10 bg-white/[0.02]">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg">{selected.name}</CardTitle>
              <p className="text-sm text-white/40 mt-1">{selected.email}</p>
            </div>
            <div className="flex gap-1">
              {!selected.read && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleMarkRead(selected.id)}
                  className="text-white/60"
                  title="Mark as read"
                >
                  <MailOpen className="size-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleDelete(selected.id)}
                className="text-red-400/80 hover:text-red-400"
                title="Delete"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              {selected.brandName && (
                <div>
                  <p className="text-[10px] font-mono uppercase text-white/30 mb-1">Brand</p>
                  <p>{selected.brandName}</p>
                </div>
              )}
              {selected.projectType && (
                <div>
                  <p className="text-[10px] font-mono uppercase text-white/30 mb-1">Project Type</p>
                  <p>{selected.projectType}</p>
                </div>
              )}
              {selected.budget && (
                <div>
                  <p className="text-[10px] font-mono uppercase text-white/30 mb-1">Budget</p>
                  <p>{selected.budget}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] font-mono uppercase text-white/30 mb-1">Received</p>
                <p>{formatDate(selected.createdAt)}</p>
              </div>
            </div>
            {selected.details && (
              <div>
                <p className="text-[10px] font-mono uppercase text-white/30 mb-2">Details</p>
                <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{selected.details}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/40">
          Select a message to read
        </div>
      )}
    </div>
  );
}
