import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {User} from "../../model/user";
import {LoginService} from "../../services/login.service";
import {SharedService} from "../../services/sharedservice.service";
import {Router,ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-admin.login',
  templateUrl: './admin.login.component.html',
  styleUrls: ['./admin.login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {
  
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
  
  }

  adminLogin(){ 
    this.loginService.login(this.user)
      .subscribe(data=>{
        if(data.validUser===true){
          this.sharedService.currentUser=data.username;
          this.router.navigate(['/register']);
        }
        else{
          this.loginmessage = data.message;
        }
      
        },err=>{
        this.errorMessage="error :  Username or password is incorrect";
      })
  }

}