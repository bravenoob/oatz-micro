import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Enterprise } from 'app/shared/model/oatzSkill/enterprise.model';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseComponent } from './enterprise.component';
import { EnterpriseDetailComponent } from './enterprise-detail.component';
import { EnterpriseUpdateComponent } from './enterprise-update.component';
import { EnterpriseDeletePopupComponent } from './enterprise-delete-dialog.component';
import { IEnterprise } from 'app/shared/model/oatzSkill/enterprise.model';

@Injectable({ providedIn: 'root' })
export class EnterpriseResolve implements Resolve<IEnterprise> {
  constructor(private service: EnterpriseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEnterprise> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Enterprise>) => response.ok),
        map((enterprise: HttpResponse<Enterprise>) => enterprise.body)
      );
    }
    return of(new Enterprise());
  }
}

export const enterpriseRoute: Routes = [
  {
    path: '',
    component: EnterpriseComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'oatzApp.oatzSkillEnterprise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EnterpriseDetailComponent,
    resolve: {
      enterprise: EnterpriseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'oatzApp.oatzSkillEnterprise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EnterpriseUpdateComponent,
    resolve: {
      enterprise: EnterpriseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'oatzApp.oatzSkillEnterprise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EnterpriseUpdateComponent,
    resolve: {
      enterprise: EnterpriseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'oatzApp.oatzSkillEnterprise.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const enterprisePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EnterpriseDeletePopupComponent,
    resolve: {
      enterprise: EnterpriseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'oatzApp.oatzSkillEnterprise.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
