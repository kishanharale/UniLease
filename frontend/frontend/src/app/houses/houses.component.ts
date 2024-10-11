import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

interface House {
    id: number;
    title: string;
    location: string;
    price: string;
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
        { id: 1, title: 'Cozy Apartment', location: 'Downtown', price: '$800/month', image: 'assets/images/apartment1.jpg' },
        { id: 2, title: 'Spacious House', location: 'Suburb', price: '$1200/month', image: 'assets/images/house1.jpg' }
        // Add more house data here
    ];
    filteredHouses: House[] = this.houses;
    searchTerm: string = '';

    filterHouses(): void {
        const term = this.searchTerm.toLowerCase();
        this.filteredHouses = this.houses.filter(house => 
            house.title.toLowerCase().includes(term) || 
            house.location.toLowerCase().includes(term)
        );
    }

    viewHouse(houseId: number): void {
        alert('Viewing house: ' + houseId);
        // Add routing or navigation logic here if needed
    }
}
