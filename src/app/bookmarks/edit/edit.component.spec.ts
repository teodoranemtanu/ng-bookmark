import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { EditComponent } from './edit.component';
import { selectBookmarkById } from '../../core/state/bookmarks/bookmark.selector';
import * as bookmarkActions from '../../core/state/bookmarks/bookmarks.actions';
import { Bookmark } from '../../core/models/bookmark.model';
import { AppState } from '../../core/state/app.state';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let store: MockStore<AppState>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const mockBookmark: Bookmark = { id: '1', name: 'Test Bookmark', url: 'https://example.com', date: new Date() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComponent, FormsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectBookmarkById, value: mockBookmark }
          ]
        }),
        { provide: Router, useValue: routerSpy },
        provideAnimationsAsync()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a bookmark', () => {
    component.bookmark$.subscribe(bookmark => {
      expect(bookmark).toEqual(mockBookmark);
    });
  });

  it('should set labelsPath based on URL', () => {
    routerSpy.url = '/new';
    component.ngOnInit();
    expect(component.labelsPath).toBeDefined();
  });

  it('should disable the update button when name is empty or url is empty', () => {
    component.editedBookmark = { name: '', url: '', id: '1', date: new Date() };
    component.validateInputs();
    expect(component.isUpdateButtonDisabled).toBeTrue();

    component.editedBookmark = { name: 'Bookmark', url: '', id: '1', date: new Date() };
    component.validateInputs();
    expect(component.isUpdateButtonDisabled).toBeTrue();

    component.editedBookmark = { name: '', url: 'https://valid.url', id: '1', date: new Date() };
    component.validateInputs();
    expect(component.isUpdateButtonDisabled).toBeTrue();
  });

  it('should disable the update button when the URL is invalid', () => {
    component.editedBookmark = { name: 'Bookmark', url: 'invalid-url', id: '1', date: new Date() };
    component.validateInputs();
    expect(component.isUpdateButtonDisabled).toBeTrue();
  });

  it('should enable the update button when inputs are valid', () => {
    component.editedBookmark = { name: 'Bookmark', url: 'https://valid.url', id: '1', date: new Date() };
    component.validateInputs();
    expect(component.isUpdateButtonDisabled).toBeFalse();
  });



  it('should dispatch add action if creating a new bookmark', async () => {
    routerSpy.url = '/new';
    component.editedBookmark.name = 'New Bookmark';
    component.editedBookmark.url = 'https://valid-url.com';
    const dispatchSpy = spyOn(store, 'dispatch');
    await component.updateBookmark();
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.add({ name: 'New Bookmark', url: 'https://valid-url.com' }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should dispatch edit action if updating an existing bookmark', async () => {
    routerSpy.url = '/edit/1';
    component.editedBookmark.name = 'Updated Bookmark';
    component.editedBookmark.url = 'https://updated-url.com';
    const dispatchSpy = spyOn(store, 'dispatch');
    await component.updateBookmark();
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.edit({ bookmark: component.editedBookmark }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
