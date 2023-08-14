import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from "./components/products/products.component";
import {NewProductComponent} from "./components/new-product/new-product.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthTemplateComponent} from "./components/auth-template/auth-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./components/not-authorized/not-authorized.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'auth', component: AuthTemplateComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: 'products', component: ProductsComponent},
      { path: 'newProduct', component: NewProductComponent, canActivate: [AuthorizationGuard], data: { roles: 'ADMIN' } },
      { path: 'update-product/:id', component: UpdateProductComponent, canActivate: [AuthorizationGuard], data: { roles: 'ADMIN' } },
      { path: 'notAuthorized', component: NotAuthorizedComponent }
    ]
  },

  { path: 'home', component: HomeComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: "", redirectTo: "login", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
