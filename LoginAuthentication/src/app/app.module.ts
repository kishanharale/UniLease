import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListHousesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // Add FormsModule here
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'list-houses', component: ListHousesComponent }  // Add your actual component for the list-houses route
    ])
  ],
  providers: [
    provideHttpClient(withFetch())  // Configure HttpClient to use the fetch API
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
