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
  fats;
  carbs;
  proteins;
  data1;

  data2;
  data3;
  tarCalorie = [];
  exercise;

  ngOnInit() {

    this.dataService.getUserData(this.auth.userdetails.email);
    this.dataService.userdetails.subscribe(a => {
      this.calorieDate = a.caloriedate.split(',');
      this.calorie = a.calories.split(',');
      this.fats = a.fats.split(',');
      this.carbs = a.carbs.split(',');
      this.proteins = a.proteins.split(',');
      this.exercise = a.exercise.split(',');

      const list = [];
      for (let j = 0; j < this.calorieDate.length; j++) {
          list.push({'date': this.calorieDate[j], 'cal': this.calorie[j], 'pro': this.proteins[j],
           'fat': this.fats[j], 'carbs': this.carbs[j]});
        }


      for (let i = 0 ; i < list.length ; i++) {
        for (let j = i; j < list.length ; j++) {
          if (+(list[i].date) > +(list[j].date)) {

           const temp = list[i];
           list[i] = list[j];
           list[j] = temp;

          }
        }
      }
      console.log(list);
      for (let k = 0; k < list.length; k++) {
        this.tarCalorie.push(a.tarcalorie);
          this.calorieDate[k] = list[k].date;
          this.calorie[k] = list[k].cal;
          this.carbs[k] = list[k].carbs;
          this.proteins[k] = list[k].pro;
          this.fats[k] = list[k].fat;
      }
      console.log(this.carbs);

      this.calorieChart();
          });
  }

  constructor(private messageService: MessageService, private dataService: DataService, private auth: AuthService) {


  }

  calorieChart() {
    console.log(this.calorieDate);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    for(let i=0 ; i< this.calorieDate.length ;  i++) {
      const x = this.calorieDate[i];
      const y = month[+x.substring(0,2)];
      const z = x.substring(2,4);
      console.log(z+y);
      this.calorieDate[i] = z+y;
    }
    this.data = {
      labels: this.calorieDate,
      datasets: [
          {
              label: 'Calories',
              data: this.calorie,
              fill: false,
              borderColor: '#8B88FF'
          },
            {
                label: 'Target Calorie',
                data: this.tarCalorie,
                fill: false,
                borderColor: '#EEDB00'
            },
            {
              label: 'Calories burned',
              data: this.exercise,
              fill: false,
              borderColor: '#FF9C00'
          }
      ]
  };
  this.data1 = {
    labels: this.calorieDate,
    datasets: [
        {
            label: 'Carbs',
            data: this.carbs,
            fill: false,
            borderColor: '#FF0000'
        },
    ]
};
this.data2 = {
  labels: this.calorieDate,
  datasets: [
      {
          label: 'Protein',
          data: this.proteins,
          fill: false,
          borderColor: '#003366'
      },
  ]
};
this.data3 = {
  labels: this.calorieDate,
  datasets: [
      {
          label: 'Fats',
          data: this.fats,
          fill: false,
          borderColor: '#660099'
      },
  ]
};
  }
  selectData(event) {
      this.messageService.add({severity: 'info', summary: 'Data Selected',
      'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }
}

