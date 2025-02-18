import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BookmarkState } from './bookmark.reducer';
import { GroupTypes } from '../../enums/group-types.enum';
import { Bookmark } from '../../models/bookmark.model';
import { selectRouteParams } from '../router/router.selectors';
import { getCurrentGroupType } from '../../../utils/bookmark-group-utils';

export const selectBookmarks = (state: AppState) => state.bookmarks;

export const selectSearchActive = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.searchActive
);

export const selectSearchResults = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.searchResults
);

export const selectSearchQuery = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.searchQuery
);

export const selectAllBookmarks = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.bookmarks
);

export const selectBookmarksStatus = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.status
);

export const selectBookmarkById = createSelector(
  selectAllBookmarks,
  selectRouteParams,
  (bookmarks, { bookmarkId }) => bookmarks.find(item => item.id === bookmarkId) || null
);

export const selectGroupedBookmarks = createSelector(
  selectAllBookmarks,
  (bookmarks) => {
    const bookmarkGroups: Map<GroupTypes, Bookmark[]> = new Map();

    bookmarks.forEach(bookmark => {
      const currentGroupType = getCurrentGroupType(bookmark.date);
      if (!bookmarkGroups.has(currentGroupType)) {
        bookmarkGroups.set(currentGroupType, [bookmark]);
      } else {
        bookmarkGroups.get(currentGroupType)?.push(bookmark);
      }
    });

    return bookmarkGroups;
  }
);