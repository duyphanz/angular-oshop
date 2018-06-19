import { AppProduct } from './models/app-product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product: AppProduct) {
    return this.db.list('/products').push(product)
  }

  getAll() {
    return this.db.list('/products')
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId)
  }

  updateProduct(productId, product) {
    return this.db.object('/products/' + productId).update(product)
  }

  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove()
  }
}
