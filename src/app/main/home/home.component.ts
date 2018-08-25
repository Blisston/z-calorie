import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./home.component.scss']
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
date = '';
zz;
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
data: any;
options;
constructor(private foodservice: FooddataService, private data1: DataService, private shared: SharedService) {
}
  ngOnInit() {
    this.FoodList = this.shared.getFood();
    this.shared.changed.subscribe(x => {
      this.FoodList = x;
      this.sum();
    });

  }
  onChange(newValue) {
    console.log(newValue);
    this.zz = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
    const d = new Date(newValue);
this.zz = d.getDate();
    console.log(this.zz);
    this.FoodList = [];
    this.shared.Food = [];
    this.shared.foodData(this.zz);
}
  ate(x) {
    this.abc.food = x;
    this.abc.date = '13';
    this.abc.servingtime = this.servingtime;
    console.log(this.food);
 this.data1.addFoodData(this.abc);
 this.shared.Food = [];
 this.shared.start();
 this.shared.foodData(this.zz);
}
del() {
  console.log('fes');

  this.data.deleteFood(3);
}
delete(x, i) {
  console.log(x);
  this.FoodList.splice(i, 1);
  this.shared.Food = [];
this.shared.delete(x);




}
sum() {
  this.FoodList.forEach(a => {
   this.a = this.a + a.recipe.totalNutrients.FAT.quantity;
   this.b = this.b + a.recipe.totalNutrients.CHOCDF.quantity;
   this.c = this.c + a.recipe.totalNutrients.PROCNT.quantity;
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
