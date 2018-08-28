
import { Injectable, EventEmitter } from '@angular/core';
import {DataService } from '../Services/data-service.service';
import { FooddataService } from '../Services/fooddata.service';
import { map, retry, catchError } from 'rxjs/operators';
interface Food {
  food: String;
  date: String;
  servingtime: String;
}
@Injectable({
  providedIn: 'root'
})
export class SharedService {
Food = [];
index =[];
date = new Date();
changed = new EventEmitter<any[]>();
  constructor(private user: DataService, private foodservice: FooddataService) {
    this.user.getFoodData('cds');
    this.user.fooddata.subscribe(res => {
      console.log(res);
      this.index = res;
      console.log(this.date.getDate());
      this.foodData(this.date.getDate());
     });


   }
start() {


}
   foodData(x1) {
      console.log("fes" + x1);
      for (let i = 0; i < this.index.length ; i++) {
        if (this.index[i].date == x1) {
        const x = this.index[i].food;
        if (i % 2 === 0) {
          this.foodservice.getDetails(x).pipe(retry()).subscribe(res1 => {
            this.addFood(res1.json().hits[0]);
          });
        } else {
          this.foodservice.getDetails1(x).pipe(retry()).subscribe(res1 => {
            this.addFood(res1.json().hits[0]);
          });
        }
      }}
   }
  addFood(x) {
    this.Food.push(x);
    this.changed.emit(this.Food.slice());
  }
  delete(x) {
    for(let i = 0 ; i < this.index.length; i++) {
      if(this.index[i].food === x){
        console.log(this.index[i].food);
                this.user.deleteFood(i);

      }
    }

  }
  getFood() {
    return this.Food.slice();
  }
}
