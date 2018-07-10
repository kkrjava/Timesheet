import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Http} from "@angular/http";

@Injectable()
export class CreatePwdService {
    private url:string = 'account/createPwd';
  constructor(public http: Http) { }

  createNewPassword(user:User){
    return this.http.post(this.url,user)
      .map(resp=>resp.json());
  }
}