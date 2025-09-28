import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdopterComponent } from './register-adopter.component';

describe('RegisterAdopterComponent', () => {
  let component: RegisterAdopterComponent;
  let fixture: ComponentFixture<RegisterAdopterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAdopterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdopterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
