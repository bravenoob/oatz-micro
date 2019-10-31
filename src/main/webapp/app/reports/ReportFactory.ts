import { Report, SkillAppliedDTO } from 'app/reports/report';

export class ReportFactory {
  static toDTO(report: Report, userId: number): SkillAppliedDTO {
    return {
      userId,
      usedAt: report.date.toISOString(),
      projectId: report.project.id,
      skills: report.technologies,
      description: report.description
    };
  }

  static fromDTO(skillApplied: SkillAppliedDTO): Report {
    return {
      id: skillApplied.id,
      date: new Date(skillApplied.usedAt),
      technologies: skillApplied.skills,
      project: { id: skillApplied.projectId },
      description: skillApplied.description
    };
  }
}
