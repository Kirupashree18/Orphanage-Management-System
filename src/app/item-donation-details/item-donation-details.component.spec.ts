import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDonationDetailsComponent } from './item-donation-details.component';

describe('ItemDonationDetailsComponent', () => {
  let component: ItemDonationDetailsComponent;
  let fixture: ComponentFixture<ItemDonationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDonationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDonationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
