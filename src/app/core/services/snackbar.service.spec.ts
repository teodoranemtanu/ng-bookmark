import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { provideStore } from '@ngrx/store';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore({})
      ]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
