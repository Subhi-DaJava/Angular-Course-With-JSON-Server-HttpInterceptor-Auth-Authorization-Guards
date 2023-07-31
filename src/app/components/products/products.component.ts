import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public errorMessage!: string;
  public keyword: string = '';
  public totalPages : number = 0;
  public pageLimit: number = 5;
  public currentPage: number = 1;

  constructor(private productService: ProductService) {
  }

  changeProductChecked(product: Product) {
    this.changeChecked(product);
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  public searchProducts() {
   this.productService.searchProducts(this.keyword, this.currentPage, this.pageLimit).subscribe({
      next: response => {
        this.products = response.body as Product[];

        let totalProducts : number = parseInt(response.headers.get('x-total-count')!);
        //console.log("total products: " + totalProducts)

        this.totalPages = Math.floor(totalProducts / this.pageLimit);
      //  console.log("before modeler: "+ this.totalPages);

        if (totalProducts % this.pageLimit != 0) {
          this.totalPages++;
        }
        //console.log("after modeler: " + this.totalPages);

      }, error: err => {
        this.errorMessage = err.message;
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

  surfPage(page: number) {
    this.currentPage = page;
    this.searchProducts();
  }
}
