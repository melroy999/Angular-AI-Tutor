import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { authGuard } from './auth-guard';
import { recipeListResolver } from './recipe-list-resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeList, resolve: { recipes: recipeListResolver } },
    { path: 'recipes/new', loadComponent: () => import('./add-recipe/add-recipe').then(m => m.AddRecipe), canActivate: [authGuard] },
    { path: 'recipes/new_signal', loadComponent: () => import('./add-recipe-signal/add-recipe-signal').then(m => m.AddRecipeSignal), canActivate: [authGuard] },
    { path: 'recipes/:id', loadComponent: () => import('./recipe-detail/recipe-detail').then(m => m.RecipeDetail) },
];
