import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'app/reports/report';
import { ReportService } from 'app/reports/report.service';

@Component({
  selector: 'jhi-report-search',
  templateUrl: './report-search.component.html',
  styleUrls: ['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit {
  reports$: Observable<Report[]>;
  @Input() update: EventEmitter<string>;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadReports();
    if (this.update) {
      this.update.subscribe(() => {
        this.loadReports();
      });
    }
  }

  private loadReports() {
    this.reports$ = this.reportService.getAllReportsOfCurrentUser();
  }
}
