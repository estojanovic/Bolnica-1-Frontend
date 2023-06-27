import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CovidServiceService} from "../../../../services/covid-service/covid-service.service";
import {SnackbarServiceService} from "../../../../services/snackbar-service.service";
import { ChartData } from 'src/app/models/laboratory/Prescription';

@Component({
  selector: 'app-nurse-covid-statistics',
  templateUrl: './nurse-covid-statistics.component.html',
  styleUrls: ['./nurse-covid-statistics.component.css']
})
export class NurseCovidStatisticsComponent  implements OnInit {

  numberOfTestedPatients : number;
  numberOfHospitalizedPatients : number;
  numberOfPositivePatients : number;
  numberOfCuredPatients : number;
  numberOfPatientsOnRespirator : number;
  numberOfDeadPatients : number;

  todayDate: Date = new Date();

  single: ChartData[];
  view: [number, number] = [700, 400];
  pieChartDimensions: [number, number] = [400, 400];
  barChartSingle: ChartData[];
  testedPieChartData: ChartData[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tip';
  showYAxisLabel = true;
  yAxisLabel = 'Broj';

  colorScheme = 'vivid';

  constructor(private router: Router,
              private covidService: CovidServiceService,
              private snackBar: SnackbarServiceService) {

    this.numberOfTestedPatients = 43;
    this.numberOfHospitalizedPatients = 1200;
    this.numberOfPositivePatients = 20;
    this.numberOfCuredPatients = 245;
    this.numberOfPatientsOnRespirator = 823;
    this.numberOfDeadPatients = 40;
    
    this.single = [
        {
          "name": "Broj testiranih",
          "value": this.numberOfTestedPatients
        },
        {
          "name": "Broj hospitalizovanih",
          "value": this.numberOfHospitalizedPatients
        },
        {
          "name": "Broj pozitivnih",
          "value": this.numberOfPositivePatients
        },
        {
          "name": "Broj izlečenih",
          "value": this.numberOfCuredPatients
        },
        {
          "name": "Broj na respiratoru",
          "value": this.numberOfPatientsOnRespirator
        },
        {
          "name": "Broj umrlih",
          "value": this.numberOfDeadPatients
        }
      ];
      this.testedPieChartData = [
        {
          name: "Pozitivni pacijenti",
          value: this.numberOfPositivePatients
        },
        {
          name: "Negativni pacijenti",
          value: this.numberOfTestedPatients - this.numberOfPositivePatients
        }
      ];
      this.barChartSingle = [
        {
          "name": "Broj hospitalizovanih",
          "value": this.numberOfHospitalizedPatients
        },
        {
          "name": "Broj izlečenih",
          "value": this.numberOfCuredPatients
        },
        {
          "name": "Broj na respiratoru",
          "value": this.numberOfPatientsOnRespirator
        },
        {
          "name": "Broj umrlih",
          "value": this.numberOfDeadPatients
        }
      ];
  }


  ngOnInit(): void {
    this.fillData();
  }

  fillData(): void{
    this.covidService.getStats(new Date()).subscribe(res=>{
      this.numberOfTestedPatients = res.numberOfTestedPatients;
      this.numberOfHospitalizedPatients = res.numberOfHospitalizedPatients;
      this.numberOfPositivePatients = res.numberOfPositivePatients;
      this.numberOfCuredPatients = res.numberOfCuredPatients;
      this.numberOfPatientsOnRespirator = res.numberOfPatientsOnRespirator;
      this.numberOfDeadPatients = res.numberOfDeadPatients;
      this.single = [
        {
          "name": "Broj testiranih",
          "value": this.numberOfTestedPatients
        },
        {
          "name": "Broj hospitalizovanih",
          "value": this.numberOfHospitalizedPatients
        },
        {
          "name": "Broj pozitivnih",
          "value": this.numberOfPositivePatients
        },
        {
          "name": "Broj izlečenih",
          "value": this.numberOfCuredPatients
        },
        {
          "name": "Broj na respiratoru",
          "value": this.numberOfPatientsOnRespirator
        },
        {
          "name": "Broj umrlih",
          "value": this.numberOfDeadPatients
        }
      ];
      this.testedPieChartData = [
        {
          name: "Pozitivni pacijenti",
          value: this.numberOfPositivePatients
        },
        {
          name: "Negativni pacijenti",
          value: this.numberOfTestedPatients - this.numberOfPositivePatients
        }
      ];
      this.barChartSingle = [
        {
          "name": "Broj hospitalizovanih",
          "value": this.numberOfHospitalizedPatients
        },
        {
          "name": "Broj izlečenih",
          "value": this.numberOfCuredPatients
        },
        {
          "name": "Broj na respiratoru",
          "value": this.numberOfPatientsOnRespirator
        },
        {
          "name": "Broj umrlih",
          "value": this.numberOfDeadPatients
        }
      ];
    },err => {
      this.snackBar.openErrorSnackBar("Greska!")
    })
  }

}
