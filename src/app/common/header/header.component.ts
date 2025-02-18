import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppState } from '../../core/state/app.state';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../../core/state/bookmarks/bookmarks.actions';
import { Observable } from 'rxjs';
import { selectSearchActive } from '../../core/state/bookmarks/bookmark.selector';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() showSearch: boolean = true;
  @Input() searchLabel = 'Search bookmark';

  searchActive$: Observable<boolean>;

  searchedText = '';

  constructor(
    private store: Store<AppState>
  ) {
    this.searchActive$ = this.store.select(selectSearchActive).pipe(
      tap((searchActive => {
        this.searchedText = searchActive ? this.searchedText : '';
      }))
    );
  }

  clear() {
    this.searchedText = '';
    this.store.dispatch(bookmarkActions.clearSearch());
  }

  search() {
    this.store.dispatch(bookmarkActions.search({ query: this.searchedText }));
  }
}
