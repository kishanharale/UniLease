import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown when profile button is clicked', () => {
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeTrue();
  });

  it('should clear token and navigate to login on logout', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(component['router'], 'navigate');
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });
});
