import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  providers: []
})
export class MonthPickerComponent {
  @Input()
  parent: FormGroup;
  @Input()
  control: FormControl;
}
