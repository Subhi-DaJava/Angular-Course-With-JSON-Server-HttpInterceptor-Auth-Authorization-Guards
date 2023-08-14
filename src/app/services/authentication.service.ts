import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {User} from "../models/user";
import {AppStateService} from "./app-state.service";
import jwtDecode from "jwt-decode";
import {environment} from "../../environments/environment.development";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private apiUrlUsers = environment.apiUrlUsers;

    constructor(
        private http: HttpClient,
        private appStatus: AppStateService,
        private router: Router) {
    }

    public async login(username: string, password: string): Promise<boolean> {

      try {
        // login is post in real project
        let response = await firstValueFrom(this.http.get<User>(`${this.apiUrlUsers}/${username}`));

        if (password === response.password) { // for backend

          let decodeJWT: any = jwtDecode(response.token);

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

      } catch (err){
        this.router.navigateByUrl("/notFound").then();
        return Promise.reject("Bad Credentials!!");
      }
    }
}
