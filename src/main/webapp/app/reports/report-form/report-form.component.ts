import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'app/reports/report';
import { IProject } from 'app/shared/model/oatzSkill/project.model';
import { ISkill } from 'app/shared/model/oatzSkill/skill.model';

@Component({
  selector: 'jhi-reportform',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
  @Input()
  availableTechnologies: ISkill[];

  @Input()
  availableProjects: IProject[];

  @Output()
  addReport = new EventEmitter<Report>();

  reportFrom: FormGroup;

  get descriptionInvalid() {
    return this.reportFrom.get('description').hasError('required') && this.reportFrom.get('description').touched;
  }

  get technologiesInvalid() {
    return this.technologies.hasError('required') && this.technologies.touched;
  }

  get technologies(): FormControl {
    return this.reportFrom.get('technologies') as FormControl;
  }

  get project(): FormControl {
    return this.reportFrom.get('project') as FormControl;
  }

  get date(): FormControl {
    return this.reportFrom.get('date') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    if (this.reportFrom) {
      return;
    }
    this.reportFrom = this.fb.group({
      technologies: [{}, Validators.required],
      date: [new Date(), Validators.required],
      project: ['', Validators.required],
      description: ['']
    });
  }

  submitForm() {
    if (this.reportFrom.invalid) {
      return;
    }
    this.addReport.emit({ ...this.reportFrom.value });
    this.reportFrom.reset({ date: new Date() });
  }
}
