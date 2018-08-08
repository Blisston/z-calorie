import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from './auth-service.service';
interface Users {
  username;
  email;
  id?;

}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  postsCol: AngularFirestoreCollection<Users>;
  posts: Observable<Users[]>;
  itemdoc: AngularFirestoreDocument<Users>;
  userdetails: Users = {
    username: '',
    email: ''
  };
  id;
  constructor(public afs: AngularFirestore, private auth: AuthService) {
   }
  User(userdata) {
    this.postsCol = this.afs.collection(userdata.email);
    this.posts = this.afs.collection(userdata.email).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Users;
        data.id = a.payload.doc.id;
        return data;
      });

    }));
    this.newUser(userdata);
 }
newUser(userdata) {
  this.postsCol.add(userdata);
}
  editUser() {
    console.log(this.posts.subscribe(item => {
      this.id = item[0].id;
      this.itemdoc = this.afs.doc(`${this.userdetails.email}/${this.id}`);
      this.itemdoc.delete();
    }));
    }
}
