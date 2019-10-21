import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportFormComponent } from 'app/reports/report-form/report-form.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [ReportFormComponent, ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule]
})
export class ReportsModule {}
