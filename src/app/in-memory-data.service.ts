import { Injectable } from '@angular/core';
import { Bookmark } from './core/models/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const bookmarks: Bookmark[] = [
      {
        id: '65dfb77a-b2a2-416f-ad4a-be296b4b1575', name: 'Angular', url: 'https://angular.dev/', date: new Date()

      },
      {
        id: 'b82aafed-f23d-4c75-b45b-1744343e3575', name: 'React', url: 'https://react.dev/', date: new Date()
      }
    ];
    return { bookmarks };
  }

  constructor() { }
}
