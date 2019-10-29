import { Report, SkillAppliedDTO, Technology } from 'app/reports/report';
import { ISkill } from 'app/shared/model/oatzSkill/skill.model';

export class ReportFactory {
  static fromSkill(skill: ISkill): Technology {
    return { id: skill.id, name: skill.skillName, group: '' };
  }

  static toDTO(report: Report, userId: number): SkillAppliedDTO {
    return {
      userId,
      usedAt: report.date.toISOString(),
      projectId: report.project.id,
      skillIds: report.technologies.map(({ id }) => id),
      description: report.description
    };
  }

  static fromDTO(skillApplied: SkillAppliedDTO): Report {
    return {
      id: skillApplied.id,
      date: null,
      technologies: [],
      project: null,
      description: skillApplied.description
    };
  }
}
