import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { cartService } from '../../services/cart-service';
import { CartItem } from '../../common/cart-item';
// import { RouterLink } from "../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: cartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    //get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart() {
    console.log(`Adding to Cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
