import { Component, OnInit } from '@angular/core';

// Declare the global `google` object so TypeScript recognizes it
declare var google: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  property = {
    name: 'Steelcote Square',
    address: '812 S Theresa Ave St. Louis, MO 63103',
    priceRange: '$1215.00 - $2280.00',
    availability: 'Now',
    phone: '(314) 582-4621',
    images: [ 
      'photo2.png',
      'photo3.png',
      'photo4.png',
      'photo5.png',
      'photo6.png',
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
    this.loadGoogleMapsScript().then(() => {
      this.initMap();  // Call initMap after Google Maps script is loaded
    });
  }

  // Load the Google Maps script dynamically
  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDslNs3YxM06JgJbpx0r0FH0p8kwxAHSmM';
      script.defer = true;
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  // Define the initMap method to initialize the map
  initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 15,
    });

    new google.maps.Marker({
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

  // Lightbox methods
  openLightbox(image: string) {
    this.currentImage = image;
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
  }

  // Method for viewing 3D floor plan
  view3D() {
    window.open('/assets/images/onebed_1bath.html', '_blank');
  }

  // Send message method to handle form submission
  sendMessage() {
    alert('Message sent successfully!');
    this.contactForm = { name: '', email: '', message: '' }; // Reset the form after sending
  }
}
