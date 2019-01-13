import { AllCoordinatesComponent } from './list/all-coordinates/all-coordinates.component';
import { DetailsComponent } from './list/details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContainerComponent } from './list/list-container/list-container.component';

const routes: Routes = [
  {path: '', component: ListContainerComponent, data: {animation: 'HOME'}},
  {path: 'details', component: DetailsComponent, data: {animation: 'DETAILS'}},
  {path: 'all-coordinates', component: AllCoordinatesComponent},
  {path: '**', component: ListContainerComponent}, // Catches the wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
