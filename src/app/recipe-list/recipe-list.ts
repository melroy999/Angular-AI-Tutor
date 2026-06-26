import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, of, skip, startWith, switchMap } from 'rxjs';
import { Recipe } from '../recipe';
import { Card } from '../card/card';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Auth } from '../auth';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, Card],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly searchTerm = signal<string>('');
  private readonly searchTerm$ = toObservable(this.searchTerm);
  private recipes = inject(Recipe);
  private route = inject(ActivatedRoute);
  protected auth = inject(Auth);

  protected readonly results$ = this.searchTerm$.pipe(
    // Skip the initial '' emission from searchTerm$'s toObservable.
    skip(1),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term)=> {
      return this.recipes.searchRecipes(term.trim()).pipe(
        // Convert the result to a state object.
        map((data) => ({ loading: false, error: null, results: data })),
        // An Observable is expected; use of() to wrap a plain value into an Observable.
        catchError((err) => of({ loading: false, error: err, results: [] })),
        // Emit a state object immediately while the actual request is in-flight.
        startWith({ loading: true, error: null, results: [] })
      )
    }),
  );
  protected readonly filtered = toSignal(
    this.results$, 
    { initialValue: { loading: false, error: null, results: this.route.snapshot.data['recipes'] } }
  );
}
