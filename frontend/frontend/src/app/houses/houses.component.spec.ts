import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HousesComponent } from './houses.component';

describe('HousesComponent', () => {
  let component: HousesComponent;
  let fixture: ComponentFixture<HousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],  // Import necessary modules
      declarations: [HousesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 5 houses', () => {
    expect(component.houses.length).toBe(5);
  });

  it('should initially display all houses in filteredHouses', () => {
    expect(component.filteredHouses.length).toBe(5);
    expect(component.filteredHouses).toEqual(component.houses);
  });

  it('should filter houses by search term', () => {
    component.searchTerm = 'studio';  // Set search term
    component.filterHouses();  // Trigger the filtering
    expect(component.filteredHouses.length).toBe(2);  // Only 'studio' houses should be filtered
    expect(component.filteredHouses[0].title).toContain('Studio');
    expect(component.filteredHouses[1].title).toContain('Studio');
  });

  it('should filter houses by price range', () => {
    component.selectedMinPrice = 1000;  // Set minimum price
    component.selectedMaxPrice = 2000;  // Set maximum price
    component.filterHouses();  // Trigger the filtering
    expect(component.filteredHouses.length).toBe(1);  // Only one house falls within this range
    expect(component.filteredHouses[0].price).toBe(1200);  // The 'Spacious House' should be filtered
  });

  it('should filter houses by both search term and price range', () => {
    component.searchTerm = 'studio';  // Set search term
    component.selectedMinPrice = 100;  // Set minimum price
    component.selectedMaxPrice = 600;  // Set maximum price
    component.filterHouses();  // Trigger the filtering
    expect(component.filteredHouses.length).toBe(1);  // Only one 'Budget Studio' within price range
    expect(component.filteredHouses[0].title).toContain('Budget Studio');
  });

  it('should reset the filteredHouses when no search term is entered', () => {
    component.searchTerm = '';  // Empty search term
    component.filterHouses();  // Trigger the filtering
    expect(component.filteredHouses.length).toBe(5);  // All houses should be visible
  });

  it('should reset the filteredHouses when price range includes all houses', () => {
    component.selectedMinPrice = 0;  // Minimum price
    component.selectedMaxPrice = 3000;  // Maximum price
    component.filterHouses();  // Trigger the filtering
    expect(component.filteredHouses.length).toBe(5);  // All houses should be visible
  });

  it('should alert when viewHouse is called', () => {
    spyOn(window, 'alert');
    component.viewHouse(1);  // Call viewHouse with house ID
    expect(window.alert).toHaveBeenCalledWith('Viewing house: 1');  // Check if alert is called
  });
});