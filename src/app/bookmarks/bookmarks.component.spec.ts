import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BookmarksComponent } from './bookmarks.component';
import * as bookmarkActions from '../core/state/bookmarks/bookmarks.actions';
import { AppState } from '../core/state/app.state';
import { selectAllBookmarks, selectGroupedBookmarks, selectSearchActive, selectSearchResults, selectBookmarksStatus } from '../core/state/bookmarks/bookmark.selector';
import { GroupTypes } from '../core/enums/group-types.enum';
import { BookmarksStatus } from '../core/enums/bookmarks-status.enum';

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;
  let store: MockStore<AppState>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const initialState = {
    bookmarks: {
      allBookmarks: [],
      groupedBookmarks: new Map(),
      searchActive: false,
      searchResults: [],
      status: BookmarksStatus.pending,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarksComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllBookmarks, []);
    store.overrideSelector(selectGroupedBookmarks, new Map());
    store.overrideSelector(selectSearchActive, false);
    store.overrideSelector(selectSearchResults, []);
    store.overrideSelector(selectBookmarksStatus, BookmarksStatus.pending);

    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch load action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.load());
  });

  it('should dispatch clearSearch action and navigate when addBookmark is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.addBookmark();
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.clearSearch());
    expect(routerSpy.navigate).toHaveBeenCalledWith(['new']);
  });

  it('should correctly sort groups by key in ascending order', () => {
    const groupA = { key: GroupTypes.today, value: [] };
    const groupB = { key: GroupTypes.yesterday, value: [] };
    expect(component.sortGroupsByKeyAsc(groupA, groupB)).toBeLessThan(0);
    expect(component.sortGroupsByKeyAsc(groupB, groupA)).toBeGreaterThan(0);
  });
});