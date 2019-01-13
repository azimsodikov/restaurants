import { RestaurantService } from './shared/restaurant.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListContainerComponent } from './list/list-container/list-container.component';
import { HeaderComponent } from './shared/header/header.component';
import { DetailsComponent } from './list/details/details.component';
import { CoordinatesComponent } from './list/coordinates/coordinates.component';
import { PhoneNumberPipe } from './shared/phone-number.pipe';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AllCoordinatesComponent } from './list/all-coordinates/all-coordinates.component';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    ListContainerComponent,
    HeaderComponent,
    DetailsComponent,
    CoordinatesComponent,
    PhoneNumberPipe,
    SpinnerComponent,
    AllCoordinatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
