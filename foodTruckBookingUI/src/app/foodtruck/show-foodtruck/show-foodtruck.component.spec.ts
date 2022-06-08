import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFoodtruckComponent } from './show-foodtruck.component';

describe('ShowFoodtruckComponent', () => {
  let component: ShowFoodtruckComponent;
  let fixture: ComponentFixture<ShowFoodtruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFoodtruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFoodtruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
