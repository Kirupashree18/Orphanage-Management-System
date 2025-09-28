import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrphanComponent } from './create-orphan.component';

describe('CreateOrphanComponent', () => {
  let component: CreateOrphanComponent;
  let fixture: ComponentFixture<CreateOrphanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrphanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrphanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
