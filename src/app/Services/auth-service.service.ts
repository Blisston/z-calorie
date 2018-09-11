import { Injectable, EventEmitter } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

interface Users {
  username;
  email;
  id?;
  photourl;

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser = new EventEmitter;
    userdetails: Users = {
    username: '',
    email: '',
    photourl: '',
    id: ''
  };
  constructor(public fauth: AngularFireAuth, private router: Router) { }

  login()  {

      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fauth.auth
      .signInWithPopup(provider)
      .then(res => {
       this.userdetails.email =  res.user.email;
       this.userdetails.username = res.user.displayName;
       this.userdetails.photourl = res.user.photoURL;
       if (res.additionalUserInfo.isNewUser) {
         this.newUser.emit(true);
         console.log('new user');
       } else {
        this.newUser.emit(false);
        this.router.navigate(['main']);
         console.log('existing user');
       }
      });

}
getUserDEtails() {
  return this.userdetails;
}
}
