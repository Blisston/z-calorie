import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from '../Services/data-service.service';
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
  index = [];
  i = 0;
  del = 0;
  currentdate = new Date().getDate();
  currentmonth = new Date().getMonth() + '';
  editcalorie = 2100;
  editcarbmin = 0;
  editcarbmax = 0;
  editpromax = 0;
  editpromin = 0;
  editfatmin = 0;
  editfatmax = 0;
  calories = '';
  carbs = '';
  fats = '';
  proteins = '';
  calorieDate = '';
  mmm;
  date = new Date();
  m = 0;
  changed = new EventEmitter<any[]>();
  constructor(private user: DataService, private foodservice: FooddataService) {
    this.xx();
    this.user.getFoodData('cds');
    this.user.fooddata.subscribe(res => {
      console.log(res);
      this.index = res;
      console.log(this.del);
      if (this.del == 0) {
        console.log('added');
        this.foodData(this.date.getMonth() + '' + this.date.getDate());
      }
      this.m++;
      console.log(this.m);
      console.log(res.length);
      if (this.m == 2) {
        console.log(this.m);
        this.foodData(this.date.getMonth() + '' + this.date.getDate());
        this.m++;
      }
      if (this.m > 3) {
        this.m = 1000;
      }
    });
  }
  start() {}
  foodData(x1) {
    this.del = 1;
    this.i = 0;
    console.log('fes' + x1);
    console.log(this.index.length);

    for (let i = 0; i < this.index.length; i++) {
      if (this.index[i].date == x1) {
        this.i++;
        const x = this.index[i].food;
        const g = this.index[i].servingtime;
        if (i % 2 === 0) {
          this.foodservice
            .getDetails(x)
            .pipe(retry())
            .subscribe(res1 => {
              this.addFood(res1.json().hits[0], g);
            });
        } else {
          this.foodservice
            .getDetails1(x)
            .pipe(retry())
            .subscribe(res1 => {
              this.addFood(res1.json().hits[0], g);
            });
        }
      }
    }
    console.log(this.i);
    if (this.i === 0) {
      this.del = 0;
    }
  }
  getsize() {
    return this.i;
  }
  addFood(x, g) {
    this.del = 1;
    const index = this.Food.findIndex(x1 => x.recipe.label === x1.recipe.label);
    if (index === -1) {
      x.recipe.totalTime = g;
      this.Food.push(x);
      this.changed.emit(this.Food.slice());
    } else {
      console.log('ind' + index);
    }
  }
  delete(x, date) {
    this.del = 1;
    for (let i = 0; i < this.index.length; i++) {
      if (this.index[i].food === x && this.index[i].date === date) {
        console.log(this.index[i].food);
        this.user.deleteFood(i);
      }
    }
  }
  update(x, y, date) {
    this.del = 1;
    for (let i = 0; i < this.index.length; i++) {
      if (this.index[i].food === x && this.index[i].date === date) {
        console.log(this.index[i].food);
        this.user.updateFood(i, y);
      }
    }
  }
  getFood() {
    return this.Food.slice();
  }
  xx() {
    this.user.userdetails.subscribe(a => {
      this.mmm = a;
      this.editcalorie = a.tarcalorie;
      this.editcarbmin = a.tarcarbmin;
      this.editcarbmax = a.tarcarbmax;
      this.editfatmin = a.tarfatmin;
      this.editfatmax = a.tarfatmax;
      this.editpromin = a.tarpromin;
      this.editpromax = a.tarpromax;
      this.calories = a.calories;
      this.calorieDate = a.caloriedate;
      this.fats = a.fats;
      this.carbs = a.carbs;
      this.proteins = a.proteins;
      console.log('new ' + this.calorieDate);
    });
  }
  sadcas(x, y, u, z, t) {
    this.mmm.calories = x;
    this.mmm.caloriedate = y;
    this.mmm.carbs = u;
    this.mmm.proteins = z;
    this.mmm.fats = t;
  }
}
