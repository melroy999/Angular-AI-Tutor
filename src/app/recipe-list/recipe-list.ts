import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { rxResource } from '@angular/core/rxjs-interop';
import { Recipe } from '../recipe';
import { RecipeModel } from '../models';
import { Card } from '../card/card';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Auth } from '../auth';
import { TruncatePipe } from '../truncate-pipe';
import { RatingPipe } from '../rating-pipe';
import { HighlightDirective } from '../highlight-directive';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule, Card, TruncatePipe, RatingPipe, HighlightDirective],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly searchTerm = signal<string>('');
  private readonly debouncedSearchTerm = signal<string>('');

  private recipes = inject(Recipe);
  protected auth = inject(Auth);

  protected readonly results = rxResource<RecipeModel[], string>({
    params: () => this.debouncedSearchTerm(),
    stream: (params) => this.recipes.searchRecipes(params.params.trim()),
    defaultValue: [],
  });

  protected readonly displayedRecipes = signal<RecipeModel[]>([]);

  constructor() {
    effect((onCleanup) => {
      const term = this.searchTerm();
      const timeout = setTimeout(() => this.debouncedSearchTerm.set(term), 300);
      onCleanup(() => clearTimeout(timeout));
    });

    effect(() => {
      if (!this.results.isLoading()) {
        this.displayedRecipes.set(this.results.value());
      }
    });
  }
}
