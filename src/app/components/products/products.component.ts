import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<any> = [];

  constructor(private http: HttpClient) {
  }

  changeProductChecked(product: any) {
    this.changeChecked(product);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.http.get<Array<any>>("http://localhost:9000/products").subscribe({
      next: allProducts => {
        this.products = allProducts;
      }, error: err => {
        console.log(err);
      }
    });
  }

  private changeChecked(product: any) {
    this.http.patch(`http://localhost:9000/products/${product.id}`, {checked: !product.checked}).subscribe({
      next: productUpdated => {
        //product.checked = productUpdated;
        product.checked = !product.checked;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
