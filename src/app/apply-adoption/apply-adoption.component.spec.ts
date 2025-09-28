import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAdoptionComponent } from './apply-adoption.component';

describe('ApplyAdoptionComponent', () => {
  let component: ApplyAdoptionComponent;
  let fixture: ComponentFixture<ApplyAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyAdoptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
