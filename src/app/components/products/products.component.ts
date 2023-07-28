import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  errorMessage!: string;

  constructor(private productService: ProductService) {
  }

  changeProductChecked(product: Product) {
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
        this.errorMessage = err.message;
        console.log(err);
      }
    });
  }

  private changeChecked(product: Product) {
    //this.productService.updateProductChecked(product);
    this.productService.updateProductChecked(product).subscribe({
      next: productUpdated => {
        //product.checked = productUpdated;
        product.checked = !product.checked;
      },
      error: err => {
        console.log(err.message);
        this.errorMessage = err.message;
      }
    });
  }

  public deleteProduct(id: number) {
    if(confirm('Are you sure to delete this product ?'))
    this.productService.deleteProductById(id).subscribe({
      next: value =>  {
        this.products = this.products.filter(product => product.id != id);
      }, error: err => {
        this.errorMessage = err.message;
      }
    });
  }
}
