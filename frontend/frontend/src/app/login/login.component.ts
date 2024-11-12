import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // For making HTTP requests
import { Router } from '@angular/router';  // For navigation
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  // Template file for the component
  styleUrls: ['./login.component.css']    // Styles for the component
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // For displaying error messages

  constructor(private http: HttpClient, private router: Router) {}

  // Switch to sign-up mode (used for styling and animations)
  switchToSignUp(): void {
    const container = document.querySelector('.container');
    container?.classList.add('sign-up-mode');
  }

  // Switch to sign-in mode (used for styling and animations)
  switchToSignIn(): void {
    const container = document.querySelector('.container');
    container?.classList.remove('sign-up-mode');
  }

  // Method to handle sign-in
  signIn(event: Event): void {
    event.preventDefault();  // Prevent default form submission behavior

    if (!this.username || !this.password) {
      alert('Both fields are required for sign-in.');
      return;
    }

    if (this.username === 'kishan' && this.password === '1234') {
      // Navigate to admin page if credentials match
      this.router.navigate(['/app-admin-panel']);
      return;
    }

    // Make a POST request for sign-in
    this.http.post('http://localhost:3000/signin', { username: this.username, password: this.password })
      .pipe(
        catchError(error => {
          this.errorMessage = 'Invalid username or password';  // Set error message on failure
          return throwError(() => new Error('An error occurred: ' + error.message));
        })
      )
      .subscribe({
        next: (response: any) => {
          alert('Sign-in successful!');
          // Store the token in localStorage if it's returned from the server
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/houses']);  // Navigate to 'houses' page after successful login
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error(error);  // Log the error for debugging
        }
      });
  }

  // Method to handle sign-up
  signUp(event: Event): void {
    event.preventDefault();  // Prevent default form submission behavior

    if (!this.username || !this.email || !this.password) {
      alert('All fields are required for sign-up.');
      return;
    }

    // Make a POST request for sign-up
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
          console.error(error);  // Log the error for debugging
        }
      });
  }
}
