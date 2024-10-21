import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListHousesComponent } from './list-houses/list-houses.component';

const routes: Routes = [{ path: '', component: LoginComponent },  // Default route
  { path: 'list-houses', component:ListHousesComponent }  // Route to dashboard
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
    

})
export class AppRoutingModule { }
