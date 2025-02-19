import { labels } from './../constants/labels';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '../../core/state/app.state';
import { Store } from '@ngrx/store';
import { selectBookmarksStatus } from '../state/bookmarks/bookmark.selector';
import { filter, Subscription } from 'rxjs';
import { BookmarksStatus } from '../enums/bookmarks-status.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  statusSubscription: Subscription | null = null;

  constructor(
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) {
  }

  initialize() {
    this.statusSubscription = this.store.select(selectBookmarksStatus).pipe(
      filter(({ status }) => [BookmarksStatus.error, BookmarksStatus.saveSuccess].includes(status))
    ).subscribe(({ status, error }) => {
      this.openSnackbar(status, error);
    });
  }

  openSnackbar(status: BookmarksStatus, error: string | null) {
    if (status === BookmarksStatus.saveSuccess) {
      this.openSnackbarSuccess();
      return;
    }
    if (status === BookmarksStatus.error) {
      this.openSnackbarError(error);
      return;
    }
  }

  openSnackbarSuccess() {
    this.snackbar.open(labels.saveSuccess, 'Dismiss', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

  openSnackbarError(error?: string | null) {
    const message = error ?? labels.error;
    this.snackbar.open(message, 'Dismiss', {
      duration: 3000,
      panelClass: 'error-snackbar'
    });
  }

  destroy() {
    this.statusSubscription?.unsubscribe();
  }
}


