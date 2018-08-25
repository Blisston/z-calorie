import { Injectable, EventEmitter } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {AuthService } from './auth-service.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Users {
  name: String;
  email: String;
  height: String;
  weight: String;
  activity: String;
  gender: String;
  weightgoal?: String;
  id?: String;
  photourl: String;
}
interface Food {
  food: String;
  date: String;
  id?: String;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  postsCol: AngularFirestoreCollection<Users>;
  posts: Observable<Users[]>;
  Foods: AngularFirestoreCollection<Food>;
  Foodx: Observable<Food[]>;
  itemdoc: AngularFirestoreDocument<Users>;
  Fooddoc: AngularFirestoreDocument<Food>;
  userdetails = new EventEmitter();
  fooddata = new EventEmitter();
  id;
  data;
  constructor(public afs: AngularFirestore, public auth: AuthService) {}
  User(userdata) {
    this.postsCol = this.afs.collection(this.auth.userdetails.email);
    this.posts = this.afs
      .collection(userdata.email)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Users;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    this.newUser(userdata);
  }
  newUser(userdata) {
    this.postsCol.add(userdata);
  }
  getUserData(email) {
    this.postsCol = this.afs.collection(email);
    const data = this.postsCol.valueChanges();
    data.subscribe(a => {
      this.userdetails.emit(a[0]);
    });
  }
FoodFire(f) {
  this.Foods = this.afs.collection(this.auth.userdetails.email);
  this.Foodx = this.afs
    .collection(this.auth.userdetails.email)
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Food;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    console.log(f);
    this.addFoodData(f);
}
addFoodData(f) {
  this.Foods.add(f);
}
getFoodData(email) {
  this.Foods = this.afs.collection(this.auth.userdetails.email);
  this.data = this.Foods.valueChanges();

  this.data.subscribe(a => {
    this.fooddata.emit(a);
  });
}
  deleteFood(i) {
    this.Foods = this.afs.collection(this.auth.userdetails.email);
    this.data = this.Foods.snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Food;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.data.subscribe(item => {
      this.id = item[i].id;
      console.log(this.id);
      this.Fooddoc = this.afs.doc(`blisstonkirubha@gmail.com/${this.id}`);
      this.Fooddoc.delete();
    });
    }
}
