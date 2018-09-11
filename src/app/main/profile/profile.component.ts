import { Component, OnInit, EventEmitter  } from '@angular/core';
import {MessageService} from 'primeng/api';
import {DataService } from '../../Services/data-service.service';
import {AuthService  } from '../../Services/auth-service.service';
import {MaterializeAction} from 'angular2-materialize';
interface Users {
  name: String;
  email: String;
  height: String;
  weight: String;
  age: String;
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
z1 = false;
chartmonth;
updateWeight;
modalActions = new EventEmitter<string|MaterializeAction>();
display = false;



weightDisplay;
  constructor(private data: DataService, private messageService: MessageService, private auth: AuthService) { }

  ngOnInit() {
    this.data.getUserData(this.auth.userdetails.email);
    this.data.userdetails.subscribe(a => {
      this.z1 = true;
      this.userdetails = a;

      this.abc = this.userdetails.weight.split(',');
      this.chartmonth = this.userdetails.updatedWeightMonth.split(',');
      this.weightDisplay = this.abc[this.abc.length - 1 ];
      console.log(this.abc.length);
      this.chart();
    });
    //this.weightDisplay = this.userdetails.weight;
  }
  showDialog() {
    this.display = true;
}
  update() {
    console.log(this.userdetails);
    this.data.updateUserData(this.userdetails.email, this.userdetails);
  }
  openModal(x) {
    if(x === 1 ) { this.z1 = true;} else { this.z1 = false;}
    this.modalActions.emit({action:"modal",params:['open']});
    console.log(x);
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  weightUpdate() {
    this.display = false;
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
