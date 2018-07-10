import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Http} from "@angular/http";
import {AppComponent} from "../app.component";

@Injectable()
export class LoginService {
    private useUrl:string = 'account/login';
  constructor(public http: Http) { }

  login(user:User){
    return this.http.post(this.useUrl,user)
      .map(resp=>resp.json());
  }
}