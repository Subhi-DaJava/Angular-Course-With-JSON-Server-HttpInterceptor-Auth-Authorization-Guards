import { Component } from '@angular/core';
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-state-error',
  templateUrl: './state-error.component.html',
  styleUrls: ['./state-error.component.css']
})
export class StateErrorComponent {
  constructor(public appState: AppStateService) {
  }

}
