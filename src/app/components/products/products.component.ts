import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    public appState: AppStateService) {
  }

  changeProductChecked(product: Product) {
    this.changeChecked(product);
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  public searchProducts() {
    this.productService.searchProducts(
      this.appState.productState.keyword,
      this.appState.productState.currentPage,
      this.appState.productState.pageLimit).subscribe({
      next: response => {
        this.appState.productState.products = response.body as Product[];

        let totalProducts: number = parseInt(response.headers.get('x-total-count')!);
        this.appState.productState.totalProducts = totalProducts;
        //console.log("total products: " + totalProducts)

        this.appState.productState.totalPages = Math.floor(totalProducts / this.appState.productState.pageLimit);
        //  console.log("before modeler: "+ this.totalPages);

        if (totalProducts % this.appState.productState.pageLimit != 0) {
          ++this.appState.productState.totalPages;
        }
        //console.log("after modeler: " + this.totalPages);

      }, error: err => {
        this.appState.productState.errorMessage = err.message;
        // console.log(err);
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
        this.appState.productState.errorMessage = err.message;
      }
    });
  }

  public deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product ?'))
      this.productService.deleteProductById(id).subscribe({
        next: value => {
          // this.appState.productState.products = this.appState.productState.products.filter((product:any) => product.id != id);
         this.appState.productState.currentPage = 1;
          this.searchProducts();
        }, error: err => {
          this.appState.productState.errorMessage = err.message;
        }
      });
  }

  surfPage(page: number) {
    this.appState.productState.currentPage = page;
    this.searchProducts();
  }

  updateProduct(productId: number) {
    this.router.navigateByUrl(`/update-product/${productId}`).then();
  }
}
