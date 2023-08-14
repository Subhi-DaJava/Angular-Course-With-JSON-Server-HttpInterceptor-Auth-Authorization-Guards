import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formLogin!: FormGroup;
    public errorMessage: string = "";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.formLogin = this.formBuilder.group({

            username: this.formBuilder.control(""),
            password: this.formBuilder.control("")

        });
    }

    sendCredentials() {

        let username = this.formLogin.value.username;
        let password = this.formLogin.value.password;

        this.authService.login(username, password).then(
            response => {
                console.log(response);
                this.router.navigateByUrl('/auth').then();
            })
            .catch(error => {
                this.errorMessage = error;
            });
    }
}
