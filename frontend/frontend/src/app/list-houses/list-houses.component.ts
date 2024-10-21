import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css']
})
export class ListHousesComponent {
  apartments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getApartments().subscribe(data => {
      this.apartments = data;
    });
  }

  getApartments(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/apartments');  // Example API call
  }
}
