import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser
  cart$: Observable<ShoppingCart>

  constructor(
    private cartService: ShoppingCartService,
    private auth: AuthService, 
    private router: Router
  ) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser
    })
    this.cart$ = await this.cartService.getCart()
    
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/'])
  }

}
