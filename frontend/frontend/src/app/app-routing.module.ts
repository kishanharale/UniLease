import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { DetailsComponent } from './details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';  // Import the dashboard component
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },              // Route for login
  { path: 'houses', component: ListHousesComponent },        // Route for list houses
  {path: 'app-admin-panel', component: AdminPanelComponent},
  { path: 'dashboard', component: DashboardComponent }, // Route for dashboard
  { path: 'house-details/:id', component: DetailsComponent }, // Route for house details
       
  { path: '', redirectTo: '/login', pathMatch: 'full' },     // Default route to login
  { path: '**', redirectTo: '/login' }                       // Wildcard route for invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
