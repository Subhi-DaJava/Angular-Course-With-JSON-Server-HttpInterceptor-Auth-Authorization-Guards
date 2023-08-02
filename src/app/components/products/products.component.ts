import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {AppStateService} from "../../services/app-state.service";
import {Status} from "../../models/status";

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
    this.appState.setProductState({
      status: Status.LOADING
    })
    this.productService.searchProducts(
      this.appState.productState.keyword,
      this.appState.productState.currentPage,
      this.appState.productState.pageLimit).subscribe({
      next: response => {
        let products: Product[] = response.body as Product[];

        let totalProducts: number = parseInt(response.headers.get('x-total-count')!);
        //this.appState.productState.totalProducts = totalProducts;
        //console.log("total products: " + totalProducts)

        let totalPages: number= Math.floor(totalProducts / this.appState.productState.pageLimit);
        //  console.log("before modeler: "+ this.totalPages);

        if (totalProducts % this.appState.productState.pageLimit != 0) {
          totalPages++;
        }
        //console.log("after modeler: " + this.totalPages);

        this.appState.setProductState({
          products: products,
          totalPages: totalPages,
          totalProducts: totalProducts,
          status: Status.LOADED
        });
      }, error: err => {
        this.appState.setProductState({
          errorMessage: err.message,
          status: Status.ERROR
        });
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
        this.appState.setProductState({
          errorMessage: err.message
        });
      }
    });
  }

  public deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product ?'))
      this.productService.deleteProductById(id).subscribe({
        next: value => {
          // this.appState.productState.products = this.appState.productState.products.filter((product:any) => product.id != id);
         //this.appState.productState.currentPage = 1;
          this.appState.setProductState({
            currentPage: 1
          });
          this.searchProducts();
        }, error: err => {
          this.appState.setProductState({
            errorMessage: err.message
          });
        }
      });
  }

  surfPage(page: number) {
    this.appState.setProductState({
      currentPage: page
    });
    this.searchProducts();
  }

  updateProduct(productId: number) {
    this.router.navigateByUrl(`/update-product/${productId}`).then();
  }
}
