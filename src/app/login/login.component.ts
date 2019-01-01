import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  OnDestroy
} from '@angular/core';

import { AuthService } from '../Services/auth-service.service';
import { DataService } from '../Services/data-service.service';
import { Router } from '@angular/router';

import { SelectItem, MessageService } from 'primeng/api';
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
  tarcarbmax;
  tarpromax;
  tarpromin;
  tarfatmin;
  updatedWeightMonth;
  tarfatmax;
  tarcalorie;
  calories?: String;
  caloriedate?: String;
  carbs;
  fats;
  exercise;
  proteins;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  userdetails: UserDetails = {
    name: '',
    email: '',
    height: '',
    weight: '',
    activity: 'Medium',
    gender: '',
    weightgoal: 'Maintain',
    id: '',
    age: '',
    photourl:'',
    bodyFat: 'Medium',
    tarcarbmin: 33,
    carbs: '',
    fats: '',
    exercise: '',
    proteins: '',
    tarcarbmax: 231,
    tarpromax: 231,
    tarpromin: 100,
    tarfatmin: 33,
    tarfatmax: 103,
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
  pass = '';
  editcalorie;
  unsubs: Subscription;

  weightGoal: SelectItem[];

  selectedWeightGoal = 'Lose weight';

  bodyFat: SelectItem[];

  selectedbodyFat: string[] = [];
  activityLevel: SelectItem[];

  selectedActivityLevel: string[] = [];

  constructor(
    public auth: AuthService,
    private data: DataService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService,
    private zone: NgZone
  ) { }
  ngOnInit() {}

  toggle() {
    this.auth.olduser = !this.auth.olduser;
    this.userdetails.name = '';
    this.userdetails.email = '';
    this.pass = '';
  }
  physicaltog() {
    if (this.validate()) {
    const self = this;
    self.physical = !this.physical;
    self.ref.detectChanges();
    this.calculateCalories();}
  }
  validate() {
    if (this.userdetails.height === '' || this.userdetails.weight === '' || this.userdetails.age === '' || this.userdetails.gender === '') {
      this.showError('Empty fields', 'Enter all field');
      console.log('vali');
      return false;
    }
    if (+this.userdetails.height > 271 ||  +this.userdetails.height < 120) {
      this.showError('Invalid height', 'Enter weight between 120 to 270');
      return false;
    }
    if (+this.userdetails.weight > 300 || + this.userdetails.weight < 20) {
      this.showError('Invalid weight', 'Enter weight between 20 to 300');
      return false;
    }
    if (+this.userdetails.age > 130 || + this.userdetails.age < 5) {
      this.showError('Invalid age', 'Enter weight between 5 to 130');
      return false;
    }
    return true;
  }
  toggleDisplay() {
    const self = this;
    if (this.display === 'block') {
      self.display = 'none';
      self.ref.detectChanges();
    } else {
      self.display = 'block';
      self.ref.detectChanges();
    }
    console.log(this.display);
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Order submitted'
    });
  }

  login() {
    this.auth.login();
    const self = this;
    this.unsubs = this.auth.newUser.subscribe(x => {
      console.log('sasa');
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
      }
    });
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
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];
    const d = new Date();
    const date = d.getDate() + monthNames[d.getMonth()];
    this.userdetails.updatedWeightMonth = date;
    this.userdetails.caloriedate = ',';
    this.userdetails.calories = ',';
    this.userdetails.carbs = ',';
    this.userdetails.fats = ',';
    this.userdetails.exercise = ',';
    this.userdetails.proteins = ',';
    console.log(this.userdetails);
    this.data.User(this.userdetails);
    this.showSuccess();
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
      if (+this.userdetails.age > 3 && +this.userdetails.age < 9) {
        this.editcalorie = 22.5 * +this.userdetails.weight + 499;
      }
      if (+this.userdetails.age > 9 && +this.userdetails.age < 17) {
        this.editcalorie = 12.2 * +this.userdetails.weight + 746;
      }
      if (+this.userdetails.age > 17 && +this.userdetails.age < 29) {
        this.editcalorie = 14.7 * +this.userdetails.weight + 496;
      }
      if (+this.userdetails.age > 29 && +this.userdetails.age < 60) {
        this.editcalorie = 8.7 * +this.userdetails.weight + 829;
      }
      if (+this.userdetails.age > 60) {
        this.editcalorie = 10.5 * +this.userdetails.weight + 596;
      }
    }
    if (this.userdetails.gender === 'male') {
      if (+this.userdetails.age > 3 && +this.userdetails.age < 9) {
        this.editcalorie = 22.7 * +this.userdetails.weight + 495;
      }
      if (+this.userdetails.age > 9 && +this.userdetails.age < 17) {
        this.editcalorie = 17.5 * +this.userdetails.weight + 651;
      }
      if (+this.userdetails.age > 17 && +this.userdetails.age < 29) {
        this.editcalorie = 15.3 * +this.userdetails.weight + 679;
        console.log(this.editcalorie);
      }
      if (+this.userdetails.age > 29 && +this.userdetails.age < 60) {
        this.editcalorie = 11.6 * +this.userdetails.weight + 879;
      }
      if (+this.userdetails.age > 60) {
        this.editcalorie = 13.5 * +this.userdetails.weight + 487;
      }
    }
    if (this.userdetails.activity === 'Low') {
      this.editcalorie = this.editcalorie * 1.2;
    }
    if (this.userdetails.activity === 'Medium') {
      this.editcalorie = this.editcalorie * 1.3;
      console.log(this.editcalorie);
    }
    if (this.userdetails.activity === 'High') {
      this.editcalorie = this.editcalorie * 1.3;
    }
    this.userdetails.tarcalorie = this.editcalorie;
  }
  ngOnDestroy() {
    console.log(this.unsubs);
    this.unsubs.unsubscribe();
    console.log(this.unsubs);
  }
  emailLogin() {
    console.log(this.pass);
    if (
      !(this.userdetails.email.indexOf('@') === -1) &&
      !(this.pass.length < 6)
    ) {
      this.auth.signUpWithEmail(
        this.userdetails.email,
        this.pass,
        this.userdetails.name
      );
      const self = this;

      this.unsubs = this.auth.invalid.subscribe(x => {
        if (x) {
          console.log('bli');
          self.toggle();
          const data = this.auth.getUserDEtails();
          this.userdetails.name = data.username;
          this.userdetails.email = data.email;
          //this.userdetails.photourl = data.photourl;
          self.register = !this.register;
          self.ref.detectChanges();
        } else {
          this.showError('Existing user', 'Email address already in use');
        }
      });
    } else {
      if(this.pass.length < 6) {
        this.showError('Password length', 'Password atleast 6 characters');
      } else {
      this.showError('Invalid input', 'Please enter valid input'); }
    }
  }
  loginWithEmail() {
    console.log(this.pass);
    const self = this;
    if (
      !(this.userdetails.email.indexOf('@') === -1) &&
      !(this.pass.length < 6)
    ) {
      this.auth.loginWithEmail(this.userdetails.email, this.pass);
      this.unsubs = this.auth.existinguser.subscribe(x => {
        if (x) {
        } else {
          this.showError(' Unknow user', 'Please Register');
        }
      });
    } else {
      this.showError('Invalid input', 'Please enter valid input');
    }
  }

  showError(error, errormsg) {
    console.log('sa');
    const self = this;
    self.messageService.add({
      severity: 'error',
      summary: error,
      detail: errormsg
    });
    self.ref.detectChanges();

  }
  clear() {
    const self = this;
    console.log('c');
    self.messageService.clear();
}
}
