import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import provideHttpClient and withFetch

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { DetailsComponent } from './details/details.component'; 
import { AppRoutingModule } from './app-routing.module';
import { FilterByAddressPipe } from './filter-by-address.pipe';
import { FilterByPricePipe } from './filter-by-price.pipe';
import { FilterFavoritesPipe } from './pipes/filter-favorites.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListHousesComponent,
    DetailsComponent,
    FilterByAddressPipe,
    FilterByPricePipe,
    FilterFavoritesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch())  // Configure HttpClient to use fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
