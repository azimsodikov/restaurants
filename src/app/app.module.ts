import { RestaurantService } from './shared/restaurant.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListContainerComponent } from './list/list-container/list-container.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DetailsComponent } from './list/details/details.component';
import { DetailsContainerComponent } from './list/details-container/details-container.component';
import { CoordinatesComponent } from './list/coordinates/coordinates.component';
@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    ListContainerComponent,
    HeaderComponent,
    FooterComponent,
    DetailsComponent,
    DetailsContainerComponent,
    CoordinatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
