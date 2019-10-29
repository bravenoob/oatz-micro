import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'app/reports/report';

@Component({
  selector: 'jhi-report-search-list-item',
  templateUrl: './report-search-list-item.component.html',
  styleUrls: ['./report-search-list-item.component.scss']
})
export class ReportSearchListItemComponent implements OnInit {
  @Input() report: Report;

  constructor() {}

  ngOnInit() {}
}
