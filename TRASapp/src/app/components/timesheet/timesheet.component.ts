import { Component, OnInit } from '@angular/core';
import { WeekendOfService } from "../../services/weekendOf.service";
import { TimesheetService } from "../../services/timesheet.service";
import { SharedService } from "../../services/sharedservice.service";

import { Timesheet } from "../../model/timesheet";
import { User } from "../../model/user";

import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

import { MatTableModule } from '@angular/material';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  tsList: Array<any>;
  empName: string;
  team: string;
  company: string;
  status: string = "Not submitted";
  help: boolean = false;
  sumReg: number;
  textvalue:string;

  public weekendList: any;
  public selectedWeekend: string;


  constructor(public weekendOfService: WeekendOfService,
    public timesheetService: TimesheetService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute) {
    this.getWeekendsList();
  }
  

selectChangeHandler(event: any) {
  this.selectedWeekend = event.target.value;
  this.getTimesheetDetails();
  this.help = true;
}

  ngOnInit() {
    this.empName = this.sharedService.currentUser;
    this.team = this.sharedService.team;
    this.company = this.sharedService.company;
    
  }

  getWeekendsList() {
    this.weekendOfService.populateWeekends().subscribe(data => {
      this.weekendList = data;
    // this.getTimesheetDetails();
     }, err => {
      console.log(err);
    }
    )
  }

  getTimesheetDetails() {
    this.timesheetService.populateTimesheet(this.selectedWeekend).subscribe(data => {
      this.tsList = data;
    }, err => {
      console.log(err);
    }
    )
  }

  saveTimesheetDetails() {
    this.timesheetService.saveTimesheet(this.tsList).subscribe(data => {
      //this.status = data;
      if (data) {
        this.status = "Waiting for approval";
      } else {
        this.status = "Not submitted"
      }

    }, err => {
      console.log(err);
    }
    )
  }

  
  restrictNumeric(event, value, min, max) 
  {
    if(parseInt(value) < min || isNaN(parseInt(value))) 
        console.log("invalid min value");
    else if(parseInt(value) > max || isNaN(parseInt(value)))
        this.textvalue = "8";
  }

  onlyDecimalNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

}