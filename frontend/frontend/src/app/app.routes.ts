import { Routes } from '@angular/router';
import { HousesComponent } from './houses/houses.component';

// Define your routes
export const appRoutes: Routes = [
    { path: 'houses', component: HousesComponent },
    // You can add more routes here as needed, for example:
    // { path: 'profile', component: ProfileComponent },
    // { path: 'settings', component: SettingsComponent },
    { path: '', redirectTo: '/houses', pathMatch: 'full' }, // Redirect to 'houses' as the default route
    { path: '**', redirectTo: '/houses', pathMatch: 'full' } // Wildcard route for a 404 page
];
