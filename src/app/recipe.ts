import { Injectable, signal } from '@angular/core';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private readonly recipeService = signal<RecipeModel[]>(MOCK_RECIPES);


  getById(id: number): RecipeModel {
    const recipe = this.recipeService().find((v) => v.id === id);
    if (!recipe) {
      throw Error("A recipe with ID " + id + " cannot be found.");
    }
    return recipe;
  }
  getFirst(): RecipeModel {
    return this.recipeService()[0];
  }

  getAll(): RecipeModel[] {
    return this.recipeService();
  }

  size(): number {
    return this.recipeService().length;
  }

  addRecipe(model: RecipeModel): void {
    this.recipeService.update((current) => [...current, model]);
  }
}
