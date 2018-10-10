import { Injectable, EventEmitter } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';

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
  newUser = new Subject;
  invalid = new EventEmitter;
  existinguser = new EventEmitter;
    userdetails: Users = {
    username: '',
    email: 'blisstonkirubha@gmail.com',
    photourl: '',
    id: ''
  };
  error = false;
  olduser = true;
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
         this.olduser = !this.olduser;
         this.newUser.next(true);
         console.log('new user');
       } else {
        this.newUser.next(false);
        this.router.navigate(['main']);
         console.log('existing user');
       }
      });

}
signUpWithEmail(email, password: string, displayName) {
  this.fauth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      if (user.additionalUserInfo.isNewUser)
      {
        this.userdetails.email =  email;
        this.userdetails.username = displayName;
        //this.userdetails.photourl = res.user.photoURL;

        this.invalid.emit(true);
         console.log('new user');
      }

      console.log(user.additionalUserInfo.isNewUser);
    })
    .catch(error => {
      this.invalid.emit(false);
      console.log(error);
      return error;

    });
}
loginWithEmail(email , password: string) {
  console.log('sad');
  return this.fauth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.router.navigate(['main']);
console.log(user);
    })
    .catch(error => {
      this.existinguser.emit(false);
      this.error = true;
      console.log(error)
    });
}

getUserDEtails() {
  return this.userdetails;
}
logout() {
}
}
