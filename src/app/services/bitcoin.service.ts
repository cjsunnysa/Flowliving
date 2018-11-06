import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map, filter, concatMap, reduce } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Key } from 'selenium-webdriver';
import { MathService } from './math.service';

@Injectable()
export class BitcoinService {

  private _serviceUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json';

  constructor(
    private _http: HttpClient,
    private _mathService: MathService
  ) { }

  getDatesWhereSumOfPrimesIsPrime(startDate: Date, endDate: Date): Observable<{ date: string, value: number}[]> {
    const formattedStartDate: string = moment(startDate).format('YYYY-MM-DD');
    const formattedEndDate: string = moment(endDate).format('YYYY-MM-DD');

    const queryUrl = `${this._serviceUrl}?${formattedStartDate}&${formattedEndDate}`;

    return (
      this
        ._http
        .get(queryUrl)
        .pipe(
          map((response: any) => response.bpi),
          concatMap((bpi: { [key: string]: number }) => Object.keys(bpi).map(key => ({ date: key, value: bpi[key]}))),
          filter(this.sumOfPrimesIsPrime),
          reduce((acc: any[], val: any) => [ ...acc, val ], [])
        )
    );
  }

  private sumOfPrimesIsPrime = (value: { date: string, value: number }): boolean => {
    const sumOfPrimes =
      value
        .value
        .toString()
        .split('')
        .map(str => Number.parseInt(str, 10))
        .filter(num => !!num)
        .filter(numberVal => this._mathService.isPrime(numberVal))
        .reduce((total, current) => total + current, 0);

    return this._mathService.isPrime(sumOfPrimes);
  }
}
