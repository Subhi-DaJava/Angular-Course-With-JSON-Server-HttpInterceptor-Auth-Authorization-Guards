import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from './components/home/home.component';
import {ProductsComponent} from './components/products/products.component';
import {NewProductComponent} from './components/new-product/new-product.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StateErrorComponent } from './components/state-error/state-error.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { LoginComponent } from './components/login/login.component';
import { AuthTemplateComponent } from './components/auth-template/auth-template.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    UpdateProductComponent,
    DashboardComponent,
    NavbarComponent,
    StateErrorComponent,
    LoginComponent,
    AuthTemplateComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
