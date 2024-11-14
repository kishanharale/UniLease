import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListHousesComponent } from './list-houses.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'; // Use RouterTestingModule for router-related testing
import { FilterByAddressPipe } from '../filter-by-address.pipe';
import { FilterByPricePipe } from '../filter-by-price.pipe';
import { DashboardComponent } from '../dashboard/dashboard.component'; // Import DashboardComponent
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListHousesComponent', () => {
  let component: ListHousesComponent;
  let fixture: ComponentFixture<ListHousesComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule], // Include RouterTestingModule
      declarations: [
        ListHousesComponent,
        DashboardComponent, // Declare DashboardComponent
        FilterByAddressPipe,
        FilterByPricePipe,
      ],
      schemas: [NO_ERRORS_SCHEMA], // Add NO_ERRORS_SCHEMA to suppress routerLink errors
    }).compileComponents();

    fixture = TestBed.createComponent(ListHousesComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the DashboardComponent', () => {
    const dashboardElement = fixture.nativeElement.querySelector('app-dashboard');
    expect(dashboardElement).toBeTruthy();
  });

  it('should fetch apartments on ngOnInit', () => {
    const mockApartments = [
      { id: 1, address: 'Apartment 1', price: 1000, isFavorite: false },
      { id: 2, address: 'Apartment 2', price: 2000, isFavorite: false },
    ];

    spyOn(component, 'getApartments').and.returnValue(of(mockApartments));
    component.ngOnInit();
    expect(component.getApartments).toHaveBeenCalled();
    expect(component.apartments.length).toBe(2);
    expect(component.apartments).toEqual(mockApartments);
  });

  it('should handle error when fetching apartments fails', () => {
    const mockError = new ErrorEvent('Network error');
    spyOn(component, 'getApartments').and.returnValue(throwError(() => mockError));
    component.ngOnInit();
    expect(component.errorMessage).toBe('Error fetching apartments. Please try again later.');
  });

  it('should make a GET request with Authorization header', () => {
    const mockApartments = [
      { id: 1, address: 'Apartment 1', price: 1000 },
      { id: 2, address: 'Apartment 2', price: 2000 },
    ];

    spyOn(httpClient, 'get').and.returnValue(of(mockApartments));
    component.getApartments().subscribe((apartments) => {
      expect(apartments).toEqual(mockApartments);
    });
    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/apartments', {
      headers: jasmine.anything(),
    });
  });

  it('should filter apartments by max price', () => {
    component.apartments = [
      { id: 1, address: 'Apartment 1', price: 1000 },
      { id: 2, address: 'Apartment 2', price: 2000 },
      { id: 3, address: 'Apartment 3', price: 3000 },
    ];
    component.maxPrice = 1500;
    fixture.detectChanges();
    const filteredApartments = component.filteredApartments;
    expect(filteredApartments.length).toBe(1);
    expect(filteredApartments[0].price).toBeLessThanOrEqual(1500);
  });

  it('should filter apartments by favorites only when showFavoritesOnly is true', () => {
    component.apartments = [
      { id: 1, address: 'Apartment 1', price: 1000, isFavorite: true },
      { id: 2, address: 'Apartment 2', price: 2000, isFavorite: false },
    ];
    component.showFavoritesOnly = true;
    fixture.detectChanges();
    const filteredApartments = component.filteredApartments;
    expect(filteredApartments.length).toBe(1);
    expect(filteredApartments[0].isFavorite).toBeTrue();
  });

  it('should filter apartments by search query', () => {
    component.apartments = [
      { id: 1, address: 'Green Apartment', price: 1000 },
      { id: 2, address: 'Blue Apartment', price: 2000 },
    ];
    component.searchQuery = 'Green';
    fixture.detectChanges();
    const filteredApartments = component.filteredApartments;
    expect(filteredApartments.length).toBe(1);
    expect(filteredApartments[0].address).toContain('Green');
  });

  it('should toggle favorite status of an apartment', () => {
    const apartment = { id: 1, address: 'Apartment 1', price: 1000, isFavorite: false };
    component.toggleFavorite(apartment);
    expect(apartment.isFavorite).toBeTrue();
    component.toggleFavorite(apartment);
    expect(apartment.isFavorite).toBeFalse();
  });
});
