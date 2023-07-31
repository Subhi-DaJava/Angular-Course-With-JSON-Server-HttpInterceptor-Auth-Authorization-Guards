import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  public productId!: number;
  public formGroup!: FormGroup;
  public errorMessage!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];

    this.getProductById(this.productId);

  }

  private getProductById(productId: number){
    this.productService.getProductById(productId).subscribe({
      next: productById => {
        this.formGroup = this.formBuilder.group({
          id: this.formBuilder.control(productById.id),
          productName : this.formBuilder.control(productById.productName, [Validators.required]),
          pixel : this.formBuilder.control(productById.pixel),
          price : this.formBuilder.control(productById.price,[Validators.required, Validators.min(200)]),
          checked : this.formBuilder.control(productById.checked),
        });
      }, error: err => {
        this.errorMessage = err.message;
      }
    });
  }

  public updateProduct() {
    let product: Product = this.formGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: productUpdated => {
        alert(JSON.stringify(productUpdated) + " has been successfully updated!");
        this.router.navigateByUrl('/products').then();
      }
    });
  }
}
