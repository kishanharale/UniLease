import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPrice'
})
export class FilterByPricePipe implements PipeTransform {
  
  // This method is called for each value passed to the pipe in the template
  transform(apartments: any[], maxPrice: number): any[] {
    if (!apartments || !maxPrice) {
      return apartments; // Return all apartments if no max price is specified
    }
    // Filter the apartments based on the max price value
    return apartments.filter(apartment => apartment.price <= maxPrice);
  }
}
