import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile: any;
  favorites: any[] = [];
  isDropdownOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getProfile();
    this.getFavorites();
  }

  // Toggle dropdown menu
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Fetch profile details
  getProfile() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.get<any>('http://localhost:3000/user/profile', { headers })
        .subscribe(
          data => this.profile = data,
          error => console.error('Error fetching profile:', error)
        );
    }
  }

  // Fetch favorites
  getFavorites() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.get<any[]>('http://localhost:3000/favorites', { headers })
        .subscribe(
          data => this.favorites = data,
          error => console.error('Error fetching favorites:', error)
        );
    }
  }
}
