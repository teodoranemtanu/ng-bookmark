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
        id: '5baa7b2e-6da2-4501-88b3-2a1e847dfb80', name: 'StackOverflow', url: 'https://stackoverflow.com/', date: dayjs().subtract(1, 'day').toDate()
      },
      {
        id: '8675709c-bd87-4249-99df-9b8cb61cd791', name: 'Vue', url: 'https://vue.dev/', date: dayjs().subtract(1, 'day').toDate()
      },
      {
        id: 'b82aafed-f23d-4c75-b45b-1744343e3575', name: 'React', url: 'https://react.dev/', date: dayjs().subtract(1, 'day').toDate()
      },
      {
        id: '65dfb77a-b2a2-416f-ad4a-be296b4b1575', name: 'Angular', url: 'https://angular.dev/', date: new Date()
      },
      {
        id: '4cd81fb6-c6ac-49fb-a8d9-8713051d2350', name: 'RxJs', url: 'https://rxjs.dev/guide/operators', date: dayjs().subtract(2, 'day').toDate()
      },
      {
        id: '3cef7d64-0a3d-46d0-b3d1-a9e3f301e6a5', name: 'NgRx', url: 'https://ngrx.io/guide/store', date: dayjs().subtract(2, 'day').toDate()
      },
      {
        id: 'c48ee34d-62e5-48a8-81ac-6d4b94146656', name: 'Angular Material', url: 'https://material.angular.io/', date: dayjs().subtract(3, 'day').toDate()
      },
      {
        id: 'c48ee34d-62e5-48a8-81ac-6d4b23146656', name: 'MDN', url: 'https://developer.mozilla.org/en-US/', date: dayjs().subtract(4, 'day').toDate()
      },
    ];
    return { bookmarks };
  }

  constructor() { }
}
