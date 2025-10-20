import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { cartService } from '../../services/cart-service';
import { NgFor, NgIf } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
// import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-cart-details',
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css'
})
export class CartDetails {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: cartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    
    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //subscribe to cart totalQuanntity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    //compute totalPrice & totalQuantity
    this.cartService.computeCartTotal();
  }

}
