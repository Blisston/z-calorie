import { Component, OnInit } from '@angular/core';
import {AuthService } from '../Services/auth-service.service';
import {DataService } from '../Services/data-service.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  active =  false;
  photo;
  name = '';
  constructor(private auth: AuthService, private user: DataService, private afs: AngularFirestore) {

   }

  ngOnInit() {
    this.user.getUserData('blisstonkirubha@gmail.com');
    this.user.userdetails.subscribe(a => {
    this.name = a.name;
    this.photo = a.photourl;
    });
  }
  toggle() {
    this.active = !this.active;
}

}
