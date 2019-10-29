import { IProject } from 'app/shared/model/oatzSkill/project.model';

export interface IEnterprise {
  id?: number;
  title?: string;
  projects?: IProject[];
}

export class Enterprise implements IEnterprise {
  constructor(public id?: number, public title?: string, public projects?: IProject[]) {}
}
