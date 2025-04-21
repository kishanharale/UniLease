import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing components
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { DetailsComponent } from './details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

// Defining routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },                   // Route for login
  { path: 'houses', component: ListHousesComponent },             // Route for listing houses
  { path: 'app-admin-panel', component: AdminPanelComponent },    // Route for admin panel
  { path: 'dashboard', component: DashboardComponent },           // Route for dashboard
  { path: 'house-details/:id', component: DetailsComponent },     // Route for house details

  { path: '', redirectTo: '/login', pathMatch: 'full' },          // Default route redirects to login
  { path: '**', redirectTo: '/login' }                            // Wildcard route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
