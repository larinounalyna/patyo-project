/**
 * lib/api/skills.ts
 */

import { apiRequest } from "./client";

export interface SkillOut {
  id: number;
  name?: string;
}

export interface UserSkillOut {
  user_id: number;
  skill_id: number;
}

export async function getSkills(): Promise<SkillOut[]> {
  return apiRequest<SkillOut[]>("/skills");
}

export async function getSkill(skillId: number): Promise<SkillOut> {
  return apiRequest<SkillOut>(`/skills/${skillId}`);
}

export async function createSkill(name: string): Promise<SkillOut> {
  return apiRequest<SkillOut>("/skills", { method: "POST", body: { name } });
}

export async function updateSkill(skillId: number, name: string): Promise<SkillOut> {
  return apiRequest<SkillOut>(`/skills/${skillId}`, { method: "PATCH", body: { name } });
}

export async function deleteSkill(skillId: number): Promise<void> {
  return apiRequest<void>(`/skills/${skillId}`, { method: "DELETE" });
}

// ── User skills ───────────────────────────────────────────

export async function getUserSkills(userId: number): Promise<UserSkillOut[]> {
  return apiRequest<UserSkillOut[]>(`/skills/user/${userId}`);
}

export async function assignSkillToUser(userId: number, skillId: number): Promise<UserSkillOut> {
  return apiRequest<UserSkillOut>("/skills/user", {
    method: "POST",
    body: { user_id: userId, skill_id: skillId },
  });
}

export async function removeSkillFromUser(userId: number, skillId: number): Promise<void> {
  return apiRequest<void>(`/skills/user/${userId}/${skillId}`, { method: "DELETE" });
}
