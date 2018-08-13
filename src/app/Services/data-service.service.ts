import { Injectable, EventEmitter } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

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
@Injectable({
  providedIn: 'root'
})
export class DataService {
  postsCol: AngularFirestoreCollection<Users>;
  posts: Observable<Users[]>;
  itemdoc: AngularFirestoreDocument<Users>;
  userdetails = new EventEmitter();
  id;
  constructor(public afs: AngularFirestore) {}
  User(userdata) {
    this.postsCol = this.afs.collection(userdata.email);
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

  // editUser() {
  //   console.log(this.posts.subscribe(item => {
  //     this.id = item[0].id;
  //     this.itemdoc = this.afs.doc(`${this.userdetails.email}/${this.id}`);
  //     this.itemdoc.delete();
  //   }));
  //   }
}
