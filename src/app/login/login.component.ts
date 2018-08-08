import { Component, OnInit } from '@angular/core';

import {AuthService} from '../Services/auth-service.service';
import {DataService} from '../Services/data-service.service';
interface UserDetails {
  name: String;
  email: String;
  height: String;
  weight: String;
  activity: String;
  gender: String;
  weightgoal?: String;
  id?: String;
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
    id: ''

  };
  register = false;
  olduser = true;


  constructor( private auth: AuthService, private data: DataService   ) { }
  ngOnInit() {}

  toggle() {
    this.olduser = !this.olduser;
  }
  login() {
    this.auth.login();
    this.auth.newUser.subscribe(x => {
      if (x) {
      const data = this.auth.getUserDEtails();
      this.userdetails.name = data.username;
      this.userdetails.email = data.email;
      this.register = false;
    this.data.User(this.userdetails); }
    }
    );
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
