import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEnterprise } from 'app/shared/model/oatzSkill/enterprise.model';

type EntityResponseType = HttpResponse<IEnterprise>;
type EntityArrayResponseType = HttpResponse<IEnterprise[]>;

@Injectable({ providedIn: 'root' })
export class EnterpriseService {
  public resourceUrl = SERVER_API_URL + 'services/oatzskill/api/enterprises';
  public resourceSearchUrl = SERVER_API_URL + 'services/oatzskill/api/_search/enterprises';

  constructor(protected http: HttpClient) {}

  create(enterprise: IEnterprise): Observable<EntityResponseType> {
    return this.http.post<IEnterprise>(this.resourceUrl, enterprise, { observe: 'response' });
  }

  update(enterprise: IEnterprise): Observable<EntityResponseType> {
    return this.http.put<IEnterprise>(this.resourceUrl, enterprise, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEnterprise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnterprise[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEnterprise[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
