/**
 * lib/api/resources.ts
 * Covers: suppliers, resources, allocations, events, ETAs, assignments
 */

import { apiRequest } from "./client";

// ── Supplier ──────────────────────────────────────────────

export interface SupplierOut {
  id: number;
  name: string;
  initials?: string;
  contact_info?: string;
}

export interface SupplierCreate {
  name: string;
  initials?: string;
  contact_info?: string;
}

export interface SupplierUpdate {
  name?: string;
  initials?: string;
  contact_info?: string;
}

export async function getSuppliers(): Promise<SupplierOut[]> {
  return apiRequest<SupplierOut[]>("/resources/suppliers");
}

export async function getSupplier(supplierId: number): Promise<SupplierOut> {
  return apiRequest<SupplierOut>(`/resources/suppliers/${supplierId}`);
}

export async function createSupplier(data: SupplierCreate): Promise<SupplierOut> {
  return apiRequest<SupplierOut>("/resources/suppliers", { method: "POST", body: data });
}

export async function updateSupplier(supplierId: number, data: SupplierUpdate): Promise<SupplierOut> {
  return apiRequest<SupplierOut>(`/resources/suppliers/${supplierId}`, { method: "PATCH", body: data });
}

export async function deleteSupplier(supplierId: number): Promise<void> {
  return apiRequest<void>(`/resources/suppliers/${supplierId}`, { method: "DELETE" });
}

// ── Resource ──────────────────────────────────────────────

export interface ResourceOut {
  id: number;
  name: string;
  type: string;
  code?: string;
  supplier_id?: number;
  quantity?: number;
  unit?: string;
  status?: string;
  created_at?: string;
}

export interface ResourceWithDetails extends ResourceOut {
  supplier?: SupplierOut | null;
}

export interface ResourceCreate {
  name: string;
  type: string;
  code?: string;
  supplier_id?: number;
  quantity?: number;
  unit?: string;
  status?: string;
}

export interface ResourceUpdate {
  name?: string;
  type?: string;
  code?: string;
  supplier_id?: number;
  quantity?: number;
  unit?: string;
  status?: string;
}

export async function getResources(skip = 0, limit = 100): Promise<ResourceOut[]> {
  return apiRequest<ResourceOut[]>("/resources", { params: { skip, limit } });
}

export async function getResource(resourceId: number): Promise<ResourceWithDetails> {
  return apiRequest<ResourceWithDetails>(`/resources/${resourceId}`);
}

export async function createResource(data: ResourceCreate): Promise<ResourceOut> {
  return apiRequest<ResourceOut>("/resources", { method: "POST", body: data });
}

export async function updateResource(resourceId: number, data: ResourceUpdate): Promise<ResourceOut> {
  return apiRequest<ResourceOut>(`/resources/${resourceId}`, { method: "PATCH", body: data });
}

export async function deleteResource(resourceId: number): Promise<void> {
  return apiRequest<void>(`/resources/${resourceId}`, { method: "DELETE" });
}

// ── Allocation ────────────────────────────────────────────

export interface AllocationOut {
  id: number;
  resource_id: number;
  project_id: number;
  quantity_used?: number;
  phase?: string;
  status?: string;
  assigned_at?: string;
}

export interface AllocationCreate {
  resource_id: number;
  project_id: number;
  quantity_used?: number;
  phase?: string;
  status?: string;
}

export interface AllocationUpdate {
  quantity_used?: number;
  phase?: string;
  status?: string;
}

export async function getAllocations(resourceId: number): Promise<AllocationOut[]> {
  return apiRequest<AllocationOut[]>(`/resources/${resourceId}/allocations`);
}

export async function createAllocation(data: AllocationCreate): Promise<AllocationOut> {
  return apiRequest<AllocationOut>("/resources/allocations", { method: "POST", body: data });
}

export async function updateAllocation(allocationId: number, data: AllocationUpdate): Promise<AllocationOut> {
  return apiRequest<AllocationOut>(`/resources/allocations/${allocationId}`, { method: "PATCH", body: data });
}

