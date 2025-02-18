import { selectSearchActive, selectSearchResults } from './../core/state/bookmarks/bookmark.selector';
import { Bookmark } from './../core/models/bookmark.model';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../core/state/bookmarks/bookmarks.actions';
import { selectAllBookmarks, selectGroupedBookmarks } from '../core/state/bookmarks/bookmark.selector';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { AppState } from '../core/state/app.state';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { GroupLabels } from '../core/enums/group-labels.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  imports: [CommonModule, TitleCasePipe, GroupComponent, MatButtonModule, MatIconModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {
  bookmarks$: Observable<Bookmark[]>;
  bookmarks: Bookmark[] = [];
  groupedByDateBookmarks: Map<GroupLabels, Bookmark[]> = new Map();
  GroupLabels = GroupLabels;

  groupedBookmarks$: Observable<Map<GroupLabels, Bookmark[]>>;

  searchResult$: Observable<Bookmark[]>;
  searchActive$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
    this.groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
    this.searchActive$ = this.store.select(selectSearchActive);
    this.searchResult$ = this.store.select(selectSearchResults);
  }

  ngOnInit() {
    this.store.dispatch(bookmarkActions.load());
  }

  addBookmark() {
    this.store.dispatch(bookmarkActions.clearSearch());
    this.router.navigate(['new']);
  }

  sortGroups = () => 0;
}
