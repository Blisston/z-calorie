import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import {FooddataService } from '../../Services/fooddata.service';
import {DataService} from '../../Services/data-service.service';
import {SharedService} from '../shared.service';
interface Food {
  food: String;
  date: String;
  servingtime: String;
  fav: Boolean;

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {
img ;
name;
food = '';
FoodList = [];
search;
searchList = [];
searchFoodList ;
searchFoodListimg ;
editcalorie = 2100;
editcarbmin;
editcarbmax ;
editpromax ;
editpromin;
editfatmin;
editfatmax ;
rangeValues: number[] = [0,  100];
date;
zz = new Date();
xx = new Date();
servingtime = '';
abc: Food = {
  food : '',
  date : '',
  servingtime: '',
  fav: false,
};
a = 0 ;
b = 0;
c = 0;
d = 0;
data: any;
options;
tarcalorie;
tarpromin;
tarpromax;
tarfatmin;
tarfatmax;
tarcarbmin;
tarcarbmax;
loader = true;
constructor(private foodservice: FooddataService, private data1: DataService, private shared: SharedService) {
  this.shared.date = this.zz;
}
  ngOnInit() {
    this.FoodList = this.shared.getFood();
    this.shared.changed.subscribe(x => {
      this.FoodList = x;
      const actual = this.shared.getsize();
      if (actual == this.FoodList.length) {
        this.loader = false;
      }

      this.sum();
    });

  }
  onChange(newValue) {
    this.shared.del = 0;
    this.a = this.b = this.c = this.d = 0;
    console.log(newValue);
    this.zz = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
    this.shared.date = this.zz;
    this.xx = new Date(newValue);
const x = this.xx.getDate();
    console.log(x);
    this.FoodList = [];
    this.shared.Food = [];
    this.shared.foodData(x);
}
  ate(x,y) {
    this.a = this.b = this.c = this.d = 0;
    this.shared.date = this.zz;
    this.abc.food = x;
    this.date = new Date(this.xx);
    this.abc.date = this.date.getDate();
    this.abc.servingtime = this.servingtime;
    console.log(x);
 this.data1.addFoodData(this.abc);
 //this.shared.Food = [];
 //this.shared.foodData(this.zz);
 this.FoodList.push(y);
 console.log(y);
}
del() {
  console.log('fes');

  this.data.deleteFood(3);
}
save() {
  this.tarcalorie = this.editcalorie;
  this.tarcarbmin = this.editcarbmin;
  this.tarcarbmax = this.editcarbmax;
  this.tarfatmin = this.editfatmin;
  this.tarfatmax = this.editfatmax;
  this.tarpromin = this.editpromin;
  this.tarpromax = this.editpromax;

}
delete(x, i) {
  console.log(x);
  this.FoodList.splice(i, 1);
  this.shared.Food = [];
this.shared.delete(x);

}
handleChange(e) {
  console.log(e.values);
  // this.editcarbmin = e.values[0];
  // this.editcarbmax = e.values[1];
}
sum() {
  this.a = this.b = this.c = this.d = 0;
  this.FoodList.forEach(a => {
   this.a = Math.floor(this.a + a.recipe.totalNutrients.FAT.quantity);
   this.b = Math.floor(this.b + a.recipe.totalNutrients.CHOCDF.quantity);
   this.c = Math.floor(this.c + a.recipe.totalNutrients.PROCNT.quantity);
   this.d = Math.floor(this.d + a.recipe.calories);
  });
  this.data = {
    labels: ['FAT', 'Carbs', 'Protein'],
    datasets: [
        {
            data: [this.a, this.b, this.c],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
    };
    this.options = {
      title: {
          display: true,
          text: 'PERCENT CALORIES FROM',
          fontSize: 14
      },
      legend: {
        display	: false,

      }
  };
}
fav(x) {

}

searchFood() {
  console.log(this.search);
  this.foodservice.getDetails(this.search).subscribe(res1 => {
    this.searchList = res1.json().hits;
    console.log(this.searchList[0].recipe);
  });

}
}
