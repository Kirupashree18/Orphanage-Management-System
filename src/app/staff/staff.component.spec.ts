import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComponent } from './staff.component';
import { staffComponent } from './staff.module';

describe('StaffComponent', () => {
  let component: staffComponent;
  let fixture: ComponentFixture<staffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[staffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(staffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
