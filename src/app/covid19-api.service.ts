import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class Covid19ApiService {

  constructor( 
    private httpClient: HttpClient) {}
  public getGlobal(){
    var url = 'https://api.covid19api.com/summary'
    return this
      .httpClient
      .get(`${url}`);
  }
  public getSpain(){
    var url = 'https://api.covid19api.com/live/country/spain'
    return this
      .httpClient
      .get(`${url}`);
  }
  public getSpainDates(date,date2){
    var url = 'https://api.covid19api.com/total/country/spain/status/confirmed?from='+date+'T00:00:00Z&to='+date2+'T00:00:00Z'
    console.log(url)
    return this
      .httpClient
      .get(`${url}`);
  }
  public getSpainDatesDeath(date,date2){
    var url = 'https://api.covid19api.com/total/country/spain/status/deaths?from='+date+'T00:00:00Z&to='+date2+'T00:00:00Z'
    console.log(url)
    return this
      .httpClient
      .get(`${url}`);
  }
  public getSpainDatesRecover(date,date2){
    var url = 'https://api.covid19api.com/total/country/spain/status/recovered?from='+date+'T00:00:00Z&to='+date2+'T00:00:00Z'
    console.log(url)
    return this
      .httpClient
      .get(`${url}`);
  }
}
