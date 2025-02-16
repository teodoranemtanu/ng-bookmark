import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { BookmarkState } from "./bookmark.reducer";

export const selectBookmarks = (state: AppState) => state.bookmarks;

export const selectAllBookmarks = createSelector(
  selectBookmarks,
  (state: BookmarkState) => state.bookmarks
);