import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Import RouterOutlet module

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // Import RouterOutlet directly
  template: `<router-outlet></router-outlet>`,  // Render the routed components
  styleUrls: ['./app.component.css']  // Use .css as per your project setup
})
export class AppComponent {
  title = 'UniLease House Details';
}
