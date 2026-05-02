/**
 * lib/api/index.ts
 * Single import point for the entire API layer.
 *
 * Usage:
 *   import { login, getProjects, createTask } from "@/lib/api";
 */

export * from "./auth";
export * from "./users";
export * from "./companies";
export * from "./projects";
export * from "./tasks";
export * from "./reports";
export * from "./resources";
export * from "./skills";
export * from "./teams";
export { apiRequest } from "./client";
