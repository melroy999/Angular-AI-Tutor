import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeSignal } from './add-recipe-signal';
import { commonTestProviders, recipeMockProvider } from '../testing/test-providers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Recipe } from '../recipe';

describe('AddRecipeSignal', () => {
  let component: AddRecipeSignal;
  let fixture: ComponentFixture<AddRecipeSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipeSignal],
      providers: [
        ...commonTestProviders,
        ...recipeMockProvider
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipeSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addRecipe when the form is valid', () => {
    const newRecipe = {
      name: "name",
      description: "description",
      authorEmail: "e@mail.com"
    };

    (component as any).recipeModel.set(newRecipe);
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    const mockRecipe = TestBed.inject(Recipe);
    expect(mockRecipe.addRecipe).toHaveBeenCalledOnce();
    expect(mockRecipe.addRecipe).toHaveBeenCalledWith(
      expect.objectContaining(newRecipe)
    );
  });

  it('should not call addRecipe when the form is invalid', () => {
    const newRecipe = {
      name: "name",
      description: "description",
      authorEmail: "invalid"
    };

    (component as any).recipeModel.set(newRecipe);
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    const mockRecipe = TestBed.inject(Recipe);
    expect(mockRecipe.addRecipe).not.toHaveBeenCalled();
  });

  it('should disable the submit button when the form input is invalid', () => {
    const newRecipe = {
      name: "name",
      description: "description",
      authorEmail: "invalid"
    };

    (component as any).recipeModel.set(newRecipe);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBe(true);

    (component as any).recipeModel.set({
      ...newRecipe,
      authorEmail: "e@mail.com"
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBe(false);
  });
});
