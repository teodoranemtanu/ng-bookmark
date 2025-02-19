import { SnackbarService } from './core/services/snackbar.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { TitleCasePipe } from '@angular/common';
import { labels } from '../app/core/constants/labels'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  labels = labels;

  constructor(
    private snackbar: SnackbarService
  ) {
  }

  ngOnInit() {
    this.snackbar.initialize();
  }

  ngOnDestroy() {
    this.snackbar.destroy
  }
}
