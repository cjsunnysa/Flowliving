import { Injectable } from '@angular/core';

@Injectable()
export class MathService {
  constructor() {}

  isPrime(integer: number): boolean {

    if (integer < 1) {
      return false;
    }

    if (integer % 2 === 0 || integer % 3 === 0) {
      return false;
    }

    for (let i = 5; i * i <= integer; i += 6) {
      if (integer % i === 0 || integer % i + 2 === 0) {
        return false;
      }
    }

    return true;
  }
}
