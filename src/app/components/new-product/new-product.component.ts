import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  public productForm!: FormGroup;
  public errorMessage!: string;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : this.formBuilder.control('', [Validators.required]),
      pixel : this.formBuilder.control(''),
      price : this.formBuilder.control(0,[Validators.required]),
      checked : this.formBuilder.control(false),
    });
  }

  addNewProduct() {

    let newProduct : Product = this.productForm.value;
    this.productService.addProduct(newProduct).subscribe({
      next: productSaved => {
        this.router.navigateByUrl('/products').then();
        console.log(productSaved)
      },
      error:err => {
        this.errorMessage = err.message;
      }
    });
  }
}
