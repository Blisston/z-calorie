import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  display: boolean = false;

  showDialog() {
      this.display = true;
  }
}
