import { nanoid } from "nanoid";
import type { ContactMessage } from "./types";
import { backendConfig } from "@/lib/data/backend";

const STORAGE_KEY = "portfolio_messages";

function readLocalMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ContactMessage[]) : [];
  } catch {
    return [];
  }
}

function writeLocalMessages(messages: ContactMessage[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

/** Replace with Supabase `from('messages').select()` ordered by created_at */
async function fetchMessagesFromSupabase(): Promise<ContactMessage[]> {
  throw new Error("Supabase messages adapter not implemented yet.");
}

/** Replace with Firebase Firestore collection read */
async function fetchMessagesFromFirebase(): Promise<ContactMessage[]> {
  throw new Error("Firebase messages adapter not implemented yet.");
}

export async function getMessages(): Promise<ContactMessage[]> {
  switch (backendConfig.provider) {
    case "supabase":
      return fetchMessagesFromSupabase();
    case "firebase":
      return fetchMessagesFromFirebase();
    default:
      return readLocalMessages().sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export type MessageInput = Omit<ContactMessage, "id" | "createdAt" | "read">;

export async function submitMessage(input: MessageInput): Promise<ContactMessage> {
  const message: ContactMessage = {
    id: nanoid(),
    ...input,
    createdAt: new Date().toISOString(),
    read: false,
  };

  if (backendConfig.provider !== "local") {
    // Supabase: await supabase.from('messages').insert(message);
    throw new Error(`${backendConfig.provider} submitMessage not implemented yet.`);
  }

  const messages = readLocalMessages();
  messages.unshift(message);
  writeLocalMessages(messages);
  return message;
}

export async function markMessageRead(id: string): Promise<void> {
  if (backendConfig.provider !== "local") {
    // Supabase: await supabase.from('messages').update({ read: true }).eq('id', id);
    throw new Error(`${backendConfig.provider} markMessageRead not implemented yet.`);
  }

  const messages = readLocalMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return;
  messages[index] = { ...messages[index], read: true };
  writeLocalMessages(messages);
}

export async function deleteMessage(id: string): Promise<void> {
  if (backendConfig.provider !== "local") {
    // Supabase: await supabase.from('messages').delete().eq('id', id);
    throw new Error(`${backendConfig.provider} deleteMessage not implemented yet.`);
  }

  writeLocalMessages(readLocalMessages().filter((m) => m.id !== id));
}
