import { Component } from '@angular/core';
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public appState: AppStateService) {
  }

  totalCheckedOnPage() {
    let checkedProductsByPage = this.appState.productState.products.filter((product:any) => product.checked == true);
    return checkedProductsByPage.length;
  }

}
