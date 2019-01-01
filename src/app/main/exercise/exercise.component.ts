import { Component, OnInit } from '@angular/core';
import {DataService} from '../../Services/data-service.service';
import { SharedService } from './../shared.service';
import { AuthService } from '../../Services/auth-service.service';
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
exercise;
tarfatmax ;
tarcalorie;


}
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit {
  run;
  display = false;
  calories = 0;
  exercise = [];
  zz = new Date();
  quot =true;
  dates = new Date().getDate();
  a =false;
b =false;
c =false;
d =false;
e =false;


  userdetails: Users;
  constructor(private data: DataService,private auth: AuthService, private shared: SharedService) { }

  ngOnInit() {
    console.log(this.zz);
    this.data.getUserData(this.auth.userdetails.email);
    this.data.userdetails.subscribe( a => {

      this.userdetails = a;
      this.exercise = a.exercise.split(',');
      console.log(this.exercise);
      console.log(this.dates);
      this.calories = this.exercise[this.dates];
      console.log(this.calories);
      if(this.calories == undefined || this.calories == +'') {
        console.log('undefinedddfxf');
        this.calories = 0;
      }
    });

  }

onChange(ds) {
  const xx = new Date(ds);
  this.dates = xx.getDate();
  this.calories = this.exercise[this.dates];
if(this.calories == undefined || this.calories == +'') {
  this.calories = 0;
}
}
  showDialog(x) {
    this.a = this.b = this.c = this.d = this.e = false;
      this.display = true;
      if(x == 1) {
        this.a = true;
      }
      if(x == 2) {
        this.b = true;
      }
      if(x == 3) {
        this.c = true;
      }
      if(x == 4) {
        this.d = true;
      }
      if(x == 5) {
        this.e = true;
      }
  }
  calcRun() {

    const  x = + 6 *this.run;
    console.log(this.calories);
    this.calories = +this.calories + x;
    console.log(this.calories);
    this.exercise[this.dates] = this.calories;
    this.userdetails.exercise = this.exercise.join();
    console.log(this.userdetails);
    this.data.updateUserData(this.userdetails.email, this.userdetails);

  }
  calcSwim() {

    const  x = + 5.5 *this.run;
    this.calories = +this.calories + x;
    this.exercise[this.dates] = this.calories;
    this.userdetails.exercise = this.exercise.join();
    this.data.updateUserData(this.userdetails.email, this.userdetails);

  }
  calcJog() {

    const  x = + 9.8 *this.run;
    this.calories = +this.calories + x;
    this.exercise[this.dates] = this.calories;
    this.userdetails.exercise = this.exercise.join();
    this.data.updateUserData(this.userdetails.email, this.userdetails);

  }
  calcCyc() {

    const  x = + 6 *this.run;
    this.calories = +this.calories + x;
    this.exercise[this.dates] = this.calories;
    this.userdetails.exercise = this.exercise.join();
    this.data.updateUserData(this.userdetails.email, this.userdetails);

  }
  calcDan() {

    const  x = + 6 *this.run;
    this.calories = +this.calories + x;
    this.exercise[this.dates] = this.calories;
    this.userdetails.exercise = this.exercise.join();
    this.data.updateUserData(this.userdetails.email, this.userdetails);

  }
}
