import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule , Routes} from '@angular/router';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        MatDividerModule,
        MatListModule,

                      } from '@angular/material';
 import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './main/profile/profile.component';
const routes: Routes = [
{path: '', component: LandingPageComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'main', component: MainComponent},

]
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
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
     MatOptionModule,
     MatDividerModule,
     MatListModule,
     MatIconModule,
     AngularFireModule.initializeApp(config),
     AngularFirestoreModule,
     AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
