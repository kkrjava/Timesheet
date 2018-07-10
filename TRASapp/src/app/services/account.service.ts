import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Http} from "@angular/http";
import {AppComponent} from "../app.component";

@Injectable()
export class AccountService {
    private useUrl:string = 'account/register';
  constructor(public http: Http) { }

  createAccount(user:User){
    return this.http.post(this.useUrl,user)
      .map(resp=>resp.json());
  }
}