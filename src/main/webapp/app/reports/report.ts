import { IProject } from 'app/shared/model/oatzSkill/project.model';

export interface Report {
  id?: number;
  technologies: Technology[];
  date: Date;
  project: IProject;
  description: string;
}

export interface SkillAppliedDTO {
  id?: number;
  description?: string;
  projectId: number;
  skillIds: number[];
  usedAt: string;
  userId: number;
}

export interface Technology {
  id: number;
  name: string;
  group: string;
}
