import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { BookmarkState } from "./bookmark.reducer";
import dayjs from 'dayjs';
import { GroupTypes } from "../../enums/group-types.enum";
import { Bookmark } from "../../models/bookmark.model";
import { selectRouteParams } from "../router/router.selectors";

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


//TODO move utils functions to correct service
const isDateToday = (dateToCheck: Date): boolean => dayjs().isSame(dateToCheck, 'day');
const isDateYesterday = (dateToCheck: Date): boolean => dayjs().subtract(1, 'day').isSame(dateToCheck, 'day');

const getCurrentGroupType = (bookmarkDate: Date) => {
  if (isDateToday(bookmarkDate)) {
    return GroupTypes.today;
  } else if (isDateYesterday(bookmarkDate)) {
    return GroupTypes.yesterday;
  }
  return GroupTypes.others;
};

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