import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private route: Router) { }
  
  canActivate(toute, state: RouterStateSnapshot) {
    return this.auth.user$.map( user => {
      if(user) return true
      this.route.navigate(['/login'], {queryParams: {returnURL: state.url}}) //ghi lai url truy cap truoc khi dang nhap
      return false;
    })
  }
  

}
