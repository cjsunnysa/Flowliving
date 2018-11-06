import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateRangeComponent } from './../../components/date-range.component';
import { BitcoinService } from './../../services/bitcoin.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, take, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-flowliving',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnDestroy  {

  private _unsubscribe$ = new Subject();

  values$: Observable<{ date: string, value: number}[]>;
  group: FormGroup;

  constructor(
    private _bitcoinService: BitcoinService,
    builder: FormBuilder
  ) {
    this.group =
      DateRangeComponent.createDateRange(
        new Date(Date.now()),
        new Date(Date.now()),
        builder
      );
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onFind(): void {
    this.values$ =
      this._bitcoinService.getDatesWhereSumOfPrimesIsPrime(
        this.group.get('startDate').value,
        this.group.get('endDate').value
      )
      .pipe(
        takeUntil(this._unsubscribe$),
      );
  }
}
