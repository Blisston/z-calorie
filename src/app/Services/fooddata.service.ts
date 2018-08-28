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
   getFood(food) {
  return this.http.get(`https://api.edamam.com/api/food-database/parser?ingr=${food}&app_id=5d3f56de&app_key=e5b01b5a1563ebbdbc5804f8f5640c68`)
   }
   getImage(image) {
     return this.http.get(`https://pixabay.com/api/?key=9866321-b5fab8f96e0bdea8611d3f9a2&q=${image}&image_type=photo&pretty=true&category=food`);
   }
}