export async function deleteAllocation(allocationId: number): Promise<void> {
  return apiRequest<void>(`/resources/allocations/${allocationId}`, { method: "DELETE" });
}

// ── Event ─────────────────────────────────────────────────

export interface ResourceEventOut {
  id: number;
  resource_id: number;
  event_type?: string;
  progress?: number;
  note?: string;
  event_date?: string;
}

export interface ResourceEventCreate {
  resource_id: number;
  event_type?: string;
  progress?: number;
  note?: string;
}

export interface ResourceEventUpdate {
  event_type?: string;
  progress?: number;
  note?: string;
}

export async function getResourceEvents(resourceId: number): Promise<ResourceEventOut[]> {
  return apiRequest<ResourceEventOut[]>(`/resources/${resourceId}/events`);
}

export async function createResourceEvent(data: ResourceEventCreate): Promise<ResourceEventOut> {
  return apiRequest<ResourceEventOut>("/resources/events", { method: "POST", body: data });
}

export async function updateResourceEvent(eventId: number, data: ResourceEventUpdate): Promise<ResourceEventOut> {
  return apiRequest<ResourceEventOut>(`/resources/events/${eventId}`, { method: "PATCH", body: data });
}

export async function deleteResourceEvent(eventId: number): Promise<void> {
  return apiRequest<void>(`/resources/events/${eventId}`, { method: "DELETE" });
}

// ── ETA ───────────────────────────────────────────────────

export interface ResourceETAOut {
  id: number;
  resource_id: number;
  eta_date?: string;
  status_text?: string;
  sub_text?: string;
}

export interface ResourceETACreate {
  resource_id: number;
  eta_date?: string;
  status_text?: string;
  sub_text?: string;
}

export interface ResourceETAUpdate {
  eta_date?: string;
  status_text?: string;
  sub_text?: string;
}

export async function getResourceETAs(resourceId: number): Promise<ResourceETAOut[]> {
  return apiRequest<ResourceETAOut[]>(`/resources/${resourceId}/eta`);
}

export async function createResourceETA(data: ResourceETACreate): Promise<ResourceETAOut> {
  return apiRequest<ResourceETAOut>("/resources/eta", { method: "POST", body: data });
}

export async function updateResourceETA(etaId: number, data: ResourceETAUpdate): Promise<ResourceETAOut> {
  return apiRequest<ResourceETAOut>(`/resources/eta/${etaId}`, { method: "PATCH", body: data });
}

export async function deleteResourceETA(etaId: number): Promise<void> {
  return apiRequest<void>(`/resources/eta/${etaId}`, { method: "DELETE" });
}

// ── Assignment ────────────────────────────────────────────

export interface ResourceAssignmentOut {
  id: number;
  resource_id: number;
  user_id: number;
  role?: string;
  start_time?: string;
  end_time?: string;
}

export interface ResourceAssignmentCreate {
  resource_id: number;
  user_id: number;
  role?: string;
  start_time?: string;
  end_time?: string;
}

export interface ResourceAssignmentUpdate {
  role?: string;
  start_time?: string;
  end_time?: string;
}

export async function getResourceAssignments(resourceId: number): Promise<ResourceAssignmentOut[]> {
  return apiRequest<ResourceAssignmentOut[]>(`/resources/${resourceId}/assignments`);
}

export async function createResourceAssignment(data: ResourceAssignmentCreate): Promise<ResourceAssignmentOut> {
  return apiRequest<ResourceAssignmentOut>("/resources/assignments", { method: "POST", body: data });
}

export async function updateResourceAssignment(assignmentId: number, data: ResourceAssignmentUpdate): Promise<ResourceAssignmentOut> {
  return apiRequest<ResourceAssignmentOut>(`/resources/assignments/${assignmentId}`, { method: "PATCH", body: data });
}

export async function deleteResourceAssignment(assignmentId: number): Promise<void> {
  return apiRequest<void>(`/resources/assignments/${assignmentId}`, { method: "DELETE" });
}
