import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../core/state/bookmarks/bookmarks.actions';
import { selectAllBookmarks } from '../core/state/bookmarks/bookmark.selector';
import { Observable } from 'rxjs';
import { Bookmark } from '../core/models/bookmark.model';
import { AppState } from '../core/state/app.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  imports: [CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {
  bookmarks$: Observable<Bookmark[]>;
  bookmarks: Bookmark[] = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
  }

  ngOnInit() {
    this.store.dispatch(bookmarkActions.load());
  }

  dispatchAdd() {
    this.store.dispatch(bookmarkActions.add({ url: 'test', name: 'test2' }));
  }

  dispatchEdit(bookmark: Bookmark) {
    console.log(bookmark);

    const editedBody = { ...bookmark, name: bookmark.name + 'edited' } as Bookmark;
    this.store.dispatch(bookmarkActions.edit({ bookmark: editedBody }));
  }
}
