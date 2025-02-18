import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { BookmarkState } from "./bookmark.reducer";
import dayjs from 'dayjs';
import { GroupLabels } from "../../enums/group-labels.enum";
import { Bookmark } from "../../models/bookmark.model";

export const selectBookmarks = (state: AppState) => state.bookmarks;


export const selectAllBookmarks = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.bookmarks
);

export const selectBookmarksStatus = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.status
);

const isDateToday = (dateToCheck: Date): boolean => dayjs().isSame(dateToCheck, 'day');
const isDateYesterday = (dateToCheck: Date): boolean => dayjs().subtract(1, 'day').isSame(dateToCheck, 'day');

const getCurrentGroupType = (bookmarkDate: Date) => {
  if (isDateToday(bookmarkDate)) {
    return GroupLabels.today;
  } else if (isDateYesterday(bookmarkDate)) {
    return GroupLabels.yesterday;
  }
  return GroupLabels.others;
};

export const selectGroupedBookmarks = createSelector(
  selectAllBookmarks,
  (bookmarks) => {
    const bookmarkGroups: Map<GroupLabels, Bookmark[]> = new Map([[GroupLabels.today, []], [GroupLabels.yesterday, []], [GroupLabels.others, []]]);

    bookmarks.forEach(bookmark => {
      const currentGroupType = getCurrentGroupType(bookmark.date);
      bookmarkGroups.get(currentGroupType)?.push(bookmark);
    });

    return bookmarkGroups;
  }
);