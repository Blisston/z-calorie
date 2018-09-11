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
  constructor(private router: Router) { }

  ngOnInit() {
  }
calculate() {

}
login() {
  this.router.navigate(['/login']);
}
}
