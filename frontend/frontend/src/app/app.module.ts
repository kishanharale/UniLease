import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Import provideHttpClient and withFetch

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { DetailsComponent } from './details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AppRoutingModule } from './app-routing.module';
import { FilterByAddressPipe } from './filter-by-address.pipe';
import { FilterByPricePipe } from './filter-by-price.pipe';
import { FilterFavoritesPipe } from './pipes/filter-favorites.pipe';

// AngularFire imports (use compat version for compatibility with older modules)
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    LoginComponent,
    ListHousesComponent,
    DetailsComponent,
    DashboardComponent,
    FilterByAddressPipe,
    FilterByPricePipe,
    FilterFavoritesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,           // Routing module
    FormsModule,                 // For template-driven forms and ngModel
    ReactiveFormsModule,         // For reactive forms
    HttpClientModule,            // For making HTTP requests
    AngularFireModule.initializeApp(environment.firebaseConfig), // Firebase initialization
    AngularFireAuthModule,       // Firebase Authentication module
    AngularFireAnalyticsModule   // Firebase Analytics module (optional)
  ],
  providers: [
    provideHttpClient(withFetch()) // Enables `fetch` API for SSR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
