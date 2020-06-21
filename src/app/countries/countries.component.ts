import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Covid19ApiService } from '../covid19-api.service';
import { interval } from 'rxjs';
import {MatSort} from '@angular/material/sort';
import { cpuUsage } from 'process';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { MAR } from '@angular/material/core';

export interface tableA {
  pais: string;
  infectados: number;
  muertes: number;
  curados: number;
}

var ELEMENT_DATA: tableA[] = [];

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
dataSource = new MatTableDataSource(ELEMENT_DATA);
currentSort=""
max=0
sliderValue=0
tableColumns  :  string[] = ['pais', 'infectados', 'muertes', 'curados'];


@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private covid19ApiService: Covid19ApiService,
            private changeDetectorRefs: ChangeDetectorRef,) { 

            }
  ngOnInit(): void {
    this.covid19ApiService.getGlobal().subscribe((data)=>{
      for (var i=0; i < Object.entries(data["Countries"]).length; i++){
        ELEMENT_DATA.push({pais: data["Countries"][i]["Country"], infectados: data["Countries"][i]["TotalConfirmed"], muertes: data["Countries"][i]["TotalDeaths"], curados: data["Countries"][i]["TotalRecovered"]})
      } 
      this.dataSource.sort = this.sort;
      this.max=Math.max.apply(Math, ELEMENT_DATA.map(function(o) { return o.infectados; }))
      console.log(ELEMENT_DATA[0]["infectados"])
      });
    }
    public onChangeSlider(value){
      this.sliderValue=value
      ELEMENT_DATA=[]
      this.covid19ApiService.getGlobal().subscribe((data)=>{
        for (var i=0; i < Object.entries(data["Countries"]).length; i++){
          if (data["Countries"][i]["TotalConfirmed"]>=value){
            ELEMENT_DATA.push({pais: data["Countries"][i]["Country"], infectados: data["Countries"][i]["TotalConfirmed"], muertes: data["Countries"][i]["TotalDeaths"], curados: data["Countries"][i]["TotalRecovered"]})
          }
        }
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        });
    }
  
  }
  export interface tableA {
    pais: string;
    infectados: number;
    muertes: number;
    curados: number;
  }
