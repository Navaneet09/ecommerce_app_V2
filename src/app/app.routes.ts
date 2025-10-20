import { Routes, RouterModule } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { App } from './app';
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { ProductService } from './services/product-service';
import { ProductDetails } from './components/product-details/product-details';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartDetails } from './components/cart-details/cart-details';

export const routes: Routes = [
    {path: 'cart-details', component: CartDetails},
    {path: 'search/:keyword', component: ProductList},
    {path: 'products/:id', component: ProductDetails},
    {path: 'category/:id/:name', component: ProductList},
    {path: 'category', component: ProductList},
    {path: 'products', component: ProductList},
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        NgbModule
    ]
}) 
export class AppRouter {}