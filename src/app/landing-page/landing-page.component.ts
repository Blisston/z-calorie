import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit() {
  }
calculate() {

}
login() {
  this.router.navigate(['/login']);
}
}
