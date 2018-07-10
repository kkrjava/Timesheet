import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../model/user";
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
//import * as firebase from 'firebase';
//import { FirebaseApp } from "angularfire2";
//import {AngularFireAuthModule} from 'angularfire2/auth';
//import {AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class AuthService {

  private useUrl:string = 'account/login';
  constructor(public http: Http) { }

     public logIn(user: User){

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    // creating base64 encoded String from user name and password
    var base64Credential: string = btoa( user.username + ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers=headers;

    return this.http.get(this.useUrl ,   options)
      .map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json().principal;// the returned user object is a principal object
      if (user) {
        // store user details  in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });
  }
  /*resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  } 

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => console.log(error))
  } */


  logOut() {
    // remove user from local storage to log user out
    return this.http.post('/account/login'+"logout",{})
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      });

  }
}