import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule
                      } from '@angular/material';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

const config = {
  apiKey: 'AIzaSyBI4Xq9-lcks-X7zXJZo-T2sj2mOaBDrQw',
  authDomain: 'login-1526286516019.firebaseapp.com',
  databaseURL: 'https://login-1526286516019.firebaseio.com',
  projectId: 'login-1526286516019',
  storageBucket: 'login-1526286516019.appspot.com',
  messagingSenderId: '602135765232'
};

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
     MatOptionModule,
     AngularFireModule.initializeApp(config),
     AngularFirestoreModule,
     AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
