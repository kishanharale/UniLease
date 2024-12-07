import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  forgotEmail: string = '';
  errorMessage: string = '';
  forgotPasswordMessage: string = '';
  forgotPasswordMode: boolean = false; // Toggle Forgot Password mode
  signUpMode: boolean = false; // Toggle Sign-Up mode

  constructor(
    private http: HttpClient,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  // Toggle Forgot Password mode
  toggleForgotPassword(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    this.forgotPasswordMode = true;
    this.signUpMode = false; // Ensure Sign-Up mode is disabled
  }

  // Switch to Sign-Up mode
  switchToSignUp(): void {
    this.signUpMode = true;
    this.forgotPasswordMode = false; // Ensure Forgot Password mode is disabled
  }

  // Switch to Sign-In mode
  switchToSignIn(): void {
    this.signUpMode = false;
    this.forgotPasswordMode = false; // Reset both modes
  }

  // Handle Sign-In
  signIn(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.password) {
      alert('Both fields are required for sign-in.');
      return;
    }

    this.http.post('http://localhost:3000/signin', { username: this.username, password: this.password })
      .pipe(
        catchError(error => {
          this.errorMessage = 'Invalid username or password';
          return throwError(() => new Error('An error occurred: ' + error.message));
        })
      )
      .subscribe({
        next: (response: any) => {
          alert('Sign-in successful!');
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/houses']);
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error(error);
        }
      });
  }

  // Handle Sign-Up
  signUp(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.email || !this.password) {
      alert('All fields are required for sign-up.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[eE][dD][uU]$/;
    if (!emailRegex.test(this.email)) {
      alert('Please provide a valid student email address.');
      return;
    }

    this.http.post('http://localhost:3000/signup', { username: this.username, email: this.email, password: this.password })
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error during sign-up. Please try again.';
          return throwError(() => new Error('An error occurred: ' + error.message));
        })
      )
      .subscribe({
        next: () => {
          alert('Sign-up successful!');
          this.switchToSignIn();
        },
        error: (error) => {
          this.errorMessage = 'Sign-up failed. Please check your input.';
          console.error(error);
        }
      });
  }

  // Handle Forgot Password
  onForgotPassword(): void {
    if (!this.forgotEmail) {
      alert('Email is required for password reset.');
      return;
    }

    this.http.post('http://localhost:3000/forgot-password', { email: this.forgotEmail })
      .pipe(
        catchError(error => {
          this.forgotPasswordMessage = 'Error sending reset link. Please try again.';
          return throwError(() => new Error('An error occurred: ' + error.message));
        })
      )
      .subscribe({
        next: () => {
          this.forgotPasswordMessage = 'Password reset link sent to your email.';
        },
        error: (error) => {
          console.error('Forgot Password error:', error);
        }
      });
  }

  // Google Login with Firebase
  loginWithGoogle(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/houses']);
      })
      .catch((error) => {
        this.errorMessage = 'Google login failed. Please try again.';
        console.error('Google login error:', error);
      });
  }

  // Facebook Login with Firebase
  loginWithFacebook(): void {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(() => {
        this.router.navigate(['/houses']);
      })
      .catch((error) => {
        this.errorMessage = 'Facebook login failed. Please try again.';
        console.error('Facebook login error:', error);
      });
  }

  // Twitter Login with Firebase
  loginWithTwitter(): void {
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(() => {
        this.router.navigate(['/houses']);
      })
      .catch((error) => {
        this.errorMessage = 'Twitter login failed. Please try again.';
        console.error('Twitter login error:', error);
      });
  }

  // LinkedIn Login placeholder
  loginWithLinkedIn(): void {
    this.errorMessage = 'LinkedIn login is not implemented. Please try another method.';
    console.warn('LinkedIn login is not directly supported by Firebase.');
  }
}
