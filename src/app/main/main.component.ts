import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  active: boolean = false;
toggle() {
    this.active = !this.active;
}
  constructor() { }

  ngOnInit() {
  }

}
