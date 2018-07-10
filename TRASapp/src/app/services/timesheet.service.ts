import { Injectable } from '@angular/core';
import { Timesheet } from "../model/timesheet";
import { Http, Headers } from "@angular/http";
import { AppComponent } from "../app.component";

@Injectable()
export class TimesheetService {

  private useUrl: string = 'account/savetimesheet';
  public selectedWeekend: string;

  constructor(public http: Http) { }

  populateTimesheet(selectedWeekend) {

    let URL = "account/timesheet?selectedWeekend=" + selectedWeekend;

    return this.http.get(URL)
      .map(resp => resp.json());
  }

  tsList: Array<any>;
  saveTimesheet(tsList) {
    return this.http.post(this.useUrl, tsList)
      .map(resp => resp.json());
  }

}