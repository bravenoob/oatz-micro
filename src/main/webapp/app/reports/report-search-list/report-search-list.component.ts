import { Component, OnInit } from '@angular/core';
import { Report } from 'app/reports/report';
import { Observable } from 'rxjs';
import { ReportService } from 'app/reports/report.service';

@Component({
  selector: 'jhi-report-search-list',
  templateUrl: './report-search-list.component.html',
  styleUrls: ['./report-search-list.component.scss']
})
export class ReportSearchListComponent implements OnInit {
  reports$: Observable<Report[]>;
  loading$: Observable<boolean>;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reports$ = this.reportService.getAllReportsOfCurrentUser();
  }
}
