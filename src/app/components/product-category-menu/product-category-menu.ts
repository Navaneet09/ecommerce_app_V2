import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
// import { ProductService } from '../../services/product.service';
import { ProductService } from '../../services/product-service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgForOf, NgFor } from "@angular/common";

@Component({
  selector: 'app-product-category-menu',
  imports: [NgForOf, RouterLink, RouterLinkActive],
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css'
})
export class ProductCategoryMenu implements OnInit{
  
  productCategories: ProductCategory[] = [];
  
  constructor(private productService: ProductService) {}
  
  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    
    this.productService.getProductCategories().subscribe(
      //check this || before this was data => {
        data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
