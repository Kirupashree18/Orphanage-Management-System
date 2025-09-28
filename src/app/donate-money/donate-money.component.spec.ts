import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateMoneyComponent } from './donate-money.component';

describe('DonateMoneyComponent', () => {
  let component: DonateMoneyComponent;
  let fixture: ComponentFixture<DonateMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
