import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDonationDetailsComponent } from './money-donation-details.component';

describe('MoneyDonationDetailsComponent', () => {
  let component: MoneyDonationDetailsComponent;
  let fixture: ComponentFixture<MoneyDonationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyDonationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyDonationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
