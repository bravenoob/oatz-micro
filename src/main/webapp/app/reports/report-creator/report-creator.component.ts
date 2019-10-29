import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/reports/report.service';
import { Report } from 'app/reports/report';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  technologies$ = this.reportService.getAllTechnologies();
  projects$ = this.reportService.getAllProjectsOfCurrentUser();

  constructor(private reportService: ReportService, protected jhiAlertService: JhiAlertService) {}

  ngOnInit(): void {}

  addReport(report: Report) {
    this.subscribeToSaveResponse(this.reportService.addReport(report));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe({ error: err => this.onError(err) });
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
