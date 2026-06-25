import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { RecipeModel } from './models';
import { Recipe } from './recipe';

export const recipeListResolver: ResolveFn<Observable<RecipeModel[]>> = (route, state) => {
  return inject(Recipe).fetchAll();
};
