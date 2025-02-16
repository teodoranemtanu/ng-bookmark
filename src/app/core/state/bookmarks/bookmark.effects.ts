import { BookmarkService } from './../../services/bookmark.service';
import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookmarkActions from './bookmarks.actions';
import { catchError, map, switchMap, takeLast, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';

@Injectable()
export class BookmarkEffects {
  private actions$ = inject(Actions);

  constructor(
    private store: Store<AppState>,
    private bookmarkService: BookmarkService
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
        return this.bookmarkService.create({
          name: action.name,
          url: action.url,
          date: new Date(),
          id: uuidv4()
        }).pipe(
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
        return this.bookmarkService.update(action.bookmark).pipe(
          map(() => {
            return bookmarkActions.editSuccess({ bookmark: action.bookmark })
          }),
          catchError(error => { console.log(error); return of(bookmarkActions.addFailure({ error })) }
          )
        )
      })
    )
  });
}