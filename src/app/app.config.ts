import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { bookmarkReducer } from './core/state/bookmarks/bookmark.reducer';
import { BookmarkEffects } from './core/state/bookmarks/bookmark.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { metaReducers } from './core/state/app-meta-reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
    ]),
    provideStore({ bookmarks: bookmarkReducer, router: routerReducer }, {
      metaReducers: metaReducers
    }),
    provideEffects(BookmarkEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore()
  ]
};
