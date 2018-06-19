import { AuthService } from './../auth.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$
  constructor(private orderService: OrderService, private auth: AuthService) {

    this.orders$ = auth.user$.switchMap(u => orderService.getOrdersByUser(u.uid))
   }

  ngOnInit() {
  }

}
