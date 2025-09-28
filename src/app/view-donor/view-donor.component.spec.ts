import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDonorComponent } from './view-donor.component';

describe('ViewDonorComponent', () => {
  let component: ViewDonorComponent;
  let fixture: ComponentFixture<ViewDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDonorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
