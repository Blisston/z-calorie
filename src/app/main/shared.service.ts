
import { Injectable, EventEmitter } from '@angular/core';
interface Food {
  food: String;
  date: String;
  servingtime: String;
}
@Injectable({
  providedIn: 'root'
})
export class SharedService {
Food = [];
changed = new EventEmitter<any[]>();
  constructor() { }
  addFood(x) {
    this.Food.push(x);
    this.changed.emit(this.Food.slice());
  }
  getFood() {
    return this.Food.slice();
  }
}
