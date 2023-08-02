import { Component } from '@angular/core';
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  actions: Array<any> = [
    {title : "Home Page", "route" : "/home", actionStyle:"btn btn-success ms-1", style:"btn btn-outline-info ms-1", icons : "house text-black"},
    {title : "Products", "route" : "/products", actionStyle:"btn btn-success ms-1", style:"btn btn-outline-info ms-1", icons : "archive text-black"},
    {title : "New Product", "route" : "/newProduct", actionStyle:"btn btn-success ms-1", style:"btn btn-outline-info ms-1", icons : "magic text-black"}
  ];

  constructor(public appState: AppStateService) {
  }
  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
