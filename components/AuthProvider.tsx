"use client";

import {
  clearStoredUser,
  readStoredUser,
  writeStoredUser,
} from "@/lib/auth/storage";
import type { MockUser, UserRole } from "@/lib/auth/types";
import { resolveRoleFromEmail } from "@/lib/portal/role";
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
  signup: (
    data: Pick<MockUser, "firstName" | "lastName" | "email" | "phone"> &
      Partial<Pick<MockUser, "addressLine1" | "addressLine2" | "city" | "postcode">>
  ) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  updateProfile: (
    data: Partial<
      Pick<
        MockUser,
        "firstName" | "lastName" | "phone" | "addressLine1" | "addressLine2" | "city" | "postcode"
      >
    >
  ) => void;
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
    const role: UserRole = resolveRoleFromEmail(trimmedEmail);
    const emptyAddress = {
      addressLine1: "",
      addressLine2: "",
      city: "",
      postcode: "",
    };
    const mockUser: MockUser =
      stored?.email === trimmedEmail
        ? { ...emptyAddress, ...stored, role: stored.role ?? role }
        : {
            id: crypto.randomUUID(),
            email: trimmedEmail,
            firstName: trimmedEmail.split("@")[0] ?? "Guest",
            lastName: "User",
            phone: "",
            ...emptyAddress,
            role,
          };

    writeStoredUser(mockUser);
    setUser(mockUser);
    return { ok: true as const };
  }, []);

  const signup = useCallback(
    (
      data: Pick<MockUser, "firstName" | "lastName" | "email" | "phone"> &
        Partial<Pick<MockUser, "addressLine1" | "addressLine2" | "city" | "postcode">>
    ) => {
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
      addressLine1: data.addressLine1?.trim() ?? "",
      addressLine2: data.addressLine2?.trim() ?? "",
      city: data.city?.trim() ?? "",
      postcode: data.postcode?.trim() ?? "",
      role: resolveRoleFromEmail(email),
    };

    writeStoredUser(mockUser);
    setUser(mockUser);
    return { ok: true as const };
    },
    []
  );

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (
      data: Partial<
        Pick<
          MockUser,
          "firstName" | "lastName" | "phone" | "addressLine1" | "addressLine2" | "city" | "postcode"
        >
      >
    ) => {
      setUser((current) => {
        if (!current) return current;
        const trim = (v: string | undefined) => v?.trim() ?? "";
        const next: MockUser = {
          ...current,
          ...(data.firstName !== undefined ? { firstName: trim(data.firstName) } : {}),
          ...(data.lastName !== undefined ? { lastName: trim(data.lastName) } : {}),
          ...(data.phone !== undefined ? { phone: trim(data.phone) } : {}),
          ...(data.addressLine1 !== undefined ? { addressLine1: trim(data.addressLine1) } : {}),
          ...(data.addressLine2 !== undefined ? { addressLine2: trim(data.addressLine2) } : {}),
          ...(data.city !== undefined ? { city: trim(data.city) } : {}),
          ...(data.postcode !== undefined ? { postcode: trim(data.postcode) } : {}),
        };
        writeStoredUser(next);
        return next;
      });
    },
    []
  );

  const value = useMemo(
    () => ({ user, ready, login, signup, logout, updateProfile }),
    [user, ready, login, signup, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
