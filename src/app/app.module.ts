import { HttpErrorHandler } from './shared/http-error-handler.service';
import { RestaurantService } from './shared/restaurant.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ListItemComponent } from './list/list-container/list-item/list-item.component';
import { ListContainerComponent } from './list/list-container/list-container.component';
import { HeaderComponent } from './shared/header/header.component';
import { DetailsComponent } from './list/details/details.component';
import { CoordinatesComponent } from './list/details/coordinates/coordinates.component';
import { PhoneNumberPipe } from './shared/phone-number.pipe';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AllCoordinatesComponent } from './all-coordinates/all-coordinates.component';
import { MessageService } from './shared/message.service';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    ListContainerComponent,
    HeaderComponent,
    DetailsComponent,
    PhoneNumberPipe,
    SpinnerComponent,
    AllCoordinatesComponent,
    CoordinatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [RestaurantService, HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
