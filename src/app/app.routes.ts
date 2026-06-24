import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { AddRecipe } from './add-recipe/add-recipe';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { AddRecipeSignal } from './add-recipe-signal/add-recipe-signal';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeList },
    { path: 'recipes/new', component: AddRecipe, canActivate: [authGuard] },
    { path: 'recipes/new_signal', component: AddRecipeSignal, canActivate: [authGuard] },
    { path: 'recipes/:id', component: RecipeDetail },
];
