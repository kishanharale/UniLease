import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAddress'
})
export class FilterByAddressPipe implements PipeTransform {
  transform(apartments: any[], searchQuery: string): any[] {
    if (!apartments || !searchQuery) {
      return apartments;
    }
    return apartments.filter(apartment =>
      apartment.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
