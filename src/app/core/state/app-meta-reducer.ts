import { bookmarkReducer } from './bookmarks/bookmark.reducer';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreConfig } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  bookmarks: bookmarkReducer
};
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['bookmarks'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];