"use client";

import {
  clearStoredUser,
  readStoredUser,
  writeStoredUser,
} from "@/lib/auth/storage";
import type { MockUser } from "@/lib/auth/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  user: MockUser | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  signup: (data: Omit<MockUser, "id">) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      return { ok: false as const, error: "Please enter your email and password." };
    }

    const stored = readStoredUser();
    const mockUser: MockUser =
      stored?.email === trimmedEmail
        ? stored
        : {
            id: crypto.randomUUID(),
            email: trimmedEmail,
            firstName: trimmedEmail.split("@")[0] ?? "Guest",
            lastName: "User",
            phone: "",
          };

    writeStoredUser(mockUser);
    setUser(mockUser);
    return { ok: true as const };
  }, []);

  const signup = useCallback((data: Omit<MockUser, "id">) => {
    const email = data.email.trim().toLowerCase();
    if (!data.firstName.trim() || !data.lastName.trim() || !email || !data.phone.trim()) {
      return { ok: false as const, error: "Please fill in all required fields." };
    }

    const mockUser: MockUser = {
      id: crypto.randomUUID(),
      email,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.trim(),
    };

    writeStoredUser(mockUser);
    setUser(mockUser);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, signup, logout }),
    [user, ready, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
