import {Injectable} from '@angular/core';
import {Status} from "../models/status";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState: any = {
    products: [],
    errorMessage: "",
    keyword: "",
    totalPages: 0,
    pageLimit: 5,
    currentPage: 1,
    totalProducts: 0,
    status: Status.DEFAULT
  }

  constructor() {
  }

  public setProductState(status: any): void {
    this.productState = {...this.productState, ...status};
  }
}
