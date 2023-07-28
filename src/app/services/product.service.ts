import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts()   {
    return this.http.get<Array<Product>>("http://localhost:9000/products");
  }

  updateProductChecked(product: Product) {
    return this.http.patch(`http://localhost:9000/products/${product.id}`, {checked: !product.checked})
  }
}
