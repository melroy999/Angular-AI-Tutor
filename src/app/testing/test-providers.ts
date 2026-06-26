import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Recipe } from '../recipe';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { Auth } from '../auth';
import { signal } from '@angular/core';

export const commonTestProviders = [
    provideRouter([]),
    {
        provide: ActivatedRoute, useValue: { snapshot: { params: {}, data: { recipes: [] } } }
    },
    {
        provide: Auth, useValue: {
            loggedIn:
                signal(true)
        }
    }
];

export const recipeMockProvider = [
    {
        provide: Recipe, useValue: {
            addRecipe: vi.fn().mockReturnValue(of({ id: '1', name: 'Test' })),
            fetchAll: vi.fn().mockReturnValue(of([])),
            searchRecipes: vi.fn().mockReturnValue(of([])),
        }
    }
]
