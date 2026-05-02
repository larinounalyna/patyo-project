/**
 * lib/api/auth.ts
 */

import { apiRequest } from "./client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// ── Types ─────────────────────────────────────────────

export interface UserOut {
  id: number;
  name?: string;
  family_name?: string;
  email?: string;
  username?: string;
  address?: string;
  birth_date?: string;
  gender?: string;
  created_at?: string;
}

export interface UserWithSkills extends UserOut {
  skills: { id: number; name: string }[];
}

export interface RegisterData {
  name?: string;
  family_name?: string;
  email: string;
  username: string;
  password: string;
  address?: string;
  birth_date?: string;
  gender?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// ── Auth functions ────────────────────────────────────

export async function register(data: RegisterData): Promise<UserOut> {
  return apiRequest<UserOut>("/auth/register", {
    method: "POST",
    body: data,
  });
}

export async function login(
  data: LoginData,
): Promise<{ access_token: string; token_type: string }> {
  const result = await apiRequest<{
    access_token: string;
    token_type: string;
  }>("/auth/login/json", {
    method: "POST",
    body: data,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", result.access_token);
  }

  return result;
}

export async function loginForm(username: string, password: string) {
  const formBody = new URLSearchParams({ username, password });

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.detail || "Login failed");

  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data.access_token);
  }

  return data;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}

export async function getMe(): Promise<UserWithSkills> {
  return apiRequest<UserWithSkills>("/auth/me");
}

export async function signup(data: RegisterData) {
  await register(data);

  return login({
    email: data.email,
    password: data.password,
  });
}
