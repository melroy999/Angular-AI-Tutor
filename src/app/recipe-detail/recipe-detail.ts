import { Component, computed, inject, signal } from '@angular/core';
import { Ingredient, RecipeModel } from '../models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-recipe-detail',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly id = this.route.snapshot.params['id'];

  readonly recipe = httpResource<RecipeModel>(() =>
    `http://localhost:3000/recipes/${this.id}`
  );

  protected readonly servings = signal<number>(1);
  protected readonly ingredients = computed<Ingredient[]>(
    () => {
      return this.recipe.value()?.ingredients.map<Ingredient>(
        (ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity * this.servings(),
          unit: ingredient.unit,
        })
      ) || [];
    }
  );

  protected increase(): void {
    this.servings.update((current) => current + 1);
  }

  protected decrease(): void {
    this.servings.update((current) => Math.max(1, current - 1));
  }
}
