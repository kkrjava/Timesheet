import {Component, OnInit, ViewEncapsulation} from '@angular/core';
//import {AuthService} from "../../services/auth.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {CreatePwdService} from "../../services/createPwd.service";
import { FormGroup,Form } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-createPwd',
  templateUrl: './createPwd.component.html',
  styleUrls: ['./createPwd.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePwdComponent implements OnInit {
  user: User = new User();
  successMessage :string;
  failureMessage :string;
  redirect:boolean = false;
  //myform: FormGroup;

  constructor(public createPwdService: CreatePwdService, public router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe( params =>{
      this.user.username=params['username'];
      }, err => {
      console.log(err);
      } )
  }
  ngOnInit() {}
  createNewPwd() {  
       this.createPwdService.createNewPassword(this.user).subscribe(data => {
         // this.router.navigate(['/createPwd']);
         this.successMessage = data.success;
         this.failureMessage = data.failure;
           this.redirect =true;
          // this.myform.reset();
        }, err => {
        console.log(err);
        }
    )
  }
  

// logout from the app
  /*logOut() {
    this.authService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });
  }*/
}