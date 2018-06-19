import { UserService } from './services/user.service';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of'

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let url = this.route.snapshot.queryParamMap.get('returnURL') || '/'
    localStorage.setItem('returnURL', url)
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .switchMap( user => {
      if(user) return this.userService.get(user.uid)
      return Observable.of(null)
    })
  }

}
