import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Import the login component
import { ListHousesComponent } from './list-houses/list-houses.component';  // Import the list houses component

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Route for login
  { path: 'houses', component: ListHousesComponent },  // Route for list houses
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route to login
  { path: '**', redirectTo: '/login' }  // Wildcard route for invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
