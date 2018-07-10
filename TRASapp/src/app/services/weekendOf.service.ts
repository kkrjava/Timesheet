import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {AppComponent} from "../app.component";

@Injectable()
export class WeekendOfService {
  private useUrl:string = 'account/populateweekendOf';
  constructor(public http: Http) { }

  populateWeekends(){
    return this.http.get(this.useUrl)
      .map(resp=>resp.json());
  }
}