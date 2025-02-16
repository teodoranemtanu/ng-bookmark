import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bookmark } from '../models/bookmark.model';

export interface SearchBookmarkParams {
  id?: string;
  name?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  //TODO move to an enviroment file
  private bookmarksUrl = 'api/bookmarks';

  constructor(
    private http: HttpClient,
  ) { }

  search(params?: SearchBookmarkParams): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarksUrl);
  }

  create(body: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.bookmarksUrl, body);
  }

  update(body: Bookmark) {
    return this.http.put<null>(`${this.bookmarksUrl}/${body.id}`, body);
  }
}
