import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalStatsComponent } from './global-stats/global-stats.component';
import { SpainStatsComponent } from './spain-stats/spain-stats-component';
import { CountriesComponent } from './countries/countries.component';

const routes: Routes = [
  {path:'', component: GlobalStatsComponent},
  {path:'España', component: SpainStatsComponent},
  {path:'Paises', component: CountriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
