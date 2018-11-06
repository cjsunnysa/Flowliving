import { FormGroup } from '@angular/forms'
import { Moment } from 'moment';
import * as moment from 'moment';

export class DateRangeValidators {
  static sixMonthMaxRange = (fromDateKey: string, toDateKey: string) => {

        return (group: FormGroup): { [key: string]: any } => {
            const fromDate = group.controls[fromDateKey];
            const toDate = group.controls[toDateKey];

            if (!fromDate || !toDate) {
                return null;
            }

            const momentFrom = moment(fromDate.value);
            const momentTo = moment(toDate.value);

            if (momentFrom > momentTo) {
                return { fromDateError: true };
            }

            if (momentTo < momentFrom) {
                return { toDateError: true };
            }

            if (moment.duration(momentFrom.diff(momentTo)).asMonths()) {
                return { dateRangeError: true };
            }

            return null;
        };
    }
}