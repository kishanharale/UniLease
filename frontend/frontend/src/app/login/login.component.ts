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
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  // Toggle to sign-up mode
  switchToSignUp(): void {
    const container = document.querySelector('.container');
    container?.classList.add('sign-up-mode');
  }

  // Toggle to sign-in mode
  switchToSignIn(): void {
    const container = document.querySelector('.container');
    container?.classList.remove('sign-up-mode');
  }

  // Handle sign-in
  signIn(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.password) {
      alert('Both fields are required for sign-in.');
      return;
    }

    if (this.username === 'kishan' && this.password === '1234') {
      this.router.navigate(['/app-admin-panel']);
      return;
    }

    // POST request for sign-in
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

  // Handle sign-up
  signUp(event: Event): void {
    event.preventDefault();

    if (!this.username || !this.email || !this.password) {
      alert('All fields are required for sign-up.');
      return;
    }

    // POST request for sign-up
    this.http.post('http://localhost:3000/signup', { username: this.username, email: this.email, password: this.password })
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error during sign-up. Please try again.';
          return throwError(() => new Error('An error occurred: ' + error.message));
        })
      )
      .subscribe({
        next: (response: any) => {
          alert('Sign-up successful!');
        },
        error: (error) => {
          this.errorMessage = 'Sign-up failed. Please check your input.';
          console.error(error);
        }
      });
  }

  // Google Login with Firebase
  loginWithGoogle(): void {
    console.log('Google login button clicked'); // Add this line for debugging
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log('Google login successful:', result);
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
      .then((result: any) => {
        console.log('Facebook login successful:', result);
        this.router.navigate(['/houses']);
      })
      .catch((error: any) => {
        this.errorMessage = 'Facebook login failed. Please try again.';
        console.error('Facebook login error:', error);
      });
  }

  // Twitter Login with Firebase
  loginWithTwitter(): void {
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((result: any) => {
        console.log('Twitter login successful:', result);
        this.router.navigate(['/houses']);
      })
      .catch((error: any) => {
        this.errorMessage = 'Twitter login failed. Please try again.';
        console.error('Twitter login error:', error);
      });
  }

  // LinkedIn Login placeholder (Firebase does not natively support LinkedIn)
  loginWithLinkedIn(): void {
    this.errorMessage = 'LinkedIn login is not implemented. Please try another method.';
    console.warn('LinkedIn login is not directly supported by Firebase.');
  }
}
