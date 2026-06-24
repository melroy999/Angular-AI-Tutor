import { inject, Injectable, ResourceStatus } from '@angular/core';
import { RecipeModel } from './models';
import { httpResource, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private http = inject(HttpClient);
  readonly recipes = httpResource<RecipeModel[]>(() =>
    'http://localhost:3000/recipes', {
    defaultValue: [],
  });

  getAll(): RecipeModel[] {
    return this.recipes.value();
  }

  status(): ResourceStatus {
    return this.recipes.status();
  }

  refreshAll(): void {
    this.recipes.reload();
  }

  addRecipe(model: RecipeModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>("http://localhost:3000/recipes", model);
  }
}
