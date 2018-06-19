import { ShoppingCart } from './../models/shopping-cart';
import { AppProduct } from './../models/app-product';
import { async } from '@angular/core/testing';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart()
    return this.db.object('/shopping-carts/' + cartId)
    .map(x => new ShoppingCart(x.items))
  }
  async addToCart(product: AppProduct) {
    this.updateItem(product, 1)
  }
   
  async removeFromCart(product: AppProduct) {
    this.updateItem(product, -1)
  }

  async clearCart(){
    let cartId = await this.getOrCreateCart()
    this.db.object('/shopping-carts/' + cartId + '/items').remove()
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if(cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cartId', result.key)
    return result.key

  }

  private getItem(cartId: string, product: AppProduct) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key)
  }

 

  private async updateItem(product: AppProduct, change: number) {
    let cartId = await this.getOrCreateCart()
    let item$ = this.getItem(cartId, product)
    item$.take(1).subscribe( item => {
      // if(item.$exists()) item$.update({quantity: item.quantity - 1})
      // else item$.set({product: product, quantity: 0})
      //cach rut gon hon
      let quantity = (item.quantity || 0) + change
      if(quantity === 0) item$.remove()
      else item$.update(
        {
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        })
    })
  }

}
