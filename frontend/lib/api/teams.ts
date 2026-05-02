/**
 * lib/api/teams.ts
 * Maps to the /user-company backend endpoints.
 * The frontend "Teams" page shows company members and their roles.
 */

import { apiRequest } from "./client";

export interface UserCompanyOut {
  id: number;
  user_id: number;
  company_id: number;
  role_id?: number;
  user?: {
    id: number;
    name?: string;
    family_name?: string;
    email?: string;
    username?: string;
  } | null;
  company?: { id: number; name?: string } | null;
  role?: { id: number; name: string } | null;
}

export interface UserCompanyCreate {
  user_id: number;
  company_id: number;
  role_id?: number;
}

export interface UserCompanyUpdate {
  role_id?: number;
}

/** All memberships (admin use). */
export async function getAllMemberships(): Promise<UserCompanyOut[]> {
  return apiRequest<UserCompanyOut[]>("/user-company");
}

/** All members of a specific company. */
export async function getCompanyMembers(companyId: number): Promise<UserCompanyOut[]> {
  return apiRequest<UserCompanyOut[]>(`/user-company/company/${companyId}`);
}

/** All companies a user belongs to. */
export async function getUserMemberships(userId: number): Promise<UserCompanyOut[]> {
  return apiRequest<UserCompanyOut[]>(`/user-company/user/${userId}`);
}

export async function getMembership(id: number): Promise<UserCompanyOut> {
  return apiRequest<UserCompanyOut>(`/user-company/${id}`);
}

/** Add a user to a company with a given role. */
export async function addMember(data: UserCompanyCreate): Promise<UserCompanyOut> {
  return apiRequest<UserCompanyOut>("/user-company", { method: "POST", body: data });
}

/** Change a member's role. */
export async function updateMemberRole(id: number, roleId: number): Promise<UserCompanyOut> {
  return apiRequest<UserCompanyOut>(`/user-company/${id}`, {
    method: "PATCH",
    body: { role_id: roleId },
  });
}

/** Remove a user from a company. */
export async function removeMember(id: number): Promise<void> {
  return apiRequest<void>(`/user-company/${id}`, { method: "DELETE" });
}
