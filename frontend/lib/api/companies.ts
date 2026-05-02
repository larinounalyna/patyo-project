/**
 * lib/api/companies.ts
 */

import { apiRequest } from "./client";

export interface CompanyOut {
  id: number;
  name?: string;
  image?: string;
  created_at?: string;
}

export interface CompanyCreate {
  name: string;
  image?: string;
}

export interface CompanyUpdate {
  name?: string;
  image?: string;
}

export async function getCompanies(skip = 0, limit = 100): Promise<CompanyOut[]> {
  return apiRequest<CompanyOut[]>("/companies", { params: { skip, limit } });
}

export async function getCompany(companyId: number): Promise<CompanyOut> {
  return apiRequest<CompanyOut>(`/companies/${companyId}`);
}

export async function createCompany(data: CompanyCreate): Promise<CompanyOut> {
  return apiRequest<CompanyOut>("/companies", { method: "POST", body: data });
}

export async function updateCompany(companyId: number, data: CompanyUpdate): Promise<CompanyOut> {
  return apiRequest<CompanyOut>(`/companies/${companyId}`, { method: "PATCH", body: data });
}

export async function deleteCompany(companyId: number): Promise<void> {
  return apiRequest<void>(`/companies/${companyId}`, { method: "DELETE" });
}
