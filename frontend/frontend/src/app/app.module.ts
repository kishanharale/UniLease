import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <-- Add this line for template-driven forms
import { provideHttpClient, withFetch } from '@angular/common/http';  // Provide HttpClient with fetch API

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterByAddressPipe } from './filter-by-address.pipe';  // Import the address filter pipe
import { FilterByPricePipe } from './filter-by-price.pipe';     // Import the price filter pipe

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListHousesComponent,
    FilterByAddressPipe,  // Declare FilterByAddressPipe
    FilterByPricePipe     // Declare FilterByPricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  // <-- Add FormsModule to handle [(ngModel)] for form controls
  ],
  providers: [
    provideHttpClient(withFetch())  // Provide HttpClient with fetch API for SSR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
