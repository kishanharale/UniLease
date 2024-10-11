import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

interface House {
    id: number;
    title: string;
    location: string;
    price: number; // Change price to a number for filtering purposes
    image: string;
}

@Component({
    selector: 'app-houses',
    templateUrl: './houses.component.html',
    styleUrls: ['./houses.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]  // Include FormsModule here
})
export class HousesComponent {
    houses: House[] = [
        { id: 1, title: 'Cozy Apartment', location: 'Downtown', price: 800, image: 'assets/images/apartment1.jpg' },
        { id: 2, title: 'Spacious House', location: 'Suburb', price: 1200, image: 'assets/images/house1.jpg' },
        { id: 3, title: 'Luxury Condo', location: 'City Center', price: 2500, image: 'assets/images/condo1.jpg' },
        { id: 4, title: 'Budget Studio', location: 'Outskirts', price: 500, image: 'assets/images/studio1.jpg' },
        { id: 5, title: 'Mini Studio', location: 'Outskirts', price: 2600, image: 'assets/images/studio1.jpg' },
        // Add more house data here
    ];
    filteredHouses: House[] = this.houses;
    searchTerm: string = '';
    minPrice: number = 0;
    maxPrice: number = 3000;
    selectedMinPrice: number = 0;
    selectedMaxPrice: number = 3000;

    constructor() {
        this.filteredHouses = this.houses;
    }

    filterHouses(): void {
        const term = this.searchTerm.toLowerCase();
        this.filteredHouses = this.houses
            .filter(house =>
                (house.title.toLowerCase().includes(term) || house.location.toLowerCase().includes(term)) &&
                house.price >= this.selectedMinPrice &&
                house.price <= this.selectedMaxPrice
            );
    }

    onPriceRangeChange(): void {
        this.filterHouses();
    }

    viewHouse(houseId: number): void {
        alert('Viewing house: ' + houseId);
        // Add routing or navigation logic here if needed
    }
}
