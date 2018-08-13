import { Component, OnInit } from '@angular/core';
import {DataService } from '../../Services/data-service.service';
interface Users {
  name: String;
  email: String;
  height: String;
  weight: String;
  activity: String;
  gender: String;
  weightgoal?: String;
  id?: String;
  photourl: String;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
userdetails: Users;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.userdetails.subscribe(a => {
      this.userdetails = a;
    });
  }

}
