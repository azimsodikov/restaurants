import { DetailsComponent } from './list/details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContainerComponent } from './list/list-container/list-container.component';

const routes: Routes = [
  {path: '', component: ListContainerComponent},
  {path: 'details', component: DetailsComponent, data: {somedata: 'somedata'}},
  {path: '**', component: ListContainerComponent}, // Catches the wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
