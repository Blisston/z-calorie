import { Component, OnInit, EventEmitter,OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import {MaterializeAction} from 'angular2-materialize';
import {FooddataService } from '../../Services/fooddata.service';
import {DataService} from '../../Services/data-service.service';
import {SharedService} from '../shared.service';
interface Food {
  food: String;
  date: String;
  servingtime: String;
  fav: Boolean;

}
interface Users {
  name: String;
  email: String;
  height: String;
  weight: String;
  updatedWeightMonth?: String;
  activity: String;
  gender: String;
  weightgoal?: String;
  id?: String;
  calories?: String;
  caloriedate?: String;
  photourl: String;
  tarcarbmin;
tarcarbmax ;
tarpromax ;
tarpromin;
tarfatmin;

tarfatmax ;
tarcalorie;



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
export class HomeComponent implements OnInit, OnDestroy {
  modalActions = new EventEmitter<string|MaterializeAction>();
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
zz = new Date()
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
exist = false;
userDetails: Users;
tarpromax;
tarfatmin;
tarfatmax;
tarcarbmin;
tarcarbmax;
trackDate ;
calorieTrack = [];
calorieDate = [];
loader = true;
addCalor = 0;
me = false;
display: boolean = false;
display1: boolean = false;
showDialog() {
    this.display = true;
}
showDialog1() {
  this.display1 = true;
}
constructor(private foodservice: FooddataService, private data1: DataService, private shared: SharedService) {
  this.shared.date = this.zz;
  this.shared.xx();

  this.data1.userdetails.subscribe(a => {
    this.userDetails = a;
    this.ini();
  })



}
ini()
{
    this.editcalorie = this.shared.editcalorie;
    this.editcarbmin = this.shared.editcarbmin;
    this.editcarbmax = this.shared.editcarbmax;
    this.editfatmin = this.shared.editfatmin;
    this.editfatmax = this.shared.editfatmax;
    this.editpromin = this.shared.editpromin;
    this.editpromax = this.shared.editpromax;

    this.addedCalorie();
    console.log('cons');

    console.log('sixe00'+ this.shared.getsize());
    if(this.shared.getsize() === 0) {
      this.loader = false;
    }
    this.me=true;
    this.sum();

}
  ngOnInit() {
    this.trackDate= this.shared.currentdate;
    console.log('sdfa'+ this.trackDate);
    this.onChange(new Date(2018,9,this.trackDate));
    console.log('ng');
    this.FoodList = this.shared.getFood();
    this.shared.changed.subscribe(x => {
      this.trackDate = this.shared.currentdate;
      this.FoodList = x;
      const actual = this.shared.getsize();
      console.log(this.me);

      if (actual == this.FoodList.length) {
        this.loader = false;
      }
if(this.me) {
  console.log('h');
      this.sum();}
      else {
        this.ini();
      }
    });
  }

  addedCalorie() {

  }
  openModal() {
    console.log('dsa');
    this.modalActions.emit({action: 'modal', params : ['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  onChange(newValue) {

    this.shared.del = 0;
    this.a = this.b = this.c = this.d = 0;

    this.zz = newValue;
    this.shared.date = this.zz;
    this.xx = new Date(newValue);
const x = this.xx.getDate();
this.trackDate = x;
this.shared.currentdate = this.trackDate;
console.log(this.trackDate);

    this.FoodList = [];
    this.shared.Food = [];
    this.shared.foodData(x);
    this.loader = true;
    if(this.shared.getsize() === 0) {
      this.loader = false;
    }
}
  ate(x,y) {
    this.a = this.b = this.c = this.d = 0;
    this.shared.date = this.zz;
    this.abc.food = x;
    this.date = new Date(this.xx);
    this.abc.date = this.date.getDate();
    this.abc.servingtime = this.servingtime;
if(this.FoodList.length ===0){

  this.data1.addFoodData(this.abc);
    this.FoodList.push(y);
}
for (let i = 0 ; i < this.FoodList.length ; i++) {
  if(this.FoodList[i].recipe.label === x){
this.exist = true;
break;
  }
  else{this.exist = false;}
}
  if(this.exist)
   {
    this.abc.servingtime = '2';
    this.shared.update(x, this.abc , this.trackDate);
  } else {
    this.data1.addFoodData(this.abc);
    this.FoodList.push(y);
  }

 this.addedCalorie();
 this.sum();
}

save() {
  this.userDetails.tarcalorie = this.editcalorie;
  this.userDetails.tarcarbmin = this.editcarbmin;
  this.userDetails.tarcarbmax = this.editcarbmax;
  this.userDetails.tarfatmin = this.editfatmin;
  this.userDetails.tarfatmax = this.editfatmax;
  this.userDetails.tarpromin = this.editpromin;
  this.userDetails.tarpromax = this.editpromax;
  this.data1.updateUserData(this.userDetails.email, this.userDetails);
}
delete(x, i, date) {
  this.FoodList.splice(i, 1);
  this.shared.Food = [];
this.shared.delete(x,this.trackDate);
this.sum();

}
handleChange(e) {

  // this.editcarbmin = e.values[0];
  // this.editcarbmax = e.values[1];
}

sum() {
  let xb=0;
  this.a = this.b = this.c = this.d = 0;
  const bb = this.shared.calorieDate;
let cc = this.shared.calories;
  this.FoodList.forEach(a => {
    xb++;
   this.a = Math.floor(this.a + a.recipe.totalNutrients.FAT.quantity);
   this.b = Math.floor(this.b + a.recipe.totalNutrients.CHOCDF.quantity);
   this.c = Math.floor(this.c + a.recipe.totalNutrients.PROCNT.quantity);
   this.d = Math.floor(this.d + a.recipe.calories);

  this.calorieTrack = this.shared.calories.split(',');
  this.calorieDate = this.shared.calorieDate.split(',');
console.log(this.trackDate);
  const x = this.calorieDate.indexOf(`${this.trackDate}`);

  if (this.calorieDate.indexOf(`${this.trackDate}`) === -1) {
    this.shared.calories = this.shared.calories + `,${this.d}` ;
    this.shared.calorieDate = this.shared.calorieDate + `,${this.trackDate}`;

} else {
  console.log("index is "+x);
this.calorieTrack[x] = this.d;
this.calorieDate[x] = this.trackDate;

this.shared.calories = this.calorieTrack.join();
  this.shared.calorieDate = this.calorieDate.join();

}

this.shared.sadcas(this.shared.calories,this.shared.calorieDate);

  });
  console.log(cc +' '+ this.shared.calories);

  if(cc!==this.shared.calories && xb===this.shared.getsize()){
    console.log('dtyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  this.data1.updateUserData(this.shared.mmm.email, this.shared.mmm);
cc=this.shared.calories;
}
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
  this.foodservice.getDetails(this.search).subscribe(res1 => {
    this.searchList = res1.json().hits;
  });

}
ngOnDestroy() {
  this.shared.currentdate = this.trackDate;
  this.FoodList = [];
  this.shared.Food = [];
}
}
