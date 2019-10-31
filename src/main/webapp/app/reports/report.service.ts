import { Injectable } from '@angular/core';
import { Report, SkillAppliedDTO } from 'app/reports/report';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ReportFactory } from 'app/reports/ReportFactory';
import { SERVER_API_URL } from 'app/app.constants';
import { AccountService } from 'app/core/auth/account.service';
import { ProjectService } from 'app/entities/oatzSkill/project/project.service';
import { IProject } from 'app/shared/model/oatzSkill/project.model';
import 'rxjs-compat/add/operator/do';
import { SkillService } from 'app/entities/oatzSkill/skill/skill.service';
import 'rxjs-compat/add/operator/map';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISkill } from 'app/shared/model/oatzSkill/skill.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private projectService: ProjectService,
    private skillService: SkillService
  ) {}

  getAllTechnologies(): Observable<ISkill[]> {
    return this.skillService.query().pipe(
      filter(response => response.ok),
      map(request => request.body)
    );
  }

  getAllProjectsOfCurrentUser(): Observable<IProject[]> {
    return this.accountService.identity().pipe(
      switchMap(account =>
        this.projectService.query({ 'userId.equals': account.id }).pipe(
          filter(response => response.ok),
          map(project => project.body)
        )
      )
    );
  }

  getAllReportsOfCurrentUser(): Observable<Report[]> {
    return this.accountService.identity().pipe(
      switchMap(account =>
        this.http
          .get<SkillAppliedDTO[]>(`${SERVER_API_URL}/services/oatzskill/api/skill-applieds`, {
            params: createRequestOption({
              'userId.equals': account.id,
              sort: ['id,desc']
            }),
            observe: 'response'
          })
          .pipe(
            filter(response => response.ok),
            map(response => response.body),
            map(reports => reports.map(report => ReportFactory.fromDTO(report)))
          )
      )
    );
  }

  addReport(report: Report): Observable<any> {
    return this.accountService.identity().pipe(
      switchMap(account =>
        this.http.post(`${SERVER_API_URL}/services/oatzskill/api/skill-applieds`, ReportFactory.toDTO(report, account.id), {
          responseType: 'text'
        })
      )
    );
  }
}
