import { IProject } from 'app/shared/model/oatzSkill/project.model';
import { ISkill } from 'app/shared/model/oatzSkill/skill.model';

export interface Report {
  id?: number;
  technologies: ISkill[];
  date: Date;
  project: IProject;
  description: string;
}

export interface SkillAppliedDTO {
  id?: number;
  description?: string;
  projectId: number;
  skills: ISkill[];
  usedAt: string;
  userId: number;
}
