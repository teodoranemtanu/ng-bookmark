import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
  private bookmarksUrl = 'api/bookmarks';

  constructor(
    private http: HttpClient,
  ) { }

  search(params?: SearchBookmarkParams): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarksUrl);
  }

  create(body: Bookmark): Observable<Bookmark> {
    // return throwError('Error creating bookmark');
    return this.http.post<Bookmark>(this.bookmarksUrl, body);
  }

  update(body: Bookmark) {
    return this.http.put<Bookmark>(`${this.bookmarksUrl}/${body.id}`, body);
  }
}
