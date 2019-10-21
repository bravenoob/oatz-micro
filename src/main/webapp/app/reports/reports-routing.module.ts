import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from 'app/reports/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    data: {
      authorities: ['USER_ROLE'],
      pageTitle: 'reports.title'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
