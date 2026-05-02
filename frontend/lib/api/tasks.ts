/**
 * lib/api/tasks.ts
 */

import { apiRequest } from "./client";

export interface TaskOut {
  id: number;
  title?: string;
  description?: string;
  project_id?: number;
  status_id?: number;
  assigned_to?: number;
  created_at?: string;
}

export interface TaskWithDetails extends TaskOut {
  status?: { id: number; name: string } | null;
  assignee?: { id: number; name?: string; username?: string } | null;
}

export interface TaskCreate {
  title: string;
  project_id: number;
  description?: string;
  status_id?: number;
  assigned_to?: number;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  project_id?: number;
  status_id?: number;
  assigned_to?: number;
}

export async function getTasks(skip = 0, limit = 100): Promise<TaskOut[]> {
  return apiRequest<TaskOut[]>("/tasks", { params: { skip, limit } });
}

export async function getTask(taskId: number): Promise<TaskWithDetails> {
  return apiRequest<TaskWithDetails>(`/tasks/${taskId}`);
}

export async function getTasksByProject(projectId: number): Promise<TaskWithDetails[]> {
  return apiRequest<TaskWithDetails[]>(`/tasks/project/${projectId}`);
}

export async function getTasksByAssignee(userId: number): Promise<TaskOut[]> {
  return apiRequest<TaskOut[]>(`/tasks/assigned/${userId}`);
}

export async function createTask(data: TaskCreate): Promise<TaskOut> {
  return apiRequest<TaskOut>("/tasks", { method: "POST", body: data });
}

export async function updateTask(taskId: number, data: TaskUpdate): Promise<TaskOut> {
  return apiRequest<TaskOut>(`/tasks/${taskId}`, { method: "PATCH", body: data });
}

export async function deleteTask(taskId: number): Promise<void> {
  return apiRequest<void>(`/tasks/${taskId}`, { method: "DELETE" });
}
