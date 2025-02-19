import { selectBookmarkById } from '../../core/state/bookmarks/bookmark.selector';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Bookmark } from '../../core/models/bookmark.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AppState } from '../../core/state/app.state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import * as bookmarkActions from '../../core/state/bookmarks/bookmarks.actions';
import { labels } from '../../core/constants/labels';
import { isValidUrl } from '../../utils/string-utils';

@Component({
  selector: 'app-edit',
  imports: [MatCardModule, MatIconModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  bookmark$: Observable<Bookmark | null>;
  editedBookmark: Bookmark;
  labelsPath: any;

  isUpdateButtonDisabled: boolean = false;

  urlPattern = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?/

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.bookmark$ = this.store.select(selectBookmarkById).pipe((
      switchMap(bookmark => {
        this.editedBookmark = bookmark ? { ...bookmark as Bookmark } : { id: '', name: '', url: '', date: new Date() };
        return of(this.editedBookmark);
      })
    ));
    this.editedBookmark = { id: '', name: '', url: '', date: new Date() };
  }

  ngOnInit(): void {
    this.labelsPath = this.router.url?.includes('new') ? labels.new : labels.edit;
  }

  async updateBookmark() {
    if (!this.editedBookmark.name || !this.editedBookmark.url) {
      return;
    }

    if (!isValidUrl(this.editedBookmark.url, this.urlPattern)) {
      return;
    }

    if (this.router.url.includes('new')) {
      this.store.dispatch(bookmarkActions.add({ name: this.editedBookmark.name, url: this.editedBookmark.url }));
    } else {
      this.store.dispatch(bookmarkActions.edit({ bookmark: this.editedBookmark }));
    }
    await this.router.navigate(['']);
  }
}
