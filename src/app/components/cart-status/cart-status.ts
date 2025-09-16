import { Component } from '@angular/core';
import { cartService } from '../../services/cart-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-status',
  imports: [CurrencyPipe],
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css'
})
export class CartStatus {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: cartService) {}

  ngOnInit(): void {
    this.updateCartService();
  }

  updateCartService() {
    
    //subscribe to the cart total price
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );


    //subscribe oto the cart total quantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
