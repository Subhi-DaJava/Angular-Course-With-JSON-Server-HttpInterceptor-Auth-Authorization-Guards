import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uyghur-angular';

  actions: Array<any> = [
    {title : "Home Page", "route" : "/home", actionStyle:"btn btn-success ms-1", style:"btn btn-outline-info ms-1", icons : "house text-black"},
    {title : "Products", "route" : "/products", actionStyle:"btn btn-success ms-1", style:"btn btn-outline-info ms-1", icons : "archive text-black"},
    {title : "New Product", "route" : "/newProduct", actionStyle:"btn btn-success ms-1", style:"btn btn-outline-info ms-1", icons : "magic text-black"}
  ];

  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
