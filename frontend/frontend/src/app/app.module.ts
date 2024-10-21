import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <-- Add this line
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListHousesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  // <-- Add FormsModule here
  ],
  providers: [
    provideHttpClient(withFetch()) // Use HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
