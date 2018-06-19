import { UserService } from './services/user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
@Injectable()
export class AdminAuthGuardService implements CanActivate {

  
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
    .map(appUser => {
      return appUser.isAdmin
    })
  }

}
