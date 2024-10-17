import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css'],
})
export class HouseDetailsComponent implements OnInit {
  property = {
    name: 'Steelcote Square',
    address: '812 S Theresa Ave St. Louis, MO 63103',
    priceRange: '$1215.00 - $2280.00',
    availability: 'Now',
    phone: '(314) 582-4621',
    images: [
      'assets/images/photo2.png',
      'assets/images/photo3.png',
      'assets/images/photo4.png',
      'assets/images/photo5.png',
      'assets/images/photo6.png',
    ],
  };

  latitude = 38.628989;
  longitude = -90.234297;

  // Lightbox properties
  isLightboxOpen = false;
  currentImage = '';

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const map = new (window as any).google.maps.Map(document.getElementById('map'), {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 15,
    });

    new (window as any).google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: map,
      title: this.property.name,
    });
  }

  // Lightbox methods
  openLightbox(image: string) {
    this.currentImage = image;
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
  }

  // Method for viewing 3D
  view3D() {
    alert('3D View functionality is not yet implemented!');
  }
}
