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

  public searchProducts(keyword: string = "", _page : number = 1, _limit : number = 5) {
    // return response -> the Object of type Http
    return this.http.get(`http://localhost:9000/products?productName_like=${keyword}&_page=${_page}&_limit=${_limit}`,{observe:'response'});
  }

  public updateProductChecked(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:9000/products/${product.id}`, {checked: !product.checked})
  }

  public deleteProductById(id: number) {
    return this.http.delete<any>(`http://localhost:9000/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:9000/products", product);
  }

}
