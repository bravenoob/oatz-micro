import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ReportService } from 'app/reports/report.service';
import { Report } from 'app/reports/report';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { IEnterprise } from 'app/shared/model/oatzSkill/enterprise.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  technologies$ = this.reportService.getAllTechnologies();
  projects$ = this.reportService.getAllProjectsOfCurrentUser();

  @Input() update: EventEmitter<string>;

  constructor(private router: Router, private reportService: ReportService, protected alertService: JhiAlertService) {}

  ngOnInit(): void {}

  addReport(report: Report) {
    this.subscribeToSaveResponse(this.reportService.addReport(report));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnterprise>>) {
    result.subscribe(() => this.onSaveSuccess(), error => this.onSaveError(error));
  }

  protected onSaveSuccess() {
    this.update.emit('report saved.');
    // this.alertService.addAlert({type: 'success', msg: 'A short message', timeout: 5000}, []);
  }

  protected onSaveError(error: HttpErrorResponse) {
    this.alertService.error(error.error, error.message, null);
  }
}
