import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

export const MAX_RATING = new InjectionToken<number>('MAX_RATING', {
    providedIn: 'root',
    factory: () => 5,
})