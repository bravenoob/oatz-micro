import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnterprise } from 'app/shared/model/oatzSkill/enterprise.model';

@Component({
  selector: 'jhi-enterprise-detail',
  templateUrl: './enterprise-detail.component.html'
})
export class EnterpriseDetailComponent implements OnInit {
  enterprise: IEnterprise;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ enterprise }) => {
      this.enterprise = enterprise;
    });
  }

  previousState() {
    window.history.back();
  }
}
