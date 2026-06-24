import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../recipe';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe {
  private readonly fb = inject(FormBuilder);
  protected readonly recipes = inject(Recipe);
  protected readonly router = inject(Router);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    authorEmail: ['', [Validators.required, Validators.email]],
    description: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.valid) {
      const rawValues = this.form.getRawValue();
      this.recipes.addRecipe({
        id: this.recipes.size() + 1,
        name: rawValues.name,
        description: rawValues.description,
        authorEmail: rawValues.authorEmail,
        imgUrl: 'https://placehold.co/400x300',
        isFavorite: false,
        ingredients: [],
      });
      // this.form.reset();
      this.router.navigate(["/recipes"]);
    }
  }
}
