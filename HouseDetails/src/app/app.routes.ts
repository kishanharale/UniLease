import { Routes } from '@angular/router';
import { HouseDetailsComponent } from './house-details/house-details.component';  // Import your house details component

// Define your routes here
export const routes: Routes = [
  { path: 'house/:id', component: HouseDetailsComponent },  // Route for house details with dynamic id
  { path: '', redirectTo: '/house/1', pathMatch: 'full' }    // Default route to house 1 for testing
];
