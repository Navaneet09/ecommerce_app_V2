import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { ProductList } from "./components/product-list/product-list";
import {  HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product-service';
import { ProductCategoryMenu } from "./components/product-category-menu/product-category-menu";
import { Search } from "./components/search/search";
import { CartStatus } from "./components/cart-status/cart-status";

@Component({
  selector: 'app-root',
  imports: [ProductCategoryMenu, HttpClientModule, RouterOutlet, Search, CartStatus],
  providers: [ProductService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
