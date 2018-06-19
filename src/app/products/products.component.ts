import { AppProduct } from './../models/app-product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap'
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[] = []
  filteredProducts: AppProduct[]
  category
  cart: any
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private cartService: ShoppingCartService
  ) {
    productService
    .getAll()
    .switchMap((p: AppProduct[])=> {
      this.products = p
      return this.route.queryParamMap
    })
    .subscribe(params => {
      
        this.category = params.get('category') 
        //khi queryParams thay doi se thuc hien filter product
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => 
            {
              return p.category === this.category
            }) : this.products
        
      })
    
   }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
    .subscribe(cart => this.cart = cart)
    
    
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
