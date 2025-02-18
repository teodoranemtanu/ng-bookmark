
import { selectBookmarksStatus, selectSearchActive, selectSearchResults } from './../core/state/bookmarks/bookmark.selector';
import { Bookmark } from './../core/models/bookmark.model';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../core/state/bookmarks/bookmarks.actions';
import { selectAllBookmarks, selectGroupedBookmarks } from '../core/state/bookmarks/bookmark.selector';
import { Observable } from 'rxjs';
import { AppState } from '../core/state/app.state';
import { CommonModule, KeyValue, TitleCasePipe } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { GroupTypes } from '../core/enums/group-types.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { labels } from '../core/constants/labels';
import { BookmarksStatus } from '../core/enums/bookmarks-status.enum';
import { LoadingSpinnerComponent } from '../common/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-bookmarks',
  imports: [CommonModule, TitleCasePipe, GroupComponent, MatButtonModule, MatIconModule, LoadingSpinnerComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {
  bookmarks$: Observable<Bookmark[]>;
  bookmarks: Bookmark[] = [];
  groupedByDateBookmarks: Map<GroupTypes, Bookmark[]> = new Map();
  GroupTypes = GroupTypes;

  groupedBookmarks$: Observable<Map<GroupTypes, Bookmark[]>>;

  searchResult$: Observable<Bookmark[]>;
  searchActive$: Observable<boolean>;
  isLoading$: Observable<BookmarksStatus>;

  labels = labels;
  BookmarksStatus = BookmarksStatus;

  constructor(
    private store: Store<AppState>,
    public router: Router
  ) {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
    this.groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
    this.searchActive$ = this.store.select(selectSearchActive);
    this.searchResult$ = this.store.select(selectSearchResults);
    this.isLoading$ = this.store.select(selectBookmarksStatus);
  }

  ngOnInit() {
    this.store.dispatch(bookmarkActions.load());
  }

  addBookmark() {
    this.store.dispatch(bookmarkActions.clearSearch());
    this.router.navigate(['new']);
  }

  sortGroupsByKeyAsc = (a: KeyValue<GroupTypes, Bookmark[]>, b: KeyValue<GroupTypes, Bookmark[]>): number => {
    return a.key - b.key;
  }
}
