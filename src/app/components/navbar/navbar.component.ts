import {Component} from '@angular/core';
import {AppStateService} from "../../services/app-state.service";
import {LoadingService} from "../../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actions: Array<any> = [
    {
      title: "Home Page",
      "route": "/home",
      actionStyle: "btn btn-success ms-1",
      style: "btn btn-outline-info ms-1",
      icons: "house text-black"
    },
    {
      title: "Products",
      "route": "/auth/products",
      actionStyle: "btn btn-success ms-1",
      style: "btn btn-outline-info ms-1",
      icons: "archive text-black"
    },
    {
      title: "New Product",
      "route": "/auth/newProduct",
      actionStyle: "btn btn-success ms-1",
      style: "btn btn-outline-info ms-1",
      icons: "magic text-black"
    }
  ];

  constructor(public appState: AppStateService,
              public loadingService: LoadingService,
              private router: Router) {
  }

  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logout() {
    this.appState.authStatus = {};
    this.router.navigateByUrl("/login").then();
  }

  singIn() {
    this.router.navigateByUrl("/login").then();
  }
}
