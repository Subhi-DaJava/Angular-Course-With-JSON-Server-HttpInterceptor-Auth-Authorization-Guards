import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>("http://localhost:9000/products");
  }

  public updateProductChecked(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:9000/products/${product.id}`, {checked: !product.checked})
  }

  public deleteProductById(id: number) {
    return this.http.delete<any>(`http://localhost:9000/products/${id}`);
  }
}
