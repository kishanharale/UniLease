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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch apartments when the component is initialized
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

  // Function to fetch apartments from the backend
  getApartments(): Observable<any[]> {
    // Get the JWT token from localStorage (or wherever you're storing it after login)
    const token = localStorage.getItem('authToken');

    // Set the Authorization header with the JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ensure the token is passed in the request headers
    });

    // Make the HTTP GET request with the Authorization header
    return this.http.get<any[]>('http://localhost:3000/apartments', { headers });
  }
}
