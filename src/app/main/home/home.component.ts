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
piepro;
piefat;
piecarb;
rangeValues: number[] = [0,  100];
date;
zz = new Date();
xx = new Date();
servingtime = '';
abc: Food = {
  food : '',
  date : '',
  servingtime: '1',
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
text = false;
carbsTrack = [];
proteinTrack = [];
fatTrack = [];
calorieDate = [];
loader = true;
addCalor = 0;
me = false;
but = false;
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
  });



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



    if(this.shared.getsize() === 0) {
      this.loader = false;
      this.text = true;
    }
    this.me=true;
    this.sum();

}
  ngOnInit() {
    const x1 = this.shared.currentdate;
    let y = this.shared.currentmonth + '';
    if (y.length < 2) {
      y =  '0' + '' + y;
    }
    this.trackDate= y + '' + x1;

    this.onChange(new Date(2018, +this.shared.currentmonth, this.shared.currentdate));

    this.FoodList = this.shared.getFood();
    this.shared.changed.subscribe(x => {
      const x1 = this.shared.currentdate;
      const y= this.shared.currentmonth;
      this.trackDate = y + '' + x1;
      this.FoodList = x;
      const actual = this.shared.getsize();
      console.log(this.FoodList);

      if (actual == this.FoodList.length) {
        this.loader = false;
        this.text = false;
      }
if(this.me) {

      this.sum();}
      else {
        this.ini();
      }
    });
  }

  addedCalorie() {

  }
  openModal() {

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
let y = this.xx.getMonth() + '';
if (y.length < 2) {
  y =  '0' + '' + y;

}
this.trackDate = y + '' + x;
this.shared.currentdate = x;
this.shared.currentmonth = y;
console.log(this.trackDate);

    this.FoodList = [];
    this.shared.Food = [];
    this.shared.foodData(this.trackDate);
    this.loader = true;
    if(this.shared.getsize() === 0) {
      this.loader = false;
      this.text = true;
    }
}
  ate(x,y) {
    this.a = this.b = this.c = this.d = 0;
    this.shared.date = this.zz;
    this.abc.food = x;
    this.date = new Date(this.xx);
    this.abc.date = this.trackDate;
    this.text = false;
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
    console.log(+this.abc.servingtime );
    this.abc.servingtime = (+this.abc.servingtime + 1) + '';

    this.shared.update(x, this.abc , this.trackDate);
  } else {
    this.abc.servingtime = '1';
    this.data1.addFoodData(this.abc);
    this.FoodList.push(y);
  }

 this.addedCalorie();
 this.sum();
 this.text = false;
}

save() {
  this.shared.mmm.tarcalorie = this.editcalorie;
  this.shared.mmm.tarcarbmin = this.editcarbmin;
  this.shared.mmm.tarcarbmax = this.editcarbmax;
  this.shared.mmm.tarfatmin = this.editfatmin;
  this.shared.mmm.tarfatmax = this.editfatmax;
  this.shared.mmm.tarpromin = this.editpromin;
  this.shared.mmm.tarpromax = this.editpromax;
  this.data1.updateUserData(this.shared.mmm.email, this.shared.mmm);
  this.display = false;
}
delete(x, i, date) {
  this.FoodList.splice(i, 1);
  this.shared.Food = [];
this.shared.delete(x,this.trackDate);

this.sum();

}


sum() {
  console.log(this.FoodList);
  this.text = false;
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
const total = this.a + this.b + this.c;
this.piecarb = (this.b / total) * 100;
this.piepro = (this.c / total) * 100;
this.piefat = (this.a / total) * 100;
  this.calorieTrack = this.shared.calories.split(',');
  this.calorieDate = this.shared.calorieDate.split(',');
  this.carbsTrack = this.shared.carbs.split(',');
  this.proteinTrack = this.shared.proteins.split(',');
  this.fatTrack = this.shared.fats.split(',');
  console.log(this.calorieDate.indexOf(`${this.trackDate}`));
  const x = this.calorieDate.indexOf(`${this.trackDate}`);

  if (this.calorieDate.indexOf(`${this.trackDate}`) === -1) {
    this.shared.calories = this.shared.calories + `,${this.d}` ;
    this.shared.carbs = this.shared.carbs + `,${this.b}` ;
    this.shared.proteins = this.shared.proteins + `,${this.c}` ;
    this.shared.fats = this.shared.fats + `,${this.a}` ;
    this.shared.calorieDate = this.shared.calorieDate + `,${this.trackDate}`;

} else {

this.calorieTrack[x] = this.d;
this.calorieDate[x] = this.trackDate;
this.proteinTrack[x] = this.c;
this.fatTrack[x] = this.a;
this.carbsTrack[x] = this.b;

this.shared.calories = this.calorieTrack.join();
this.shared.carbs = this.carbsTrack.join();
this.shared.proteins = this.proteinTrack.join();
this.shared.fats = this.fatTrack.join();
  this.shared.calorieDate = this.calorieDate.join();

}
this.text = false;
this.shared.sadcas(this.shared.calories,this.shared.calorieDate,this.shared.carbs,this.shared.proteins,this.shared.fats);

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
            data: [this.piefat, this.piecarb, this.piepro],
            backgroundColor: [
                "#660099",
                "FF0000",
                "#003366"
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


searchFood() {
  this.foodservice.getDetails(this.search).subscribe(res1 => {
    this.searchList = res1.json().hits;
  });

}
ngOnDestroy() {
  console.log('fsdfsd' +this.trackDate);
  this.shared.currentmonth = this.trackDate.substring(0, 2);
  this.shared.currentdate = this.trackDate.substring(2, 4);
  this.FoodList = [];
  this.shared.Food = [];
}
}
