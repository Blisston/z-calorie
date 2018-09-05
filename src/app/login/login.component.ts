import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';

import {AuthService} from '../Services/auth-service.service';
import {DataService} from '../Services/data-service.service';
import {Router} from '@angular/router';
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
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
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

  };
  register = false;
  olduser = true;
  physical = true;
  tarcalorie;
  display = "none";
tarpromin;
tarpromax;
tarfatmin;
tarfatmax;
tarcarbmin;
tarcarbmax;
editcalorie = 2100;
editcarbmin;
editcarbmax ;
editpromax ;
editpromin;
editfatmin;
editfatmax ;

  constructor( private auth: AuthService,
     private data: DataService, private ref: ChangeDetectorRef,
      private router: Router,
    private zone: NgZone   ) { }
  ngOnInit() {}

  toggle() {
    this.olduser = !this.olduser;
  }
  physicaltog() {
    const self = this;
    self.physical = !this.physical;
    self.ref.detectChanges();
    console.log(this.physical);
  }
  toggleDisplay()
  {
    if(this.display === 'block'){
    this.display = "none";}
    else{
      this.display ="block"
    }
  }
  login() {
    this.auth.login();
    const self = this;
    this.auth.newUser.subscribe(x => {
      if (x) {
      const data = this.auth.getUserDEtails();
      this.userdetails.name = data.username;
      this.userdetails.email = data.email;
      this.userdetails.photourl = data.photourl;
      self.register = !this.register;
      self.ref.detectChanges();
     } else {

    this.zone.run(() => this.router.navigate(['main']));

     }    }
    );
  }
  dcs() {
    this.router.navigate(['main']);
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
  console.log(this.userdetails);
  this.data.User(this.userdetails);
  this.zone.run(() => this.router.navigate(['main']));
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
  // goal = '3600';
  // now  = '2400';

  //
  //  it = {
  //   goal: '3600',
  //   now: '2413'
  // };



  // calculate() {
  // this.delete();
  // }
  // delete() {
  //   this.itemdoc = this.afs.doc(`data/4sHZqmrXTWLbyC7POqYz`);
  //   this.itemdoc.delete();
  // }
}
