import { Component, OnInit } from '@angular/core';
import {FooddataService } from '../Services/fooddata.service';
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
  constructor(private user: DataService, private auth: AuthService, private shared: SharedService) {

   }

  ngOnInit() {
    this.user.getUserData(this.auth.userdetails.email);
    this.user.userdetails.subscribe(a => {
    this.name = a.name;
    this.photo = a.photourl;
    });
  }
  toggle() {
    this.active = !this.active;
}

}
