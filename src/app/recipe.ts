import { inject, Injectable } from '@angular/core';
import { RecipeModel } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  fetchAll(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.apiUrl}/recipes`);
  }

  searchRecipes(term: string): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.apiUrl}/recipes?name:contains=${term}`);
  }

  addRecipe(model: RecipeModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${this.apiUrl}/recipes`, model);
  }

  updateRating(id: string, rating: number): Observable<RecipeModel> {
    return this.http.patch<RecipeModel>(`${this.apiUrl}/recipes/${id}`, {
      rating
    });
  }
}
