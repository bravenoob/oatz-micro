import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProject } from 'app/shared/model/oatzSkill/project.model';

type EntityResponseType = HttpResponse<IProject>;
type EntityArrayResponseType = HttpResponse<IProject[]>;

@Injectable({ providedIn: 'root' })
export class ProjectService {
  public resourceUrl = SERVER_API_URL + 'services/oatzskill/api/projects';
  public resourceSearchUrl = SERVER_API_URL + 'services/oatzskill/api/_search/projects';

  constructor(protected http: HttpClient) {}

  create(project: IProject): Observable<EntityResponseType> {
    return this.http.post<IProject>(this.resourceUrl, project, { observe: 'response' });
  }

  update(project: IProject): Observable<EntityResponseType> {
    return this.http.put<IProject>(this.resourceUrl, project, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProject[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
