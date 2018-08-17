import { Component, OnInit } from '@angular/core';
import {FooddataService } from '../../Services/fooddata.service';
import {DataService} from '../../Services/data-service.service';
import {SharedService} from '../shared.service';
interface Food {
  food: String;
  date: String;
  servingtime: String;
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
date = '';
servingtime = '';
abc: Food = {
  food : '',
  date : '',
  servingtime: '',
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
  deel() {
    this.abc.food = this.food;
    this.abc.date = '13';
    this.abc.servingtime = this.servingtime;
    console.log(this.food);
 this.data.FoodFire(this.abc);
}
del() {
  console.log('fes');
  this.data.deleteFood(3);
}
sum() {
  this.FoodList.forEach(a => {
   this.a = this.a + a.recipe.totalNutrients.FAT.quantity;
   this.b = this.b + a.recipe.totalNutrients.CHOCDF.quantity;
   this.c = this.c + a.recipe.totalNutrients.PROCNT.quantity;
console.log(this.a);
console.log(this.b);
console.log(this.c);
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
}
