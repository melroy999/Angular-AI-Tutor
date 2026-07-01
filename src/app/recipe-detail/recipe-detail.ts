import { Component, computed, inject, signal } from '@angular/core';
import { Ingredient, RecipeModel } from '../models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { httpResource } from '@angular/common/http';
import { API_URL } from '../tokens';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../card/card';
import { StarRating } from '../star-rating/star-rating';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [MatButtonModule, RouterLink, MatCardModule, Card, FormsModule, StarRating],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(Recipe);
  private readonly apiUrl = inject(API_URL);
  protected readonly id = this.route.snapshot.params['id'];

  readonly recipe = httpResource<RecipeModel>(() =>
    `${this.apiUrl}/recipes/${this.id}`
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

  protected onRatingChange(rating: number) {
    this.recipeService.updateRating(this.id, rating).subscribe();
  }
}
