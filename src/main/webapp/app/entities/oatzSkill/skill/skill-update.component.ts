import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISkill, Skill } from 'app/shared/model/oatzSkill/skill.model';
import { SkillService } from './skill.service';

@Component({
  selector: 'jhi-skill-update',
  templateUrl: './skill-update.component.html'
})
export class SkillUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    skillName: [null, [Validators.required]]
  });

  constructor(protected skillService: SkillService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ skill }) => {
      this.updateForm(skill);
    });
  }

  updateForm(skill: ISkill) {
    this.editForm.patchValue({
      id: skill.id,
      skillName: skill.skillName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const skill = this.createFromForm();
    if (skill.id !== undefined) {
      this.subscribeToSaveResponse(this.skillService.update(skill));
    } else {
      this.subscribeToSaveResponse(this.skillService.create(skill));
    }
  }

  private createFromForm(): ISkill {
    return {
      ...new Skill(),
      id: this.editForm.get(['id']).value,
      skillName: this.editForm.get(['skillName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkill>>) {
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
