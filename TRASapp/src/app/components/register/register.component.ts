import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../model/user";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  successMessage :string;
  failureMessage :string;

  constructor(public accountService: AccountService, public router: Router) {
  }

  ngOnInit() {
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
 
    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }
     return true;
  }

  register() {
    this.accountService.createAccount(this.user).subscribe(data => {
      this.successMessage = data.success;
      this.failureMessage = data.failure;

        //this.router.navigate(['/createPwd']);
      }, err => {
        console.log(err);
        this.errorMessage = "username already exist";
      }
    )
  }
}