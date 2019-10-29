import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OatzSharedModule } from 'app/shared/shared.module';
import { EnterpriseComponent } from './enterprise.component';
import { EnterpriseDetailComponent } from './enterprise-detail.component';
import { EnterpriseUpdateComponent } from './enterprise-update.component';
import { EnterpriseDeletePopupComponent, EnterpriseDeleteDialogComponent } from './enterprise-delete-dialog.component';
import { enterpriseRoute, enterprisePopupRoute } from './enterprise.route';

const ENTITY_STATES = [...enterpriseRoute, ...enterprisePopupRoute];

@NgModule({
  imports: [OatzSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EnterpriseComponent,
    EnterpriseDetailComponent,
    EnterpriseUpdateComponent,
    EnterpriseDeleteDialogComponent,
    EnterpriseDeletePopupComponent
  ],
  entryComponents: [EnterpriseDeleteDialogComponent]
})
export class OatzSkillEnterpriseModule {}
