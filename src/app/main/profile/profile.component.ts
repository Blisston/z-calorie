import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DataService } from '../../Services/data-service.service';
interface Users {
  name: String;
  email: String;
  height: String;
  weight: String;
  updatedWeightMonth?: String;
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
chartdata;
abc;
chartmonth;
updateWeight;
weightDisplay;
  constructor(private data: DataService, private messageService: MessageService) { }

  ngOnInit() {
    this.data.userdetails.subscribe(a => {
      this.userdetails = a;
      this.abc = this.userdetails.weight.split(',');
      this.chartmonth = this.userdetails.updatedWeightMonth.split(',');
      this.weightDisplay = this.abc[this.abc.length - 1 ];
      console.log(this.abc.length);
      this.chart();
    });
  }
  update() {
    console.log(this.userdetails);
    this.data.updateUserData(this.userdetails.email, this.userdetails);
  }
  weightUpdate() {
    const monthNames = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
  'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

    console.log(this.userdetails.updatedWeightMonth);
    let x = this.userdetails.weight;
    let y = this.userdetails.updatedWeightMonth;
    this.userdetails.weight = x + `,${this.updateWeight}` ;
    const d = new Date();
    const date = d.getDate() +  monthNames[d.getMonth()];
    const t = ( y + `,${date}`);
    this.userdetails.updatedWeightMonth = t;
    this.abc = this.userdetails.weight.split(',');
  this.chartmonth = this.userdetails.updatedWeightMonth.split(',');

    console.log(this.userdetails);
    this.chart();
    this.data.updateUserData(this.userdetails.email, this.userdetails);
  }
  chart() {
    this.chartdata = {
      labels: this.chartmonth,
      datasets: [
          {
              label: 'Weight',
              data: this.abc,
              fill: false,
              borderColor: '#4bc0c0'
          },
      ]
  };
  }


selectData(event) {
this.messageService.add({severity: 'info', summary: 'Data Selected',
'detail': this.chartdata.datasets[event.element._datasetIndex].data[event.element._index]});
}

}
