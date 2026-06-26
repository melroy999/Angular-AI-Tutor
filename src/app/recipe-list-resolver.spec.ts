import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { recipeListResolver } from './recipe-list-resolver';
import { Observable } from 'rxjs';
import { RecipeModel } from './models';

describe('recipeListResolver', () => {
  const executeResolver: ResolveFn<Observable<RecipeModel[]>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => recipeListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
