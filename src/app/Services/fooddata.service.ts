import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class FooddataService {

  constructor(private http: Http ) { }
  getDetails(food) {
   return this.http.get(`https://api.edamam.com/search?q=${food}&app_id=fc3a6891&app_key=ffea9d169adfe36c0c805090ad5d80ef`);
  }
  getDetails1(food) {
    return this.http.get(`https://api.edamam.com/search?q=${food}&app_id=5f164d59&app_key=05bde8d3ae9dee3af47a89ba686602ca`);
   }
}
