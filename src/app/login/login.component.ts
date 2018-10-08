import { Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';

import {AuthService} from '../Services/auth-service.service';
import {DataService} from '../Services/data-service.service';
import {Router} from '@angular/router';

import {SelectItem} from 'primeng/api';
import { Subscription } from 'rxjs';
interface UserDetails {
  name: String;
  email: String;
  height: String;
  weight: String;
  activity: String;
  age: String;
  gender: String;
  weightgoal?: String;
  id?: String;
  photourl: String;
  bodyFat: String;
  tarcarbmin;
tarcarbmax ;
tarpromax ;
tarpromin;
tarfatmin;
updatedWeightMonth;
tarfatmax ;
tarcalorie;
calories?: String;
  caloriedate?: String;

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  userdetails: UserDetails = {
    name : '',
    email : '',
    height: '',
    weight: '',
    activity: '',
    gender: '',
    weightgoal: '',
    id: '',
    age: '',
    photourl : '',
    bodyFat: '',
    tarcarbmin: 33,

tarcarbmax : 231,
tarpromax : 231,
tarpromin: 100,
tarfatmin: 33,
tarfatmax : 103,
tarcalorie: '',
calories: '',
  caloriedate: '',
  updatedWeightMonth: ''

  };
  register = true;
  olduser = true;
  physical = true;
  display = 'none';
  editpromax = 231;
  editfatmin = 33;
  editfatmax = 103;
  editcarbmin = 33;
  editcarbmax = 231;
  editpromin = 100;
  load = false;
  pass = 'dfknlnk';
editcalorie;
unsubs: Subscription;


weightGoal: SelectItem[];

selectedWeightGoal = 'Lose weight' ;

bodyFat: SelectItem[];

selectedbodyFat: string[] = [];
activityLevel: SelectItem[];

selectedActivityLevel: string[] = [];


  constructor( public auth: AuthService,
     private data: DataService, private ref: ChangeDetectorRef,
      private router: Router,
    private zone: NgZone   ) {
      this.weightGoal = [];
      this.weightGoal.push({label:'Lose weight', value: 'Lose weight'});
      this.weightGoal.push({label:'Maintain', value: 'Maintain'});
      this.weightGoal.push({label:'Gain Weight', value: 'Gain Weight'});
      this.bodyFat = [];
      this.bodyFat.push({label: 'Low', value: 'Low'});
      this.bodyFat.push({label: 'Medium', value: 'Medium'});
      this.bodyFat.push({label: 'High', value: 'High'});
      this.activityLevel = [];
      this.activityLevel.push({label: 'Low', value: 'Low'});
      this.activityLevel.push({label: 'Medium', value: 'Medium'});
      this.activityLevel.push({label: 'High', value: 'High'});

}
  ngOnInit() {}

  toggle() {
    this.auth.olduser = !this.auth.olduser;
  }
  physicaltog() {
    const self = this;
    self.physical = !this.physical;
    self.ref.detectChanges();
    this.calculateCalories();
  }
  toggleDisplay() {
    const self = this;
    if (this.display === 'block'){
    self.display = "none";
    self.ref.detectChanges();}
    else{
    self.display ="block";
    self.ref.detectChanges();
    }
    console.log(this.display);
  }
  login() {
    this.auth.login();
    const self = this;
    this.unsubs = this.auth.newUser.subscribe(x => {
      if (x) {
      const data = this.auth.getUserDEtails();
      this.userdetails.name = data.username;
      this.userdetails.email = data.email;
      this.userdetails.photourl = data.photourl;
      self.register = !this.register;
      self.ref.detectChanges();
     } else {
this.router.navigate(['main']);
  // this.zone.run(() => this.router.navigate(['main']));
   this.router.navigate(['main']);

     }    }
   );
  }
back() {
  const self = this;
    self.register = !this.register;
    self.ref.detectChanges();
    console.log(this.physical);
}
print() {
  console.log('ds');
}
submit1() {
  const monthNames = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
  'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
  const d = new Date();
    const date = d.getDate() +  monthNames[d.getMonth()];
  console.log(this.userdetails);
  this.data.User(this.userdetails);
  this.zone.run(() => this.router.navigate(['main']));
}
saveAdditional() {

console.log(this.userdetails.weightgoal);
this.toggleDisplay();

}
save() {
  this.userdetails.tarcalorie = this.editcalorie;
  this.userdetails.tarcarbmin = this.editcarbmin;
  this.userdetails.tarcarbmax = this.editcarbmax;
  this.userdetails.tarfatmin = this.editfatmin;
  this.userdetails.tarfatmax = this.editfatmax;
  this.userdetails.tarpromin = this.editpromin;
  this.userdetails.tarpromax = this.editpromax;

}
calculateCalories() {
  if (this.userdetails.gender === 'female') {
    if (+ this.userdetails.age > 3 && + this.userdetails.age < 9) {
      this.editcalorie = 22.5 * (+ this.userdetails.weight) + 499;
    }
    if (+ this.userdetails.age > 9 && + this.userdetails.age < 17) {
    this.editcalorie = 12.2 * (+ this.userdetails.weight) + 746;
    }
    if (+ this.userdetails.age > 17 && + this.userdetails.age < 29) {
    this.editcalorie = 14.7 * (+ this.userdetails.weight) + 496;
    }
    if (+ this.userdetails.age > 29 && + this.userdetails.age < 60) {
      this.editcalorie = 8.7 * (+ this.userdetails.weight) + 829;
    }
    if (+ this.userdetails.age > 60) {
    this.editcalorie = 10.5 * (+ this.userdetails.weight) + 596;
  }}
  if(this.userdetails.gender === 'male') {
    if (+ this.userdetails.age > 3 && + this.userdetails.age < 9) {
    this.editcalorie = 22.7 * (+ this.userdetails.weight) + 495;
    }
    if (+ this.userdetails.age > 9 && + this.userdetails.age < 17) {
    this.editcalorie = 17.5 * (+ this.userdetails.weight) + 651;
    }
    if (+ this.userdetails.age > 17 && + this.userdetails.age < 29) {
    this.editcalorie = 15.3 * (+ this.userdetails.weight) + 679;
    console.log(this.editcalorie);
    }
    if (+ this.userdetails.age > 29 && + this.userdetails.age < 60) {
      this.editcalorie = 11.6 * (+ this.userdetails.weight) + 879;
    }
    if (+ this.userdetails.age > 60) {
    this.editcalorie = 13.5 * (+ this.userdetails.weight) + 487;
  }
  }
  if(this.userdetails.activity === 'Low') {
    this.editcalorie = this.editcalorie * 1.2;
  }
  if(this.userdetails.activity === 'Medium') {
    this.editcalorie = this.editcalorie * 1.3;
    console.log(this.editcalorie);
  }
  if(this.userdetails.activity === 'High') {
    this.editcalorie = this.editcalorie * 1.3;
  }this.userdetails.tarcalorie = this.editcalorie;
}
ngOnDestroy() {
  //this.unsubs.unsubscribe();
}
emailLogin() {
  console.log(this.pass);
this.auth.signUpWithEmail(this.userdetails.email , this.pass);
}
loginWithEmail() {
  console.log(this.pass);
  this.auth.loginWithEmail(this.userdetails.email, this.pass);
}
}
