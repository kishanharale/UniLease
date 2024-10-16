import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

interface House {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',  // Your HTML content
  styleUrls: ['./houses.component.css'],   // Your component-specific CSS
  standalone: true,  // Standalone component, no need to add to a module
  imports: [CommonModule, FormsModule]  // Import the necessary Angular modules
})
export class HousesComponent {
  houses: House[] = [
    { id: 1, title: 'Cozy Apartment', location: 'Downtown', price: 800, image: 'assets/images/apartment1.jpeg' },
    { id: 2, title: 'Spacious House', location: 'Suburb', price: 1200, image: 'assets/images/house1.jpeg' },
    { id: 3, title: 'Luxury Condo', location: 'City Center', price: 2500, image: 'assets/images/condo1.jpeg' },
    { id: 4, title: 'Budget Studio', location: 'Outskirts', price: 500, image: 'assets/images/studio1.jpeg' },
    { id: 5, title: 'Mini Studio', location: 'Outskirts', price: 2600, image: 'assets/images/studio2.jpeg' },
  ];

  filteredHouses: House[] = this.houses;
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 3000;
  selectedMinPrice: number = this.minPrice;
  selectedMaxPrice: number = this.maxPrice;

  constructor() {
    this.filteredHouses = this.houses;  // Initially, display all houses
  }

  filterHouses(): void {
    const term = this.searchTerm.toLowerCase();  // Convert search term to lowercase
    this.filteredHouses = this.houses
      .filter(house =>
        // Filter by title or location AND within selected price range
        (house.title.toLowerCase().includes(term) || house.location.toLowerCase().includes(term)) &&
        house.price >= this.selectedMinPrice &&
        house.price <= this.selectedMaxPrice
      );
  }

  onPriceRangeChange(): void {
    this.filterHouses();  // Trigger filtering whenever the price range changes
  }

  viewHouse(houseId: number): void {
    alert('Viewing house: ' + houseId);
    // Add navigation logic here if needed
  }
}
