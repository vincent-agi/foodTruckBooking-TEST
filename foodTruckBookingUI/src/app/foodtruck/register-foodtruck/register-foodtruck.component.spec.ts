import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFoodtruckComponent } from './register-foodtruck.component';

describe('RegisterFoodtruckComponent', () => {
  let component: RegisterFoodtruckComponent;
  let fixture: ComponentFixture<RegisterFoodtruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFoodtruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFoodtruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
