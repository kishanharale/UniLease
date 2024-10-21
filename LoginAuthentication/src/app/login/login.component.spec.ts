import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';  // For ngModel support
import { provideHttpClientTesting } from '@angular/common/http/testing';  // Use provideHttpClientTesting
import { RouterTestingHarness } from '@angular/router/testing';  // Updated router testing
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [provideHttpClientTesting()]  // Use provideHttpClientTesting for HTTP requests
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);  // Inject HttpTestingController
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');  // Spy on router's navigate method
    fixture.detectChanges();  // Trigger initial data binding
  });

  afterEach(() => {
    httpTestingController.verify();  // Ensure no outstanding HTTP requests
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should send a POST request to the sign-in API', () => {
    component.username = 'testuser';
    component.password = 'testpassword';
    component.signIn(new Event('click'));

    const req = httpTestingController.expectOne('http://localhost:3000/signin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser', password: 'testpassword' });

    req.flush({});  // Simulate success response
    expect(router.navigate).toHaveBeenCalledWith(['/list-houses']);
  });
});
