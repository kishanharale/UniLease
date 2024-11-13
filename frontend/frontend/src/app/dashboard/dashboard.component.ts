import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile: any;
  favorites: any[] = [];
  recentActivity: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      console.log("DashBoard Initiated");
      this.getProfile();
      this.getFavorites();
      this.getRecentActivity();
    } else {
      console.warn('Running in a non-browser environment; skipping localStorage-dependent methods.');
    }
  }

  // Retrieve the token from localStorage if available
  private getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      console.log('Retrieved token:', token); // Log the token for debugging
      return token;
    } else {
      console.warn('localStorage is not available');
      return null;
    }
  }

  // Fetch profile details
  getProfile() {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.get<any>('http://localhost:3000/user/profile', { headers })
        .subscribe(
          data => {
            console.log('Fetched profile:', data);
            this.profile = data;
          },
          error => {
            console.error('Error fetching profile:', error);
            if (error.status === 401) {
              console.error('Unauthorized access - possibly due to an invalid token.');
            }
          }
        );
    } else {
      console.error('Authorization token is missing. Unable to fetch profile.');
      // Redirect or notify the user as needed
    }
  }

  // Fetch favorite items
  getFavorites() {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.get<any[]>('http://localhost:3000/favorites', { headers })
        .subscribe(
          data => {
            console.log('Fetched favorites:', data);
            this.favorites = data;
          },
          error => {
            console.error('Error fetching favorites:', error);
            if (error.status === 404) {
              console.warn('Favorites endpoint not found.');
            }
          }
        );
    } else {
      console.error('Authorization token is missing. Unable to fetch favorites.');
      // Handle missing token if needed
    }
  }

  // Fetch recent activity
  getRecentActivity() {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.get<any[]>('http://localhost:3000/user/activity', { headers })
        .subscribe(
          data => {
            console.log('Fetched recent activity:', data);
            this.recentActivity = data;
          },
          error => {
            console.error('Error fetching recent activity:', error);
            if (error.status === 500) {
              console.warn('Server error when fetching recent activity.');
            }
          }
        );
    } else {
      console.error('Authorization token is missing. Unable to fetch recent activity.');
      // Handle missing token if needed
    }
  }
}
