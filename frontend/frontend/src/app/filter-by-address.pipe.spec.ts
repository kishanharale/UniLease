import { FilterByAddressPipe } from './filter-by-address.pipe';

describe('FilterByAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
