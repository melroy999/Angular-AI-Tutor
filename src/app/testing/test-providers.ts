import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Recipe } from '../recipe';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { Auth } from '../auth';
import { signal } from '@angular/core';
import { API_URL } from '../tokens';

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
    },
    { provide: API_URL, useValue: 'http://localhost:3000' },
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
