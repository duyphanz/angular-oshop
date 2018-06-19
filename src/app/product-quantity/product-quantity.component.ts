import { Component, OnInit, Input } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product: AppProduct
@Input('shopping-cart') shoppingCart

  constructor(private cardService: ShoppingCartService) { 
    //console.log(this.product)
  }

  addToCart() {
    this.cardService.addToCart(this.product)
  }

  removeFromCart() {
    this.cardService.removeFromCart(this.product)
  }
  

}
