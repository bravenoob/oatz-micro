export interface ISkill {
  id?: number;
  skillName?: string;
}

export class Skill implements ISkill {
  constructor(public id?: number, public skillName?: string) {}
}
