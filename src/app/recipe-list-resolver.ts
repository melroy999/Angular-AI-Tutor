import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { RecipeModel } from './models';
import { environment } from '../environments/environment';

export const recipeListResolver: ResolveFn<Observable<RecipeModel[]>> = (route, state) => {
  const http = inject(HttpClient);
  return http.get<RecipeModel[]>(`${environment.apiUrl}/recipes`);
};
