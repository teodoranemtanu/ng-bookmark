import { Injectable } from '@angular/core';
import { Bookmark } from './core/models/bookmark.model';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const bookmarks: Bookmark[] = [
      {
        id: 'b82aafed-f23d-4c75-b45b-1744343e3575', name: 'React', url: 'https://react.dev/', date: dayjs().subtract(1, 'day').toDate()
      },
      {
        id: '65dfb77a-b2a2-416f-ad4a-be296b4b1575', name: 'Angular', url: 'https://angular.dev/', date: new Date()

      },
      {
        id: '5baa7b2e-6da2-4501-88b3-2a1e847dfb80', name: 'Vue', url: 'https://vue.dev/', date: dayjs().subtract(2, 'day').toDate()
      }
    ];
    return { bookmarks };
  }

  constructor() { }
}
