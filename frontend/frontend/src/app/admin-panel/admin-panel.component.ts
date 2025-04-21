import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  [x: string]: any;
  house = {
    name: '',
    address: '',
    university_id: 1,
    price: 0,
    image_url: ''
  };

  constructor(private http: HttpClient) {}

  addHouse(): void {
    // Ensure price is not negative
    if (typeof this.house.price !== 'number' || this.house.price < 0) {
      alert('Price cannot be negative. Please enter a valid price.');
      this.house.price = 0;
      return;
    }

    // Send house data to the backend service
    this.http.post('http://localhost:3000/api/addhouse',this.house).subscribe(
      (response) => {
        alert('House added successfully!');
        // Reset the form fields after successful submission
        this.house = { name: '', address: '', university_id: 1, price: 0, image_url: '' };
      },
      (error) => {
        console.error('Error adding house:', error);
        alert('Failed to add house.');
      }
    );
  }
}
