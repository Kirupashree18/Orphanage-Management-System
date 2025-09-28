import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphanDetailsComponent } from './orphan-details.component';

describe('OrphanDetailsComponent', () => {
  let component: OrphanDetailsComponent;
  let fixture: ComponentFixture<OrphanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrphanDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrphanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
