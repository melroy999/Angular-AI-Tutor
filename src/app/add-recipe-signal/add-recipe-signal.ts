import { Component, inject, signal, ViewChild } from '@angular/core';
import { Recipe } from '../recipe';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { form, FormField, debounce, required, email, FormRoot } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-recipe-signal',
  imports: [RouterLink, MatButtonModule, FormField, MatInputModule, MatFormFieldModule, FormsModule, FormRoot],
  templateUrl: './add-recipe-signal.html',
  styleUrl: './add-recipe-signal.css',
})
export class AddRecipeSignal {
  protected readonly recipes = inject(Recipe);
  // private router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  // Bind the form so we have a direct reference to it.
  @ViewChild('nativeFormRef') nativeForm!: NgForm;

  protected readonly recipeModel = signal({ name: '', authorEmail: '', description: '' });
  protected readonly recipeForm = form(
    this.recipeModel,
    (schemaPath) => {
      debounce(schemaPath.name, 500);
      debounce(schemaPath.authorEmail, 500);
      debounce(schemaPath.description, 500);
      required(schemaPath.name, { message: 'Recipe name is required.' });
      required(schemaPath.authorEmail, { message: 'Author email is required.' });
      required(schemaPath.description, { message: 'Description is required.' });
      email(schemaPath.authorEmail, {
        message: 'Please enter a valid email address.'
      });

    },
    {
      submission: {
        action: async () => {
          this.recipes.addRecipe({
            id: "",
            name: this.recipeForm.name().value(),
            description: this.recipeForm.description().value(),
            authorEmail: this.recipeForm.authorEmail().value(),
            imgUrl: 'https://placehold.co/400x300',
            isFavorite: false,
            ingredients: [],
          }).subscribe({
            next: () => {
              this.recipes.refreshAll();
              this.recipeForm().reset({ name: '', authorEmail: '', description: '' });

              // Hack to ensure the form doesn't display errors upon clear after successful submission.
              if (this.nativeForm) {
                this.nativeForm.resetForm();
              }
            },
            error: (err) => {
              console.dir(err);
              this.snackBar.open('Failed to save recipe. Please try again.', 'Dismiss', {
                duration: 5000,
                panelClass: ['error-snackbar'],
              });
            },
          });
        }
      }
    }
  );
}