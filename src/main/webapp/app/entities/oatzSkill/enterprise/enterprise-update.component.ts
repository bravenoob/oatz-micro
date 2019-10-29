import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEnterprise, Enterprise } from 'app/shared/model/oatzSkill/enterprise.model';
import { EnterpriseService } from './enterprise.service';

@Component({
  selector: 'jhi-enterprise-update',
  templateUrl: './enterprise-update.component.html'
})
export class EnterpriseUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]]
  });

  constructor(protected enterpriseService: EnterpriseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ enterprise }) => {
      this.updateForm(enterprise);
    });
  }

  updateForm(enterprise: IEnterprise) {
    this.editForm.patchValue({
      id: enterprise.id,
      title: enterprise.title
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const enterprise = this.createFromForm();
    if (enterprise.id !== undefined) {
      this.subscribeToSaveResponse(this.enterpriseService.update(enterprise));
    } else {
      this.subscribeToSaveResponse(this.enterpriseService.create(enterprise));
    }
  }

  private createFromForm(): IEnterprise {
    return {
      ...new Enterprise(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnterprise>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
