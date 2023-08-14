import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {User} from "../models/user";
import {AppStateService} from "./app-state.service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private appStatus: AppStateService) { }

  public async login(username: string, password: string) {
    // login is post in real project
    let response = await firstValueFrom(this.http.get<User>(`http://localhost:9000/users/${username}`));

    if(password === response.password) { // for backend

      let decodeJWT:any = jwtDecode(response.token);

      this.appStatus.setAuthStatus({
        isAuthenticated: true,
        username: decodeJWT.sub,
        roles: decodeJWT.roles,
        email: decodeJWT.email,
        token: response.token
      });
      return Promise.resolve(true);
    } else {
      return Promise.reject("Bad Credentials!!");
    }
  }
}
