import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-reportform',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
  reportFrom: FormGroup;

  get technologies(): FormArray {
    return this.reportFrom.get('technologies') as FormArray;
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
      date: ['', Validators.required],
      project: [''],
      technologies: this.buildUsedTechnologiesArray([''])
    });
  }

  private buildUsedTechnologiesArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }
}
