import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule , Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatFormFieldModule} from '@angular/material';
import {MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatOptionModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatNativeDateModule

                      } from '@angular/material';
 import {MatIconModule} from '@angular/material/icon';
 import {MatMenuModule} from '@angular/material/menu';
 import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
 import {RadioButtonModule} from 'primeng/radiobutton';
 import {MatDatepickerModule} from '@angular/material/datepicker';
 import {SliderModule} from 'primeng/slider';
 import {ToastModule} from 'primeng/toast';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './main/profile/profile.component';
import { HomeComponent } from './main/home/home.component';
import {FooddataService } from './Services/fooddata.service';
import {ChartModule} from 'primeng/chart';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MessageService} from 'primeng/api';
import { GraphComponent } from './main/graph/graph.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputMaskModule} from 'primeng/inputmask';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import {DialogModule} from 'primeng/dialog';
import { ExerciseComponent } from './main/exercise/exercise.component';
import {ScrollToModule} from 'ng2-scroll-to';




const routes: Routes = [
{path: '', component: LandingPageComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'main', component: MainComponent , children: [
  {path: '', component: HomeComponent},
  {path: 'Profile', component: ProfileComponent},
  {path: 'Graph', component: GraphComponent},
  {path: 'Exercise', component: ExerciseComponent},

]},

];
const config = {
    apiKey: "AIzaSyDmF1oytdSvOpbyBTfms1qDpIvOgSE1qs8",
    authDomain: "z-calorie.firebaseapp.com",
    databaseURL: "https://z-calorie.firebaseio.com",
    projectId: "z-calorie",
    storageBucket: "z-calorie.appspot.com",
    messagingSenderId: "988913518214"
  };

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ProfileComponent,
    HomeComponent,
    GraphComponent,
    ExerciseComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    MatFormFieldModule,
    MatInputModule,
    DialogModule,
    MatRadioModule,
    MaterializeModule,
    MatSelectModule,
     MatOptionModule,
     MatDividerModule,
     MatListModule,
     MatIconModule,
     MatCardModule,
     MatNativeDateModule,
     InputMaskModule,
     MatProgressSpinnerModule,
     MatDatepickerModule,
     AngularFireModule.initializeApp(config),
     AngularFirestoreModule,
     AngularFireAuthModule,
     RadioButtonModule,
     ChartModule,
     MatMenuModule,
     ButtonModule,
     SliderModule,
     ToastModule,
     SelectButtonModule,
     ScrollToModule.forRoot(),
    InputTextModule  ],
  providers: [FooddataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
