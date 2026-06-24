import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeSignal } from './add-recipe-signal';

describe('AddRecipeSignal', () => {
  let component: AddRecipeSignal;
  let fixture: ComponentFixture<AddRecipeSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipeSignal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipeSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
