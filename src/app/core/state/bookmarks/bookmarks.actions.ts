import { createAction, props } from "@ngrx/store";
import { Bookmark } from "../../models/bookmark.model";

export const add = createAction(
  '[Bookmark Page] Add bookmark',
  props<{ name: string, url: string }>()
);

export const addSuccess = createAction(
  '[Bookmark Page] Bookmark Add Success',
  props<{ bookmark: Bookmark }>()
)

export const addFailure = createAction(
  '[Bookmarks Page] Bookmark Add Failure',
  props<{ error: string }>()
)

export const load = createAction(
  '[Bookmark Page] Load Bookmarks'
)

export const loadSuccess = createAction(
  '[Bookmark Page] Bookmark Load Success',
  props<{ bookmarks: Bookmark[] }>()
);

export const loadFailure = createAction(
  '[Bookmarks Page] Bookmark Load Failure',
  props<{ error: string }>()
)

export const edit = createAction(
  '[Bookmark Page] Edit bookmark',
  props<{ bookmark: Bookmark }>()
);

export const editSuccess = createAction(
  '[Bookmark Page] Bookmark Edit Success',
  props<{ bookmark: Bookmark }>()
)

export const editFailure = createAction(
  '[Bookmarks Page] Bookmark Edit Failure',
  props<{ error: string }>()
)

export const search = createAction(
  '[Bookmarks Page] Search Bookmark',
  props<{ query: string }>()
)

export const searchSuccess = createAction(
  '[Bookmarks Page] Bookmark Search Success',
  props<{ searchResults: Bookmark[] }>()
)

export const searchFailure = createAction(
  '[Bookmarks Page] Bookmark Search Failure',
  props<{ error: string }>()
)

export const clearSearch = createAction(
  '[Bookmark Page] Bookmark Search Clear'
)
