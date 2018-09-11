import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { DataService } from '../../Services/data-service.service';
import {AuthService  } from '../../Services/auth-service.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  data: any;
  calorieDate;
  calorie;
  ngOnInit() {
    this.dataService.getUserData(this.auth.userdetails.email);
    this.dataService.userdetails.subscribe(a => {
      this.calorieDate = a.caloriedate.split(',');
      this.calorie = a.calories.split(',');
      console.log(this.calorieDate);
      console.log(this.calorie);
      const list = [];
      for (let j = 0; j < this.calorieDate.length; j++) {
          list.push({'date': this.calorieDate[j], 'cal': this.calorie[j]});
        }


      list.sort(function (aa, b) {
          return ((aa.date < b.date) ? -1 : ((aa.date === b.date) ? 0 : 1));
      });


      for (let k = 0; k < list.length; k++) {
          this.calorieDate[k] = list[k].date;
          this.calorie[k] = list[k].cal;
      }
      this.calorieChart();
          });
  }

  constructor(private messageService: MessageService, private dataService: DataService, private auth: AuthService) {


  }

  calorieChart() {
    console.log('s');
    this.data = {
      labels: this.calorieDate,
      datasets: [
          {
              label: 'Calories',
              data: this.calorie,
              fill: false,
              borderColor: '#4bc0c0'
          },
      ]
  };
  }
  selectData(event) {
      this.messageService.add({severity: 'info', summary: 'Data Selected',
      'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }
}

