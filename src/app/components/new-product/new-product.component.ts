import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  public productForm!: FormGroup;
  private errorMessage!: string;
  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : this.formBuilder.control('', [Validators.required]),
      pixel : this.formBuilder.control(''),
      price : this.formBuilder.control(0,[Validators.required]),
      checked : this.formBuilder.control(false),
    })
  }

  addNewProduct() {
    let newProduct : Product = this.productForm.value;
    this.productService.addProduct(newProduct).subscribe({
      next: productSaved => {
        console.log(productSaved)
      },
      error:err => {
        this.errorMessage = err.message;
      }
    });
  }
}
