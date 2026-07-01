import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './http-error-interceptor';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { API_URL, MAX_RATING } from './tokens';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([httpErrorInterceptor])),
    provideClientHydration(withEventReplay()),
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: MAX_RATING, useValue: 10 }
  ],
};
