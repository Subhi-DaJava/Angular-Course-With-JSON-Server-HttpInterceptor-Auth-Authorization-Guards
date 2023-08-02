import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public searchProducts(keyword: string = "", _page : number = 1, _limit : number = 5) {
    // return response -> the Object of type Http
    return this.http.get(`${this.host}?productName_like=${keyword}&_page=${_page}&_limit=${_limit}`,{observe:'response'});
  }

  public updateProductChecked(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/${product.id}`, {checked: !product.checked})
  }

  public deleteProductById(id: number) {
    return this.http.delete<any>(`${this.host}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>("${this.host}", product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/${productId}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/${product.id}`, product);
  }
}
