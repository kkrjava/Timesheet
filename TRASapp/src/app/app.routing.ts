import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {CreatePwdComponent} from "./components/createPwd/createPwd.component";
import {TimesheetComponent} from "./components/timesheet/timesheet.component";
import {ApproverComponent} from "./components/approver/approver.component";
import { AdminLoginComponent } from './components/adminLogin/admin.login.component';
import {UrlPermission} from "./urlPermission/urlPermission";


const appRoutes: Routes = [
 // { path: 'createPwd', component: CreatePwdComponent ,canActivate: [UrlPermission] },
  { path: 'createPwd/:username', component: CreatePwdComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:username', component: LoginComponent },
  { path: 'signin', component: AdminLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'approver', component: ApproverComponent },

  // otherwise redirect to createPwd
  /*{ path: '**', redirectTo: '/login' } */
  { path: '**', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(appRoutes);