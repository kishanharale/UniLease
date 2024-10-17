import { bootstrapApplication } from '@angular/platform-browser';
import { HouseDetailsComponent } from './app/house-details/house-details.component';

bootstrapApplication(HouseDetailsComponent)
  .catch(err => console.error(err));
