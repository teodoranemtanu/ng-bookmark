import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from '../models/bookmark.model';
import { provideHttpClient } from '@angular/common/http';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [BookmarkService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(BookmarkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve bookmarks', () => {
    const mockBookmarks: Bookmark[] = [{ id: '1', name: 'Test Bookmark', url: 'testbookmarkurl.com', date: new Date() }];
    service.search().subscribe(bookmarks => {
      expect(bookmarks.length).toBe(1);
      expect(bookmarks).toEqual(mockBookmarks);
    });

    const req = httpMock.expectOne('api/bookmarks');
    expect(req.request.method).toBe('GET');
    req.flush(mockBookmarks);
  });

  it('should create a new bookmark', () => {
    const newBookmark: Bookmark = { id: '2', name: 'New Bookmark', url: 'testbookmarkurl.com', date: new Date() };
    service.create(newBookmark).subscribe(bookmark => {
      expect(bookmark).toEqual(newBookmark);
    });

    const req = httpMock.expectOne('api/bookmarks');
    expect(req.request.method).toBe('POST');
    req.flush(newBookmark);
  });

  it('should update an existing bookmark', () => {
    const updatedBookmark: Bookmark = { id: '1', name: 'Updated Bookmark', url: 'testbookmarkurl.com', date: new Date() };
    service.update(updatedBookmark).subscribe();

    const req = httpMock.expectOne(`api/bookmarks/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedBookmark);
  });
});
