import { Type } from 'app/shared/model/enumerations/type.model';

export interface IProject {
  id?: number;
  title?: string;
  description?: string;
  type?: Type;
  userId?: number;
  enterpriseId?: number;
}

export class Project implements IProject {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public type?: Type,
    public userId?: number,
    public enterpriseId?: number
  ) {}
}
