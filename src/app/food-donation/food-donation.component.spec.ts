import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDonationDetailsComponent } from './food-donation-details.component';

describe('FoodDonationDetailsComponent', () => {
  let component: FoodDonationDetailsComponent;
  let fixture: ComponentFixture<FoodDonationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDonationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDonationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
