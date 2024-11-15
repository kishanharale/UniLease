import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;

  // Define a mock AngularFireAuth class
  const mockAngularFireAuth = {
    signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword'),
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }, // Provide mock AngularFireAuth
        { provide: 'angularfire2.app.options', useValue: {} } // Provide empty Firebase config
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if sign-in form is incomplete', () => {
    spyOn(window, 'alert');
    component.username = '';
    component.password = '';

    component.signIn(new Event('click'));

    expect(window.alert).toHaveBeenCalledWith('Both fields are required for sign-in.');
  });

  it('should send a POST request to the sign-in API and navigate to houses page on success', () => {
    component.username = 'testuser';
    component.password = 'testpassword';

    // Trigger signIn
    component.signIn(new Event('click'));

    // Expect a POST request to the sign-in API with the correct payload
    const req = httpTestingController.expectOne('http://localhost:3000/signin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser', password: 'testpassword' });

    // Simulate a successful response with a token
    req.flush({ token: 'dummy-token' });

    // Expect the token to be stored in localStorage
    expect(localStorage.getItem('authToken')).toBe('dummy-token');
    // Expect to navigate to the houses page
    expect(router.navigate).toHaveBeenCalledWith(['/houses']);
  });

  it('should handle sign-in errors and display error message', () => {
    component.username = 'testuser';
    component.password = 'testpassword';

    // Trigger signIn
    component.signIn(new Event('click'));

    // Expect a POST request to the sign-in API
    const req = httpTestingController.expectOne('http://localhost:3000/signin');
    expect(req.request.method).toBe('POST');

    // Simulate an error response
    req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });

    // Expect the error message to be set
    expect(component.errorMessage).toBe('Login failed. Please check your credentials.');
  });

  it('should send a POST request to the sign-up API and show success message', () => {
    spyOn(window, 'alert');
    component.username = 'testuser';
    component.email = 'testuser@example.com';
    component.password = 'testpassword';

    // Trigger signUp
    component.signUp(new Event('click'));

    // Expect a POST request to the sign-up API with the correct payload
    const req = httpTestingController.expectOne('http://localhost:3000/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser', email: 'testuser@example.com', password: 'testpassword' });

    // Simulate a successful response
    req.flush({ message: 'Sign-up successful' });

    // Expect the success alert to be shown
    expect(window.alert).toHaveBeenCalledWith('Sign-up successful!');
  });

  it('should handle sign-up errors and display error message', () => {
    component.username = 'testuser';
    component.email = 'testuser@example.com';
    component.password = 'testpassword';

    // Trigger signUp
    component.signUp(new Event('click'));

    // Expect a POST request to the sign-up API
    const req = httpTestingController.expectOne('http://localhost:3000/signup');
    expect(req.request.method).toBe('POST');

    // Simulate an error response
    req.flush({ message: 'Sign-up error' }, { status: 400, statusText: 'Bad Request' });

    // Expect the error message to be set
    expect(component.errorMessage).toBe('Sign-up failed. Please check your input.');
  });
});