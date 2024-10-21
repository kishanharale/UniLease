import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHousesComponent } from './list-houses.component';

describe('ListHousesComponent', () => {
  let component: ListHousesComponent;
  let fixture: ComponentFixture<ListHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
