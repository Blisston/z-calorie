import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { queryRefresh } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('explain', [
      transition('* => *', [
        query('.anim', style({opacity: 0, transform: 'translateX(-40px)'})),
        query('.anim', stagger('500ms' , [
          animate('800ms  ease-out', style({opacity: 1, transform: 'translateX(0)'} ))
        ]) )

      ]),
    ])
  ]
})
export class LandingPageComponent implements OnInit {
gender;
age;
weight;
work;
editcalorie;
loader = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

login() {
  this.router.navigate(['/login']);
}
calculateCalories() {
  console.log(this.work);
  this.loader = true;
  if (this.gender === 'female') {
    if (+ this.age > 3 && + this.age < 9) {
      this.editcalorie = 22.5 * (+ this.weight) + 499;
    }
    if (+ this.age > 9 && + this.age < 17) {
    this.editcalorie = 12.2 * (+ this.weight) + 746;
    }
    if (+ this.age > 17 && + this.age < 29) {
    this.editcalorie = 14.7 * (+ this.weight) + 496;
    }
    if (+ this.age > 29 && + this.age < 60) {
      this.editcalorie = 8.7 * (+ this.weight) + 829;
    }
    if (+ this.age > 60) {
    this.editcalorie = 10.5 * (+ this.weight) + 596;
  }}
  if(this.gender === 'male') {
    if (+ this.age > 3 && + this.age < 9) {
    this.editcalorie = 22.7 * (+ this.weight) + 495;
    }
    if (+ this.age > 9 && + this.age < 17) {
    this.editcalorie = 17.5 * (+ this.weight) + 651;
    }
    if (+ this.age > 17 && + this.age < 29) {
    this.editcalorie = 15.3 * (+ this.weight) + 679;
    console.log(this.editcalorie);
    }
    if (+ this.age > 29 && + this.age < 60) {
      this.editcalorie = 11.6 * (+ this.weight) + 879;
    }
    if (+ this.age > 60) {
    this.editcalorie = 13.5 * (+ this.weight) + 487;
  }
  }
  if(this.work === 1) {
    this.editcalorie = this.editcalorie * 1.2;
  }
  if(this.work === 2) {
    this.editcalorie = this.editcalorie * 1.3;
    console.log(this.editcalorie);
  }
  if(this.work === 3) {
    this.editcalorie = this.editcalorie * 1.4;
  }
  console.log(this.editcalorie);
  if(this.editcalorie === NaN) {
    this.editcalorie = 'Enter valid input';
  }
  setTimeout(()=> { this.loader = false; }, 3000);
}
}
