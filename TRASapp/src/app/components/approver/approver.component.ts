import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApproverComponent implements OnInit {
  
   message:string;

  ngOnInit() {
      this.message="Welcome to Approver Page!!";
  }
  
 
}