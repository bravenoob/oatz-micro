import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProject, Project } from 'app/shared/model/oatzSkill/project.model';
import { ProjectService } from './project.service';
import { IEnterprise } from 'app/shared/model/oatzSkill/enterprise.model';
import { EnterpriseService } from 'app/entities/oatzSkill/enterprise/enterprise.service';

@Component({
  selector: 'jhi-project-update',
  templateUrl: './project-update.component.html'
})
export class ProjectUpdateComponent implements OnInit {
  isSaving: boolean;

  enterprises: IEnterprise[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    type: [null, [Validators.required]],
    userId: [null, [Validators.required]],
    enterpriseId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected projectService: ProjectService,
    protected enterpriseService: EnterpriseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ project }) => {
      this.updateForm(project);
    });
    this.enterpriseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEnterprise[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEnterprise[]>) => response.body)
      )
      .subscribe((res: IEnterprise[]) => (this.enterprises = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(project: IProject) {
    this.editForm.patchValue({
      id: project.id,
      title: project.title,
      description: project.description,
      type: project.type,
      userId: project.userId,
      enterpriseId: project.enterpriseId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const project = this.createFromForm();
    if (project.id !== undefined) {
      this.subscribeToSaveResponse(this.projectService.update(project));
    } else {
      this.subscribeToSaveResponse(this.projectService.create(project));
    }
  }

  private createFromForm(): IProject {
    return {
      ...new Project(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      type: this.editForm.get(['type']).value,
      userId: this.editForm.get(['userId']).value,
      enterpriseId: this.editForm.get(['enterpriseId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProject>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackEnterpriseById(index: number, item: IEnterprise) {
    return item.id;
  }
}
