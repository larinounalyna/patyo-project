/**
 * lib/api/projects.ts
 */

import { apiRequest } from "./client";

export interface ProjectOut {
  id: number;
  name?: string;
  description?: string;
  company_id?: number;
  created_by?: number;
  created_at?: string;
}

export interface ProjectCreate {
  name: string;
  company_id: number;
  created_by: number;
  description?: string;
}

export interface ProjectUpdate {
  name?: string;
  description?: string;
  company_id?: number;
}

export async function getProjects(skip = 0, limit = 100): Promise<ProjectOut[]> {
  return apiRequest<ProjectOut[]>("/projects", { params: { skip, limit } });
}

export async function getProject(projectId: number): Promise<ProjectOut> {
  return apiRequest<ProjectOut>(`/projects/${projectId}`);
}

export async function getProjectsByCompany(companyId: number): Promise<ProjectOut[]> {
  return apiRequest<ProjectOut[]>(`/projects/company/${companyId}`);
}

export async function createProject(data: ProjectCreate): Promise<ProjectOut> {
  return apiRequest<ProjectOut>("/projects", { method: "POST", body: data });
}

export async function updateProject(projectId: number, data: ProjectUpdate): Promise<ProjectOut> {
  return apiRequest<ProjectOut>(`/projects/${projectId}`, { method: "PATCH", body: data });
}

export async function deleteProject(projectId: number): Promise<void> {
  return apiRequest<void>(`/projects/${projectId}`, { method: "DELETE" });
}
