import { UserService } from './services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, private route: Router) {
    auth.user$.subscribe(user => {
      if(user) {
      userService.save(user)
        let url = localStorage.getItem('returnURL')
        //console.log(url)
        if(url)
        {
          localStorage.removeItem('returnURL')
          this.route.navigateByUrl(url)
        }
        
      }
    })
  }
}
