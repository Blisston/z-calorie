import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService } from '../Services/data-service.service';
import {AuthService  } from '../Services/auth-service.service';
import {SharedService} from './shared.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  active =  false;
  photo;
  name = '';
  load = true;
  constructor(private user: DataService, private auth: AuthService, private shared: SharedService, private router: Router) {

   }

  ngOnInit() {
    this.user.getUserData(this.auth.userdetails.email);
    this.user.userdetails.subscribe(a => {
    this.name = a.name;
    this.photo = a.photourl;
    if(this.name!== '') {
      this.load = false;
    }
    });
  }
  toggle() {
    this.active = !this.active;
}
logout() {
  this.auth.logout();
  this.router.navigate(['/']);
}

}
