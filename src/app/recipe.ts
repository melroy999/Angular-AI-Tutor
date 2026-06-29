import { inject, Injectable } from '@angular/core';
import { RecipeModel } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private http = inject(HttpClient);

  fetchAll(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${environment.apiUrl}/recipes`);
  }

  searchRecipes(term: string): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${environment.apiUrl}/recipes?name:contains=${term}`);
  }

  addRecipe(model: RecipeModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${environment.apiUrl}/recipes`, model);
  }

  updateRating(id: string, rating: number): Observable<RecipeModel> {
    return this.http.patch<RecipeModel>(`${environment.apiUrl}/recipes/${id}`, {
      rating
    });
  }
}
