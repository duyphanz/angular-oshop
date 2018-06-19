import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppProduct } from './../models/app-product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: AppProduct
  @Input('show-action') showAction: boolean
  @Input('shopping-cart') shoppingCart

  constructor(private cardService: ShoppingCartService) { 
    //console.log(this.product)
  }

  addToCart() {
    this.cardService.addToCart(this.product)
  }

 
  

}
