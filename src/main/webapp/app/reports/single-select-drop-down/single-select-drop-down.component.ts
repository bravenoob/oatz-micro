import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProject } from 'app/shared/model/oatzSkill/project.model';

@Component({
  selector: 'jhi-single-select-drop-down',
  templateUrl: './single-select-drop-down.component.html',
  styleUrls: ['./single-select-drop-down.component.scss']
})
export class SingleSelectDropDownComponent {
  @Input()
  parent: FormGroup;
  @Input()
  control: FormControl;
  @Input()
  availableItems: IProject[];

  constructor() {}
}
