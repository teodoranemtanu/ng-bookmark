import { Bookmark } from './../core/models/bookmark.model';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../core/state/bookmarks/bookmarks.actions';
import { selectAllBookmarks, selectGroupedBookmarks } from '../core/state/bookmarks/bookmark.selector';
import { Observable } from 'rxjs';
import { AppState } from '../core/state/app.state';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { HeaderComponent } from "../common/header/header.component";
import { GroupComponent } from './group/group.component';
import { GroupLabels } from '../core/enums/group-labels.enum';

@Component({
  selector: 'app-bookmarks',
  imports: [CommonModule, HeaderComponent, TitleCasePipe, GroupComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {
  bookmarks$: Observable<Bookmark[]>;
  bookmarks: Bookmark[] = [];
  groupedByDateBookmarks: Map<GroupLabels, Bookmark[]> = new Map();
  GroupLabels = GroupLabels;

  groupedBookmarks$: Observable<Map<GroupLabels, Bookmark[]>>;

  constructor(
    private store: Store<AppState>
  ) {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
    this.groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
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

  sortGroups = () => 0;
}
