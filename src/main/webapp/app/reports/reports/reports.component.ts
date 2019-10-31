import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsComponent implements OnInit {
  updateEventEmitter: EventEmitter<string>;

  constructor() {
    this.updateEventEmitter = new EventEmitter();
  }

  ngOnInit() {}
}
