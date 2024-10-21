import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // For making HTTP requests
import { Router } from '@angular/router';  // For navigation

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  // The HTML you provided goes here
  styleUrls: ['./login.component.css']    // Styles for the component
})
export class LoginComponent {
  // Variables bound to the form fields using [(ngModel)]
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Declare errorMessage
  constructor(private http: HttpClient, public router: Router) {}

  switchToSignUp(): void {
    const container = document.querySelector('.container');
    container?.classList.add('sign-up-mode');
  }
  
  switchToSignIn(): void {
    const container = document.querySelector('.container');
    container?.classList.remove('sign-up-mode');
  }

  // Method to handle sign-in
  signIn(event: Event): void {
    // event.preventDefault();  // Prevent default form submission behavior

    if (!this.username || !this.password) {
      alert('Both fields are required for sign-in.');
      
      return;
    }

    // Send a POST request for sign-in
    this.http.post('http://localhost:3000/signin', { username: this.username, password: this.password })
      .pipe(
        catchError(error => {
          // alert('Sign-in failed: ' + error.message);
          this.errorMessage = 'Invalid email or password';  // Set error message if login fails
          return throwError(() => new Error('An error occurred: ' + this.errorMessage));
          // Handle errors
        })
      )
      .subscribe((response: any) => {
        alert('Sign-in successful!');
        this.router.navigate(['/list-houses']);  
      });
  }

  // Method to handle sign-up
  signUp(event: Event): void {
    event.preventDefault();  // Prevent default form submission behavior

    if (!this.username || !this.email || !this.password) {
      alert('All fields are required for sign-up.');
      return;
    }

    // Send a POST request for sign-up
    this.http.post('http://localhost:3000/signup', { username: this.username, email: this.email, password: this.password })
      .pipe(
        catchError(error => {
          // alert('Sign-up failed: ' + error.message);
          this.errorMessage = 'Invalid email or password';  // Set error message if login fails
          return throwError(() => new Error('An error occurred: ' + this.errorMessage));
          // Handle errors
        })
      )
      .subscribe((response: any) => {
        alert('Sign-up successful!');
        this.router.navigate(['/list-houses']);  // Navigate to dashboard on success
      });
  }
}
