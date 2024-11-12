import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css']
})
export class ListHousesComponent implements OnInit {
  apartments: any[] = [];           // Array to hold the fetched apartments data
  errorMessage: string = '';         // Variable to hold error messages
  maxPrice: number = 5000;           // Default max price
  searchQuery: string = '';          // Search query for filtering
  showFavoritesOnly: boolean = false; // Toggle to show only favorites

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getApartments().subscribe(
      (data) => {
        console.log('Fetched apartments:', data); // Log the data to check if it's correctly fetched
        this.apartments = data.map(apartment => ({
          ...apartment,
          isFavorite: apartment.isFavorite || false // Initialize isFavorite based on fetched data
        }));
      },
      (error) => {
        console.error('Error fetching apartments:', error);
        this.errorMessage = 'Error fetching apartments. Please try again later.';
      }
    );
  }

  // Function to fetch apartments with proper Authorization headers
  getApartments(): Observable<any[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();

    return this.http.get<any[]>('http://localhost:3000/apartments', { headers });
  }

  // Retrieve token from localStorage
  private getToken(): string {
    return (typeof window !== 'undefined' && typeof localStorage !== 'undefined') 
      ? localStorage.getItem('authToken') || ''
      : '';
  }

  // Toggle favorite status of an apartment
  toggleFavorite(apartment: any): void {
    const previousStatus = apartment.isFavorite;
    apartment.isFavorite = !apartment.isFavorite;

    this.updateFavoriteStatus(apartment).subscribe(
      (response) => {
        console.log('Favorite status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating favorite status:', error);
        apartment.isFavorite = previousStatus; // Revert status on error
        this.errorMessage = 'Failed to update favorite status. Please try again.';
      }
    );
  }

  // Function to update favorite status in the backend
  updateFavoriteStatus(apartment: any): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    
    return this.http.post('http://localhost:3000/favorites', { 
      houseId: apartment.id, 
      isFavorite: apartment.isFavorite 
    }, { headers });
  }

  // Filter apartments based on price, search query, and favorite status
  get filteredApartments(): any[] {
    return this.apartments
      .filter(apartment => apartment.price <= this.maxPrice)
      .filter(apartment => 
        apartment.address.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .filter(apartment => 
        !this.showFavoritesOnly || apartment.isFavorite
      );
  }
}
