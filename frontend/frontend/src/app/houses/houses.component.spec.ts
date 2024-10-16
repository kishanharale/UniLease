import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousesComponent } from './houses.component';
import { By } from '@angular/platform-browser';

describe('HousesComponent', () => {
  let component: HousesComponent;
  let fixture: ComponentFixture<HousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesComponent],  // Import standalone component here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesComponent);  // Create the component
    component = fixture.componentInstance;  // Get the component instance
    fixture.detectChanges();  // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();  // Check if component is created
  });

  it('should display the correct number of houses initially', () => {
    const houseElements = fixture.debugElement.queryAll(By.css('.house'));
    expect(houseElements.length).toBe(component.houses.length);
  });

  it('should filter houses by search term', () => {
    component.searchTerm = 'Luxury';  // Set search term
    component.filterHouses();  // Apply filter
    fixture.detectChanges();

    const filteredHouseElements = fixture.debugElement.queryAll(By.css('.house'));
    expect(filteredHouseElements.length).toBe(1);
    expect(filteredHouseElements[0].nativeElement.textContent).toContain('Luxury Condo');
  });

  it('should filter houses by price range', () => {
    component.selectedMinPrice = 1000;
    component.selectedMaxPrice = 2000;
    component.filterHouses();  // Apply filter
    fixture.detectChanges();

    const filteredHouseElements = fixture.debugElement.queryAll(By.css('.house'));
    expect(filteredHouseElements.length).toBe(1);
    expect(filteredHouseElements[0].nativeElement.textContent).toContain('Spacious House');
  });

  it('should call viewHouse method when a house is clicked', () => {
    spyOn(component, 'viewHouse');  // Spy on the viewHouse method

    const houseElement = fixture.debugElement.query(By.css('.house'));
    houseElement.triggerEventHandler('click', null);  // Simulate click

    expect(component.viewHouse).toHaveBeenCalled();
  });
});