import { ComponentFixture, TestBed, tick,fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';
import { DetailsComponent } from './details.component';

describe('HouseDetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Import FormsModule to handle ngModel
      declarations: [DetailsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the property details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Steelcote Square');
    expect(compiled.querySelector('.address').textContent).toContain('812 S Theresa Ave');
    expect(compiled.querySelector('.price-range').textContent).toContain('$1215.00 - $2280.00');
  });

  it('should add a new review', () => {
    component.newReview = {
      user: 'Alice',
      comment: 'Amazing property!',
      rating: 5,
    };

    component.addReview();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const reviews = compiled.querySelectorAll('.review');
    expect(reviews.length).toBe(3); // Initial 2 reviews + 1 new review
    expect(reviews[2].textContent).toContain('Amazing property!');
  });

  it('should not add a review if any field is empty', () => {
    component.newReview = {
      user: '',
      comment: 'Amazing property!',
      rating: 5,
    };

    component.addReview();
    fixture.detectChanges();

    const reviews = fixture.nativeElement.querySelectorAll('.review');
    expect(reviews.length).toBe(2); // No new review added
  });

  it('should open the lightbox when an image is clicked', () => {
    const testImage = 'assets/images/photo3.png';
    component.openLightbox(testImage);

    expect(component.isLightboxOpen).toBeTruthy();
    expect(component.currentImage).toBe(testImage);
  });

  it('should close the lightbox when closeLightbox is called', () => {
    component.isLightboxOpen = true;
    component.closeLightbox();

    expect(component.isLightboxOpen).toBeFalsy();
  });

  it('should reset the contact form after sending a message', () => {
    component.contactForm = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'I am interested in this property',
    };

    component.sendMessage();
    fixture.detectChanges();

    expect(component.contactForm.name).toBe('');
    expect(component.contactForm.email).toBe('');
    expect(component.contactForm.message).toBe('');
  });

  it('should display a map with correct property coordinates', fakeAsync(() => {
    spyOn(component, 'initMap').and.callThrough(); // Spy on the initMap method
  
    component.ngOnInit();  // Trigger ngOnInit
    tick(); // Simulate async completion
  
    expect(component.initMap).toHaveBeenCalled(); // Verify initMap was called
  
    const mapElement = fixture.nativeElement.querySelector('#map');
    expect(mapElement).toBeTruthy(); // Check that map element is present in the DOM
  }));

  it('should open a new window to view the 3D floor plan', () => {
    spyOn(window, 'open');
    component.view3D();
    expect(window.open).toHaveBeenCalledWith('/assets/images/onebed_1bath.html', '_blank');
  });
  
});