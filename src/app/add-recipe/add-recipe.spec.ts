import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipe } from './add-recipe';
import { commonTestProviders, recipeMockProvider } from '../testing/test-providers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeModel } from '../models';
import { Subject } from 'rxjs';

describe('AddRecipe', () => {
  let component: AddRecipe;
  let fixture: ComponentFixture<AddRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipe],
      providers: [
        ...commonTestProviders,
        ...recipeMockProvider
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipe);
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

    (component as any).form.setValue(newRecipe);
    (component as any).submit();

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

    (component as any).form.setValue(newRecipe);
    (component as any).submit();

    const mockRecipe = TestBed.inject(Recipe);
    expect(mockRecipe.addRecipe).not.toHaveBeenCalled();
  });

  it('should disable the submit button while the request is in-flight', () => {
    const newRecipe = {
      name: "name",
      description: "description",
      authorEmail: "e@mail.com"
    };

    const subject = new Subject<RecipeModel>();
    const mockRecipe = TestBed.inject(Recipe);
    vi.spyOn(mockRecipe, 'addRecipe').mockReturnValue(subject.asObservable());

    (component as any).form.setValue(newRecipe);
    (component as any).submit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBe(true);

    subject.next({} as any);
    subject.complete();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBe(false);
  });
});
