import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class cartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {

    //check if we have the item already in cart
    let alreadyExistsInCart: boolean = false;
    //Typescript not allowing to initialize to undefined hence using uunion type to explicitly declare it as CartItem | undefined
    let existingCartItem: CartItem | undefined = undefined;

    if(this.cartItems.length > 0) {

      //updated find the item in cart based on id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      
      //find the item in cart based on id ... same as above but not using arrays.find(...)
      // for( let tempCartItem of this.cartItems) {
      //   if(tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break
      //   }
      // }

      //checnk if we found it  
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart) {

      //increase the quantity of the item
      existingCartItem!.quantity++;
    }
    else {
      //add item to array
      this.cartItems.push(theCartItem);
    }
  
    //compute total cart price and quantity
    this.computeCartTotal();
  }

  computeCartTotal() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publishing values ... (all subscribers get the new data)
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //logging cart data
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  //For logging purposes
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log(`Contents of the cart: `);
    for(let tempItems of this.cartItems) {
      const subTotalPrice = tempItems.quantity * tempItems.unitPrice;
      console.log(`name: ${tempItems.name}, quantity: ${tempItems.quantity}, unitPrice: ${tempItems.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log(`----------`)
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotal();
    }
  }

  remove(theCartItem: CartItem) {
    
    //get index of item in array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

    //remove item from the aray at given index if found
    if(itemIndex >= -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotal();
    }
  }

}
