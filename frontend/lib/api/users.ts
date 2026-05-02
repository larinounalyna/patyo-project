/**
 * lib/api/users.ts
 * CRUD for /users
 */

import { apiRequest } from "./client";
import type { UserOut, UserWithSkills } from "./auth";

export type { UserOut, UserWithSkills };

export interface UserUpdate {
  name?: string;
  family_name?: string;
  address?: string;
  birth_date?: string;
  gender?: string;
  password?: string;
}

export async function getUsers(skip = 0, limit = 100): Promise<UserOut[]> {
  return apiRequest<UserOut[]>("/users", { params: { skip, limit } });
}

export async function getUser(userId: number): Promise<UserWithSkills> {
  return apiRequest<UserWithSkills>(`/users/${userId}`);
}

export async function updateUser(userId: number, data: UserUpdate): Promise<UserOut> {
  return apiRequest<UserOut>(`/users/${userId}`, { method: "PATCH", body: data });
}

export async function deleteUser(userId: number): Promise<void> {
  return apiRequest<void>(`/users/${userId}`, { method: "DELETE" });
}
