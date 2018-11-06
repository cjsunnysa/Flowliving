import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateRangeValidators } from './../validators/date-range.validators';

@Component({
  selector: 'app-date-range',
  templateUrl: `./date-range.component.html`,
  styles: [`./date-range.component.scss`]
})
export class DateRangeComponent  {
    static createDateRange(startDate: Date, endDate: Date, builder: FormBuilder): FormGroup {
      return builder.group({
        'startDate': [startDate, Validators.required],
        'endDate': [endDate, Validators.required]
      }, DateRangeValidators.sixMonthMaxRange('startDate', 'endDate'));
    }

    @Input() dateGroup: FormGroup;
}
