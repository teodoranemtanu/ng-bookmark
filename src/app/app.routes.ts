import { Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { EditComponent } from './bookmarks/edit/edit.component';

export const routes: Routes = [
  {
    path: '', component: BookmarksComponent,
  },
  {
    path: 'new', component: EditComponent
  },
  {
    path: 'edit/:bookmarkId', component: EditComponent
  }
];
