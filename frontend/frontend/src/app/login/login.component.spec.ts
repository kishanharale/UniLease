import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;

  // Mock AngularFireAuth
  const mockAngularFireAuth = {
    signInWithPopup: jasmine.createSpy('signInWithPopup'),
    auth: {
      GoogleAuthProvider: jasmine.createSpyObj('GoogleAuthProvider', ['providerId']),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
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

  // Sign-In Tests
  it('should display an alert if sign-in form is incomplete', () => {
    spyOn(window, 'alert');
    component.username = '';
    component.password = '';
    component.signIn(new Event('click'));
    expect(window.alert).toHaveBeenCalledWith('Both fields are required for sign-in.');
  });

  it('should send a POST request to the sign-in API and navigate on success', () => {
    component.username = 'testuser';
    component.password = 'testpassword';
    component.signIn(new Event('click'));

    const req = httpTestingController.expectOne('http://localhost:3000/signin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser', password: 'testpassword' });

    req.flush({ token: 'dummy-token' });
    expect(localStorage.getItem('authToken')).toBe('dummy-token');
    expect(router.navigate).toHaveBeenCalledWith(['/houses']);
  });

  it('should handle sign-in errors and set an error message', () => {
    component.username = 'testuser';
    component.password = 'testpassword';
    component.signIn(new Event('click'));

    const req = httpTestingController.expectOne('http://localhost:3000/signin');
    expect(req.request.method).toBe('POST');

    req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
    expect(component.errorMessage).toBe('Login failed. Please check your credentials.');
  });

  // Sign-Up Tests
  it('should send a POST request to the sign-up API and show success message', () => {
    spyOn(window, 'alert');
    component.username = 'newuser';
    component.email = 'newuser@example.edu';
    component.password = 'newpassword';
    component.signUp(new Event('click'));

    const req = httpTestingController.expectOne('http://localhost:3000/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'newuser', email: 'newuser@example.edu', password: 'newpassword' });

    req.flush({});
    expect(window.alert).toHaveBeenCalledWith('Sign-up successful!');
  });

  it('should validate email format during sign-up', () => {
    spyOn(window, 'alert');
    
    // Populate all required fields except for a valid email format
    component.username = 'validuser';
    component.email = 'invalidemail.com'; // Invalid email format
    component.password = 'validpassword';
  
    // Trigger the signUp method
    component.signUp(new Event('click'));
  
    // Expect the specific email validation alert
    expect(window.alert).toHaveBeenCalledWith('Please provide a valid student email address.');
  });
  
  it('should handle sign-up errors and set an error message', () => {
    component.username = 'newuser';
    component.email = 'newuser@example.edu';
    component.password = 'newpassword';
    component.signUp(new Event('click'));

    const req = httpTestingController.expectOne('http://localhost:3000/signup');
    expect(req.request.method).toBe('POST');

    req.flush({ message: 'Sign-up error' }, { status: 400, statusText: 'Bad Request' });
    expect(component.errorMessage).toBe('Sign-up failed. Please check your input.');
  });

  // Forgot Password Tests
  it('should send a password reset link successfully', () => {
    component.forgotEmail = 'user@example.com';
    component.onForgotPassword();

    const req = httpTestingController.expectOne('http://localhost:3000/forgot-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'user@example.com' });

    req.flush({});
    expect(component.forgotPasswordMessage).toBe('Password reset link sent to your email.');
  });

  it('should handle forgot password errors', () => {
    component.forgotEmail = 'user@example.com';
    component.onForgotPassword();

    const req = httpTestingController.expectOne('http://localhost:3000/forgot-password');
    expect(req.request.method).toBe('POST');

    req.flush({ message: 'Error' }, { status: 400, statusText: 'Bad Request' });
    expect(component.forgotPasswordMessage).toBe('Error sending reset link. Please try again.');
  });

  

  // Mode Toggling Tests
  it('should toggle to sign-up mode', () => {
    component.switchToSignUp();
    expect(component.signUpMode).toBeTrue();
    expect(component.forgotPasswordMode).toBeFalse();
  });

  it('should toggle to forgot password mode', () => {
    component.toggleForgotPassword(new Event('click'));
    expect(component.forgotPasswordMode).toBeTrue();
    expect(component.signUpMode).toBeFalse();
  });

  it('should reset to sign-in mode', () => {
    component.switchToSignUp();
    component.switchToSignIn();
    expect(component.signUpMode).toBeFalse();
    expect(component.forgotPasswordMode).toBeFalse();
  });
});
