import { Component, OnInit } from '@angular/core';
import { Covid19ApiService } from '../covid19-api.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-global-stats',
  templateUrl: './global-stats.component.html',
  styleUrls: ['./global-stats.component.css']
})
export class GlobalStatsComponent implements OnInit {
  global;
  breakpoint;
  constructor(
    private covid19ApiService: Covid19ApiService) {}

  ngOnInit(): void {
    this.covid19ApiService.getGlobal().subscribe((data)=>{
      console.log(data)
      this.global = data
      console.log(this.global)
      });
    interval(5000).subscribe(x => {
      this.covid19ApiService.getGlobal().subscribe((data)=>{
        this.global = data
        });
      });
    }
    onResize(event) {
      this.breakpoint = (event.target.innerWidth <= 1650) ? 1 : 2;
    }
    onLoadBody(event){
      this.breakpoint = (event.target.innerWidth <= 1650) ? 1 : 2;
    }
  }

