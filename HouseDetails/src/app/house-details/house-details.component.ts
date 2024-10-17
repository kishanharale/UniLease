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
    units: ['2 Bed, 2 Bath', '3 Bed, 2 Bath'],
  };

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  reviews = [
    { user: 'John', comment: 'Great place to live!', rating: 5 },
    { user: 'Jane', comment: 'Lovely amenities.', rating: 4 },
  ];

  newReview = {
    user: '',
    comment: '',
    rating: 0,
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

  addReview() {
    if (this.newReview.user && this.newReview.comment && this.newReview.rating) {
      this.reviews.push({ ...this.newReview });
      this.newReview = { user: '', comment: '', rating: 0 }; // Reset form
    }
  }

  sendMessage() {
    alert('Message sent!');
    this.contactForm = { name: '', email: '', message: '' }; // Reset form
  }

  // Lightbox methods
  openLightbox(image: string) {
    this.currentImage = image;
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
  }

  // Method for sending chat messages
  sendChatMessage() {
    if (this.chatMessage.user && this.chatMessage.content) {
      this.messages.push({ user: this.chatMessage.user, content: this.chatMessage.content });
      this.chatMessage = { user: '', content: '' }; // Reset chat message
    }
  }

  // Method for viewing 3D
  view3D() {
    alert('3D View functionality is not yet implemented!');
  }
}
