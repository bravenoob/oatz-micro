import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnterprise } from 'app/shared/model/oatzSkill/enterprise.model';
import { EnterpriseService } from './enterprise.service';

@Component({
  selector: 'jhi-enterprise-delete-dialog',
  templateUrl: './enterprise-delete-dialog.component.html'
})
export class EnterpriseDeleteDialogComponent {
  enterprise: IEnterprise;

  constructor(
    protected enterpriseService: EnterpriseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.enterpriseService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'enterpriseListModification',
        content: 'Deleted an enterprise'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-enterprise-delete-popup',
  template: ''
})
export class EnterpriseDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ enterprise }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EnterpriseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.enterprise = enterprise;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/enterprise', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/enterprise', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
