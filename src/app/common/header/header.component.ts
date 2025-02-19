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
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { labels } from '../../core/constants/labels';

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
  labels = labels;

  searchTextSubject = new Subject<string>();

  searchedText = '';

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    public router: Router
  ) {

    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.searchedText = '';
        this.store.dispatch(bookmarkActions.clearSearch());
      }
    });

    this.subscriptions.push(routerSubscription);

    this.createDebounceLogic();

    this.searchedText = '';
  }

  createDebounceLogic() {
    const searchTextSubscription = this.searchTextSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(searchText => {
        this.search(searchText.trim());
      });


    this.subscriptions.push(searchTextSubscription);
  }

  clear() {
    this.searchedText = '';
    this.store.dispatch(bookmarkActions.clearSearch());
  }

  search(searchText: string) {
    if (searchText) {
      this.store.dispatch(bookmarkActions.search({ query: searchText }));
    } else {
      this.store.dispatch(bookmarkActions.clearSearch());
    }
  }

  onSearchChange(value: any) {
    this.searchTextSubject.next(value);
  }

  async redirectToMainPage() {
    if (this.router.url === '/' || !this.router.url) {
      return Promise.resolve();
    }
    await this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
