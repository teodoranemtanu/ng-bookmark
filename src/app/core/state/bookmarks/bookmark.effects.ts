import { query } from '@angular/animations';
import { BookmarkService } from './../../services/bookmark.service';
import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookmarkActions from './bookmarks.actions';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { selectAllBookmarks } from './bookmark.selector';
import { FuzzySearchService } from '../../services/fuzzy-search.service';

@Injectable()
export class BookmarkEffects {
  private actions$ = inject(Actions);

  constructor(
    private store: Store<AppState>,
    private bookmarkService: BookmarkService,
    private fuzzy: FuzzySearchService
  ) { }

  loadBookmarks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookmarkActions.load),
      switchMap(() => {
        return this.bookmarkService.search().pipe(
          map(bookmarks => bookmarkActions.loadSuccess({ bookmarks: bookmarks })),
          catchError(error => of(bookmarkActions.loadFailure({ error })))
        )
      })
    )
  });

  createBookmark$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookmarkActions.add),
      switchMap((action) => {
        const bookmarkToCreate = { name: action.name, url: action.url, date: new Date(), id: uuidv4() };
        return this.bookmarkService.create(bookmarkToCreate).pipe(
          map(result => {
            return bookmarkActions.addSuccess({ bookmark: result })
          }),
          catchError(error => { console.log(error); return of(bookmarkActions.addFailure({ error })) }
          )
        )
      })
    )
  });

  updateBookmark$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookmarkActions.edit),
      switchMap((action) => {
        const bookmarkToEdit = action.bookmark;
        return this.bookmarkService.update(bookmarkToEdit).pipe(
          map(() => {
            return bookmarkActions.editSuccess({ bookmark: bookmarkToEdit })
          }),
          catchError(error => { console.log(error); return of(bookmarkActions.addFailure({ error })) }
          )
        )
      })
    )
  });

  searchBookmarks = createEffect(() => {
    return this.actions$.pipe(
      ofType(bookmarkActions.search),
      map(action => action.query),
      mergeMap(query => this.store.select(selectAllBookmarks).pipe(
        take(1),
        map(bookmarks => {
          const searchResults = this.fuzzy.search(bookmarks, query, ['name', 'url']);
          return bookmarkActions.searchSuccess({ searchResults });
        }),
        catchError(error => of(bookmarkActions.searchFailure({ error })))
      ))
    )
  });
}