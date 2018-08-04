import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/Operators';
interface Post {
  goal: String;
  now: String;
  id?: String;
}
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent implements OnInit {
gender;
age;
weight;
work;
goal = '3600';
now  = '2400';
email;
itemdoc: AngularFirestoreDocument<Post>;
 it = {
  goal: '3600',
  now: '2413'
};
postsCol: AngularFirestoreCollection<Post>;
posts: Observable<Post[]>;
  constructor(public fauth: AngularFireAuth, public afs: AngularFirestore) { }
ngOnInit() {
}


calculate() {
  this.postsCol = this.afs.collection(this.email);
  this.posts = this.afs.collection(this.email).snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as Post;
      data.id = a.payload.doc.id;
      return data;
    });

  }));
this.postsCol.add(this.it);
this.delete();
}
delete() {
  this.itemdoc = this.afs.doc(`data/4sHZqmrXTWLbyC7POqYz`);
  this.itemdoc.delete();
}




login()  {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fauth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
       this.email =  res.additionalUserInfo.profile.email;
      });
    });
}
}
