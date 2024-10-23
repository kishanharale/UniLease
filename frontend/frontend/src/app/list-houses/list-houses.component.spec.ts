import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListHousesComponent } from './list-houses.component';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ListHousesComponent', () => {
  let component: ListHousesComponent;
  let fixture: ComponentFixture<ListHousesComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListHousesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHousesComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges(); // Trigger initial data binding
  });

  // Test case: Should create the component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case: Should fetch apartments data on initialization
  it('should fetch apartments on ngOnInit', () => {
    const mockApartments = [
      { id: 1, name: 'Apartment 1', price: 1000 },
      { id: 2, name: 'Apartment 2', price: 2000 },
    ];

    // Spy on the getApartments method and return mock data
    spyOn(component, 'getApartments').and.returnValue(of(mockApartments));

    component.ngOnInit(); // Call ngOnInit to trigger the data fetching

    expect(component.getApartments).toHaveBeenCalled(); // Check that the method was called
    expect(component.apartments.length).toBe(2); // Check the number of apartments
    expect(component.apartments).toEqual(mockApartments); // Check if the data matches the mock
  });

  // Test case: Should handle error when fetching apartments fails
  it('should handle error when fetching apartments fails', () => {
    const mockError = new ErrorEvent('Network error');

    // Spy on the getApartments method and simulate an error response
    spyOn(component, 'getApartments').and.returnValue(throwError(() => mockError));

    component.ngOnInit(); // Call ngOnInit to trigger the data fetching

    expect(component.errorMessage).toBe('Error fetching apartments. Please try again later.'); // Check if the error message is set correctly
  });

  // Test case: Should call the HTTP GET method with Authorization header
  it('should make a GET request with Authorization header', () => {
    const mockApartments = [
      { id: 1, name: 'Apartment 1', price: 1000 },
      { id: 2, name: 'Apartment 2', price: 2000 },
    ];

    // Spy on the get method of HttpClient to check if it's called with the correct URL
    spyOn(httpClient, 'get').and.returnValue(of(mockApartments));

    component.getApartments().subscribe((apartments) => {
      expect(apartments).toEqual(mockApartments);
    });

    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/apartments', {
      headers: jasmine.anything(), // Check if headers were passed
    });
  });
});