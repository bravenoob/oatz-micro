import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportFormComponent } from 'app/reports/report-form/report-form.component';
import { ReportsComponent } from './reports/reports.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectDropDownComponent } from './multi-select-drop-down/multi-select-drop-down.component';
import { SuiModule } from 'ng2-semantic-ui';
import { ReportCreatorComponent } from './report-creator/report-creator.component';
import { SingleSelectDropDownComponent } from './single-select-drop-down/single-select-drop-down.component';
import { ReportSearchListComponent } from './report-search-list/report-search-list.component';
import { ReportSearchComponent } from './report-search/report-search.component';
import { ReportSearchListItemComponent } from './report-search-list-item/report-search-list-item.component';

@NgModule({
  declarations: [
    ReportFormComponent,
    ReportsComponent,
    MonthPickerComponent,
    MultiSelectDropDownComponent,
    ReportCreatorComponent,
    SingleSelectDropDownComponent,
    ReportSearchListComponent,
    ReportSearchComponent,
    ReportSearchListItemComponent
  ],
  imports: [CommonModule, ReportsRoutingModule, ReactiveFormsModule, FormsModule, SuiModule]
})
export class ReportsModule {}
