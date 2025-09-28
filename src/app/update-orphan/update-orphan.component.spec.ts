import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrphanComponent } from './update-orphan.component';

describe('UpdateOrphanComponent', () => {
  let component: UpdateOrphanComponent;
  let fixture: ComponentFixture<UpdateOrphanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrphanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrphanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
