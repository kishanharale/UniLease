import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrap the application using AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
