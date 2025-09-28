import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateItemComponent } from './donate-item.component';

describe('DonateItemComponent', () => {
  let component: DonateItemComponent;
  let fixture: ComponentFixture<DonateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonateItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonateItemComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
