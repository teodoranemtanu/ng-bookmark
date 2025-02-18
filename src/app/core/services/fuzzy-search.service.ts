import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { Bookmark } from '../models/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class FuzzySearchService {
  constructor() { }

  search(items: Bookmark[], query: string, keys: string[]) {
    const options = {
      keys,
      threshold: 0.6
    };

    const fuse = new Fuse(items, options);
    return fuse.search(query).map(result => result.item);
  }
}
