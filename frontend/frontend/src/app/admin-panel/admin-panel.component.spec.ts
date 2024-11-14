import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminPanelComponent } from './admin-panel.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPanelComponent],
      imports: [HttpClientTestingModule, FormsModule],  // Add FormsModule here
      providers: [HttpClient]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset house details after a successful addHouse call', () => {
    component.house = {
      name: 'Test House',
      address: '123 Test St',
      university_id: 1,
      price: 500,
      image_url: 'test.jpg'
    };

    component.addHouse();

    const req = httpTestingController.expectOne('http://localhost:3000/api/addhouse');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simulate a successful response

    expect(component.house).toEqual({
      name: '',
      address: '',
      university_id: 1,
      price: 0,
      image_url: ''
    });
  });

  it('should show an alert and reset price to 0 if price is negative', () => {
    spyOn(window, 'alert');

    component.house.price = -100;
    component.addHouse();

    expect(window.alert).toHaveBeenCalledWith('Price cannot be negative. Please enter a valid price.');
    expect(component.house.price).toBe(0);
  });

  it('should handle addHouse failure and show an error alert', () => {
    spyOn(window, 'alert');

    component.house = {
      name: 'Test House',
      address: '123 Test St',
      university_id: 1,
      price: 500,
      image_url: 'test.jpg'
    };

    component.addHouse();

    const req = httpTestingController.expectOne('http://localhost:3000/api/addhouse');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));

    expect(window.alert).toHaveBeenCalledWith('Failed to add house.');
  });
});