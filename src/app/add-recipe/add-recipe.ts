import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../recipe';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from '../auth';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe {
  private readonly fb = inject(FormBuilder);
  protected readonly recipes = inject(Recipe);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly auth = inject(Auth);
  protected readonly submitting = signal<boolean>(false);

  // Bind the form so we have a direct reference to it.
  @ViewChild('nativeFormRef') nativeForm!: NgForm;

  constructor() {
    // Navigate back to index when loggedIn changes to false.
    effect(() => {
      if (!this.auth.loggedIn()) {
        this.router.navigate(['/recipes']);
      }
    });
  }

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    authorEmail: ['', [Validators.required, Validators.email]],
    description: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.valid) {
      const rawValues = this.form.getRawValue();
      this.submitting.set(true);
      this.recipes.addRecipe({
        id: "",
        name: rawValues.name,
        description: rawValues.description,
        authorEmail: rawValues.authorEmail,
        imgUrl: 'https://placehold.co/400x300',
        isFavorite: false,
        ingredients: [],
      }).pipe(
        tap(() => {
          this.recipes.refreshAll();
          this.form.reset();

          // Hack to ensure the form doesn't display errors upon clear after successful submission.
          if (this.nativeForm) {
            this.nativeForm.resetForm();
          }
        }),
        catchError((err) => {
          this.snackBar.open('Failed to save recipe. Please try again.', 'Dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
          return EMPTY;
        }),
        finalize(() => {
          this.submitting.set(false);
        })
      ).subscribe();
    }
  }
}
