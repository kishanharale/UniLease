import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // Root component
import { ListHousesComponent } from './list-houses/list-houses.component';  // List houses component
import { AppRoutingModule } from './app-routing.module';  // Routing module
import { provideHttpClient } from '@angular/common/http';  // Provide HttpClient

@NgModule({
  declarations: [
    AppComponent,
    ListHousesComponent  // Declare ListHousesComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // Import the routing module
  ],
  providers: [
    provideHttpClient()  // Provide HttpClient for the whole app
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
