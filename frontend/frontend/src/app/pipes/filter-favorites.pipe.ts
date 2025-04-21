import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFavorites'
})
export class FilterFavoritesPipe implements PipeTransform {

  transform(apartments: any[], showFavoritesOnly: boolean): any[] {
    if (!showFavoritesOnly) {
      return apartments;
    }
    return apartments.filter(apartment => apartment.isFavorite);
  }
}
