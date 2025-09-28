import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTypeComponent } from './family-type.component';

describe('FamilyTypeComponent', () => {
  let component: FamilyTypeComponent;
  let fixture: ComponentFixture<FamilyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
