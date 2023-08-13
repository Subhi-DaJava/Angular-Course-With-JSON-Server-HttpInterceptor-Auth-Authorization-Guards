import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from "./components/products/products.component";
import {NewProductComponent} from "./components/new-product/new-product.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthTemplateComponent} from "./components/auth-template/auth-template.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'auth', component: AuthTemplateComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'newProduct', component: NewProductComponent },
      { path: 'update-product/:id', component: UpdateProductComponent }
    ]
  },

  { path: 'home', component: HomeComponent },
  { path: "", redirectTo: "login", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
