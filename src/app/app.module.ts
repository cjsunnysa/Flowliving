import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BitcoinService } from './services/bitcoin.service';
import { MathService } from './services/math.service';
import { AppComponent } from './containers/app-page/app.component';
import { DateRangeComponent } from './components/date-range.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, DateValueAccessorModule ],
  declarations: [ AppComponent, DateRangeComponent ],
  providers:    [ BitcoinService, MathService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
