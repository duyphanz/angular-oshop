import { OrderService } from './../services/order.service';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = []
  cart: ShoppingCart
  userId: string
  subscription: Subscription
  userSubscription: Subscription


  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart()
    this.subscription =  cart$.subscribe(cart => this.cart = cart)
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
    })
  }
  
 async placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      userId: this.userId,
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    let result = await this.orderService.storeOrder(order)
    this.cartService.clearCart()
    this.router.navigate(['/orders-success', result.key])
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }
}
