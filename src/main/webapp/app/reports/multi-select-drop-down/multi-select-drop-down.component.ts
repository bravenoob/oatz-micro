import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISkill } from 'app/shared/model/oatzSkill/skill.model';

@Component({
  selector: 'jhi-multi-select-drop-down',
  templateUrl: './multi-select-drop-down.component.html',
  styleUrls: ['./multi-select-drop-down.component.scss']
})
export class MultiSelectDropDownComponent {
  @Input()
  parent: FormGroup;

  @Input()
  control: FormControl;

  @Input()
  availableItems: ISkill[];

  constructor() {}
}
