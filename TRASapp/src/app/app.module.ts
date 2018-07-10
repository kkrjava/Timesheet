import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePwdComponent } from './components/createPwd/createPwd.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { ApproverComponent } from "./components/approver/approver.component";
import { AdminLoginComponent } from './components/adminLogin/admin.login.component';


import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";

import { AuthService } from "./services/auth.service";
import {CreatePwdService} from "./services/createPwd.service";
import {AccountService} from "./services/account.service";
import {LoginService} from "./services/login.service";
import {WeekendOfService} from './services/weekendOf.service';
import {TimesheetService} from "./services/timesheet.service";
import {SharedService} from "./services/sharedservice.service";

import {routing} from "./app.routing";
import {UrlPermission} from "./urlPermission/urlPermission";

import { EmailDomainValidatorDirective } from './email-domain-validator.directive';
import { EqualValidator } from "./shared/equal.validator.directive";
import { CustomMaxDirective } from "./shared/custom-max-validator.directive";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreatePwdComponent,
    TimesheetComponent,
    ApproverComponent,
    AdminLoginComponent,
    EmailDomainValidatorDirective,
    EqualValidator,
    CustomMaxDirective,
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,MatTableModule, routing,
  ],
  providers: [AuthService,CreatePwdService,LoginService,AccountService,
    WeekendOfService,TimesheetService,SharedService,UrlPermission],
  bootstrap: [AppComponent]
})
export class AppModule { }