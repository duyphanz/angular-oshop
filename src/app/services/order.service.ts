import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  storeOrder(order) {
    return this.db.list('/orders').push(order)
  }

  getOrders() {
    return this.db.list('/orders')
  }

  getOrdersByUser(userId: string){
    return this.db.list('/orders', {
      query:{
        orderByChild: 'userId',
        equalTo: userId
      }
    })
  }

}
