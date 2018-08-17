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
  constructor(private user: DataService, private foodservice: FooddataService, private auth: AuthService, private shared: SharedService) {

   }

  ngOnInit() {
    this.user.getUserData(this.auth.userdetails.email);
    this.user.userdetails.subscribe(a => {
    this.name = a.name;
    this.photo = a.photourl;
    });
    this.user.getFoodData('cds');
    this.user.fooddata.subscribe(res => {
      console.log(res.length);
      for (let i = 0; i < res.length ; i++) {
        if (res[i].date === '13') {
        const x = res[i].food;
        if (i % 2 === 0) {
          this.foodservice.getDetails(x).subscribe(res1 => {
            this.shared.addFood(res1.json().hits[0]);
          });
        } else {
          this.foodservice.getDetails1(x).subscribe(res1 => {
            this.shared.addFood(res1.json().hits[0]);
          });
        }
      }}
    });
  }
  toggle() {
    this.active = !this.active;
}

}
