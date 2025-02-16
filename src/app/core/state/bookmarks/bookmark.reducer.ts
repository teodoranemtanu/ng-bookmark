import { createReducer, on } from "@ngrx/store";
import { Bookmark } from "../../models/bookmark.model";
import * as bookmarkActions from "./bookmarks.actions";
import { BookmarksStatus } from "../../enums/bookmarks-status.enum";

export interface BookmarkState {
  bookmarks: Bookmark[],
  error: string | null,
  status: BookmarksStatus
}

export const initialState: BookmarkState = {
  bookmarks: [],
  error: null,
  status: BookmarksStatus.pending
}

export const bookmarkReducer = createReducer(
  initialState,

  on(bookmarkActions.load, (state) => ({ ...state, status: BookmarksStatus.loading })),
  on(bookmarkActions.loadSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks: bookmarks,
    error: null,
    status: BookmarksStatus.success
  })),
  on(bookmarkActions.loadFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: BookmarksStatus.error
  })),

  on(bookmarkActions.add, (state, { name, url }) => ({
    ...state,
    status: BookmarksStatus.loading
  })),
  on(bookmarkActions.addSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: [...state.bookmarks, bookmark],
    status: BookmarksStatus.success
  })),
  on(bookmarkActions.addFailure, (state, { error }) => ({
    ...state,
    status: BookmarksStatus.error,
    error: error
  })),

  on(bookmarkActions.edit, (state, { bookmark }) => ({
    ...state,
    status: BookmarksStatus.loading
  })),
  on(bookmarkActions.editSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: state.bookmarks.map(item => item.id === bookmark.id ? { ...item, ...bookmark } : item),
    status: BookmarksStatus.success
  })),
  on(bookmarkActions.editFailure, (state, { error }) => ({
    ...state,
    status: BookmarksStatus.error,
    error: error
  }))
);