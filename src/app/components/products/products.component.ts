import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Array<any> = [
    { id : 1, productName:"Asus PC", pixel:"1980 Px", price: 800, checked: false },
    { id : 2, productName:"Dell Monitor", pixel:"2000 Px", price: 256, checked: true },
    { id : 3, productName:"Samsung A21", pixel:"800 Px", price: 240, checked: true },
    { id : 4, productName:"Iphone X Max", pixel:"1000 Px", price: 990, checked: true },
    { id : 5, productName:"Nokia Phone", pixel:"600 Px", price: 350, checked: false }
  ];

  changeProductChecked(product: any) {
    product.checked = !product.checked;
  }
}
