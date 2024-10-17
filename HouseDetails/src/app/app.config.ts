import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Import the routes from a separate file

export const appConfig = [
  provideRouter(routes),  // Provide router configuration at the application bootstrap level
];
