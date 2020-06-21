import { Component, OnInit, ViewChild } from '@angular/core';
import { Covid19ApiService } from '../covid19-api.service';
import {MatSort} from '@angular/material/sort';
import { interval } from 'rxjs';
import {MatTableDataSource, MatTable} from '@angular/material/table';

export interface tableA {
  fecha: string;
  infectados: number;
  muertes: number;
  curados: number;
}

var ELEMENT_DATA: tableA[] = [];

@Component({
  selector: 'app-spain-stats',
  templateUrl: './spain-stats-component.html',
  styleUrls: ['./spain-stats-component.css']
  
})
export class SpainStatsComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  spain;
  date;
  date2;
  dateArray;
  breakpoint;
  tableColumns :  string[] = ['date','infectados', 'muertes', 'curados'];
  constructor(
    private covid19ApiService: Covid19ApiService) {}

@ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit(): void {
    this.covid19ApiService.getSpain().subscribe((data)=>{
      this.spain = data[ Object.keys(data).length-1];
      console.log(this.spain)
      });
      this.dataSource.sort = this.sort;
    }
    onResize(event) {
      this.breakpoint = (event.target.innerWidth <= 1650) ? 1 : 2;
    }
    onLoadBody(event){
      this.breakpoint = (event.target.innerWidth <= 1650) ? 1 : 2;
    }
    getDate1Data(event){
      console.log(event)
      this.date=event.getFullYear()+'-'+("0"+(event.getMonth()+1)).slice(-2)+'-'+("0" + event.getDate()).slice(-2)
      if (this.date2!=null){
        this.dateArray=[]
        ELEMENT_DATA=[]
        this.covid19ApiService.getSpainDates(this.date, this.date2).subscribe((data)=>{
          for (var i=0;i<Object.keys(data).length;i++){
            this.dateArray[i]={"infectados":(data[i]["Cases"])}
          }
        });
        this.covid19ApiService.getSpainDatesDeath(this.date, this.date2).subscribe((data)=>{
          for (var i=0;i<Object.keys(this.dateArray).length;i++){
            this.dateArray[i]={"muertes":(data[i]["Cases"]), "infectados":this.dateArray[i]["infectados"]}
          }
        });
        this.covid19ApiService.getSpainDatesRecover(this.date, this.date2).subscribe((data)=>{
          for (var i=0;i<Object.keys(this.dateArray).length;i++){
            this.dateArray[i]={"recuperados":(data[i]["Cases"]), "infectados":this.dateArray[i]["infectados"], "muertes":this.dateArray[i]["muertes"]}
            ELEMENT_DATA.push({fecha: (data[i]["Date"].split('T')[0]),infectados: this.dateArray[i]["infectados"],muertes: this.dateArray[i]["muertes"],curados: this.dateArray[i]["recuperados"]})
          }
        });
        console.log(ELEMENT_DATA)
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
      }
    }
    getDate2Data(event){
      console.log(event)
      this.date2=event.getFullYear()+'-'+("0"+(event.getMonth()+1))+'-'+("0" + event.getDate()).slice(-2)
      if (this.date!=null){
        this.dateArray=[]
        ELEMENT_DATA=[]
        this.covid19ApiService.getSpainDates(this.date, this.date2).subscribe((data)=>{
          for (var i=0;i<Object.keys(data).length;i++){
            this.dateArray[i]={"infectados":(data[i]["Cases"])}
          }
        });
        this.covid19ApiService.getSpainDatesDeath(this.date, this.date2).subscribe((data)=>{
          for (var i=0;i<Object.keys(this.dateArray).length;i++){
            this.dateArray[i]={"muertes":(data[i]["Cases"]), "infectados":this.dateArray[i]["infectados"]}
          }
        });
        this.covid19ApiService.getSpainDatesRecover(this.date, this.date2).subscribe((data)=>{
          for (var i=0;i<Object.keys(this.dateArray).length;i++){
            this.dateArray[i]={"recuperados":(data[i]["Cases"]), "infectados":this.dateArray[i]["infectados"], "muertes":this.dateArray[i]["muertes"]}
            ELEMENT_DATA.push({fecha: (data[i]["Date"].split('T')[0]),infectados: this.dateArray[i]["infectados"],muertes: this.dateArray[i]["muertes"],curados: this.dateArray[i]["recuperados"]})
          }
        });
        console.log(ELEMENT_DATA)
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
      }
    }
}