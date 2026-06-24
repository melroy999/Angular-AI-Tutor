import { Component, computed, inject, signal } from '@angular/core';
import { Ingredient } from '../models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from '../recipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-detail',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly id = Number(this.route.snapshot.params['id']);
  protected readonly recipes = inject(Recipe);

  protected readonly recipe = computed(
    () => this.recipes.getById(this.id)
  );

  protected readonly servings = signal<number>(1);
  protected readonly ingredients = computed<Ingredient[]>(
    () => {
      return this.recipe().ingredients.map<Ingredient>(
        (ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity * this.servings(),
          unit: ingredient.unit,
        })
      )
    }
  );

  protected increase(): void {
    this.servings.update((current) => current + 1);
  }

  protected decrease(): void {
    this.servings.update((current) => Math.max(1, current - 1));
  }
}
