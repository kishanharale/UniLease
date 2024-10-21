import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHousesComponent } from './list-houses/list-houses.component';  // Example component

const routes: Routes = [
  { path: 'houses', component: ListHousesComponent },
  { path: '', redirectTo: '/houses', pathMatch: 'full' }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
