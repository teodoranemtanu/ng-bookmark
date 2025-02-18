import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { Bookmark } from '../../core/models/bookmark.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-group',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  @Input() header: string = '';
  @Input() bookmarks: Bookmark[] = [];

  constructor(
    private router: Router
  ) {
  }

  goToEditPage(selectedBookmark: Bookmark) {
    this.router.navigate(['edit', selectedBookmark.id]);
  }
}
