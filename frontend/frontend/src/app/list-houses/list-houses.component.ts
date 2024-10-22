import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css']
})
export class ListHousesComponent implements OnInit {
  apartments: any[] = [];  // Array to hold the fetched apartments data
  errorMessage: string = '';  // Variable to hold error messages
  maxPrice: number = 5000;  // Default max price
  searchQuery: string = '';  // Search query for filtering

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getApartments().subscribe(
      (data) => {
        console.log('Fetched apartments:', data);  // Log the data to check if it's correctly fetched
        this.apartments = data;
      },
      (error) => {
        console.error('Error fetching apartments:', error);
        this.errorMessage = 'Error fetching apartments. Please try again later.';
      }
    );
  }

  // Function to fetch apartments with proper Authorization headers
  getApartments(): Observable<any[]> {
    let token: string = '';

    // Check if window and localStorage exist (to ensure it's running in the browser)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      token = localStorage.getItem('authToken') || '';  // Default to an empty string if the token is null
    }

    // Create Authorization headers only if the token is available
    const headers = token
      ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      : new HttpHeaders();

    // Make the GET request to fetch apartments with Authorization headers if applicable
    return this.http.get<any[]>('http://localhost:3000/apartments', { headers });
  }
}
