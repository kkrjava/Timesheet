import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../../model/user";
import {LoginService} from "../../services/login.service";
import {SharedService} from "../../services/sharedservice.service";
import {Router,ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
 
  
  user: User=new User();
  errorMessage:string;
  loginmessage:string;
 
  constructor(public loginService :LoginService, private sharedService: SharedService, 
    private router: Router,private route: ActivatedRoute) {
      this.user.username = this.sharedService.currentUser;
      this.route.params.subscribe( params =>{
        this.user.username=params['username'];
        }, err => {
        console.log(err);
        } )
   }

  ngOnInit() {
    this.user.username = this.sharedService.currentUser;
  }
 
 login(){ 
    this.loginService.login(this.user)
      .subscribe(data=>{
        if(data.validUser===true){
          this.sharedService.currentUser=data.username;
          this.sharedService.team=data.team;
          this.sharedService.company=data.company;
          this.router.navigate(['/timesheet']);
        }
        else{
          this.loginmessage = data.message;
        }
      
        },err=>{
        this.errorMessage="error :  Username or password is incorrect";
      })
  }

  approverLogin(){ 
    this.loginService.login(this.user)
      .subscribe(data=>{
        if(data.validUser===true){
          this.sharedService.currentUser=data.username;
          this.sharedService.team=data.team;
          this.sharedService.company=data.company;
          this.router.navigate(['/approver']);
        }
        else{
          this.loginmessage = data.message;
        }
      
        },err=>{
        this.errorMessage="error :  Username or password is incorrect";
      })
  }

 }