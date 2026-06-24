import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeModel } from '../models';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recipe-list',
  imports: [ FormsModule, RouterLink, MatFormFieldModule, MatInputModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly recipes = inject(Recipe);
  protected readonly searchTerm = signal<string>('');

  protected readonly filtered = computed<RecipeModel[]>(() => {
    const term = this.searchTerm().toLowerCase();
    return this.recipes.getAll().filter((recipe) => recipe.name.toLowerCase().includes(term));
  });
}
