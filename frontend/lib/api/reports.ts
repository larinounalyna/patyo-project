/**
 * lib/api/reports.ts
 */

import { apiRequest } from "./client";

// ── Types ─────────────────────────────────────────────────

export interface ReportTypeOut {
  id: number;
  name: string;
}

export interface ReportOut {
  id: number;
  project_id?: number;
  report_type_id?: number;
  title?: string;
  content?: string;
  report_date?: string;
  created_at?: string;
  created_by?: number;
}

export interface ReportWithDetails extends ReportOut {
  report_type?: ReportTypeOut | null;
  author?: { id: number; name?: string } | null;
  files?: { id: number; file_url: string }[];
}

export interface ReportFileOut {
  id: number;
  report_id: number;
  file_url: string;
}

export interface ReportCreate {
  project_id: number;
  report_type_id: number;
  title: string;
  content?: string;
  report_date?: string;
  created_by?: number;
}

export interface ReportUpdate {
  title?: string;
  content?: string;
  report_date?: string;
  report_type_id?: number;
}

// ── Report Types ──────────────────────────────────────────

export async function getReportTypes(): Promise<ReportTypeOut[]> {
  return apiRequest<ReportTypeOut[]>("/reports/types");
}

export async function createReportType(name: string): Promise<ReportTypeOut> {
  return apiRequest<ReportTypeOut>("/reports/types", { method: "POST", body: { name } });
}

export async function deleteReportType(typeId: number): Promise<void> {
  return apiRequest<void>(`/reports/types/${typeId}`, { method: "DELETE" });
}

// ── Reports ───────────────────────────────────────────────

export async function getReports(skip = 0, limit = 100): Promise<ReportOut[]> {
  return apiRequest<ReportOut[]>("/reports", { params: { skip, limit } });
}

export async function getReport(reportId: number): Promise<ReportWithDetails> {
  return apiRequest<ReportWithDetails>(`/reports/${reportId}`);
}

export async function getReportsByProject(projectId: number): Promise<ReportOut[]> {
  return apiRequest<ReportOut[]>(`/reports/project/${projectId}`);
}

export async function createReport(data: ReportCreate): Promise<ReportOut> {
  return apiRequest<ReportOut>("/reports", { method: "POST", body: data });
}

export async function updateReport(reportId: number, data: ReportUpdate): Promise<ReportOut> {
  return apiRequest<ReportOut>(`/reports/${reportId}`, { method: "PATCH", body: data });
}

export async function deleteReport(reportId: number): Promise<void> {
  return apiRequest<void>(`/reports/${reportId}`, { method: "DELETE" });
}

// ── Report Files ──────────────────────────────────────────

export async function getReportFiles(reportId: number): Promise<ReportFileOut[]> {
  return apiRequest<ReportFileOut[]>(`/reports/${reportId}/files`);
}

export async function addReportFile(reportId: number, fileUrl: string): Promise<ReportFileOut> {
  return apiRequest<ReportFileOut>(`/reports/${reportId}/files`, {
    method: "POST",
    body: { file_url: fileUrl },
  });
}

export async function deleteReportFile(fileId: number): Promise<void> {
  return apiRequest<void>(`/reports/files/${fileId}`, { method: "DELETE" });
}
