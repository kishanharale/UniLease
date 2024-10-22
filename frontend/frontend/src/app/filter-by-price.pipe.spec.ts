import { FilterByPricePipe } from './filter-by-price.pipe';

describe('FilterBypricePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByPricePipe();
    expect(pipe).toBeTruthy();
  });
});
