import type { AdminUser, LoginCredentials } from "@/lib/data/types";
import { backendConfig, isSupabaseConfigured } from "@/lib/data/backend";

const SESSION_KEY = "admin_session";

interface StoredSession {
  user: AdminUser;
  token: string;
  expiresAt: number;
}

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function readSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as StoredSession;
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function writeSession(user: AdminUser): StoredSession {
  const session: StoredSession = {
    user,
    token: crypto.randomUUID(),
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/** Replace with Supabase Auth signInWithPassword */
async function loginWithSupabase(credentials: LoginCredentials): Promise<AdminUser> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase credentials are not configured.");
  }
  // const { data, error } = await supabase.auth.signInWithPassword(credentials);
  // if (error) throw error;
  // return { id: data.user.id, email: data.user.email! };
  throw new Error("Supabase auth adapter not implemented yet.");
}

/** Replace with Firebase signInWithEmailAndPassword */
async function loginWithFirebase(credentials: LoginCredentials): Promise<AdminUser> {
  // const credential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  // return { id: credential.user.uid, email: credential.user.email! };
  throw new Error("Firebase auth adapter not implemented yet.");
}

async function loginLocally(credentials: LoginCredentials): Promise<AdminUser> {
  const { email, password } = backendConfig.admin;
  if (
    credentials.email.trim().toLowerCase() !== email.trim().toLowerCase() ||
    credentials.password !== password
  ) {
    throw new Error("Invalid email or password.");
  }
  return { id: "local-admin", email: credentials.email.trim().toLowerCase() };
}

export async function login(credentials: LoginCredentials): Promise<AdminUser> {
  let user: AdminUser;

  switch (backendConfig.provider) {
    case "supabase":
      user = await loginWithSupabase(credentials);
      break;
    case "firebase":
      user = await loginWithFirebase(credentials);
      break;
    default:
      user = await loginLocally(credentials);
  }

  writeSession(user);
  return user;
}

export async function logout(): Promise<void> {
  if (backendConfig.provider === "supabase") {
    // await supabase.auth.signOut();
  }
  sessionStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): AdminUser | null {
  return readSession()?.user ?? null;
}

export function isAuthenticated(): boolean {
  return readSession() !== null;
}
