import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<any> = [];

  constructor(private productService: ProductService) {
  }

  changeProductChecked(product: any) {
    this.changeChecked(product);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.productService.getProducts().subscribe({
      next: allProducts => {
        this.products = allProducts;
      }, error: err => {
        console.log(err);
      }
    });
  }

  private changeChecked(product: any) {
    this.productService.updateProductChecked(product).subscribe({
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
