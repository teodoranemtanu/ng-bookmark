import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { HeaderComponent } from './header.component';
import * as bookmarkActions from '../../core/state/bookmarks/bookmarks.actions';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate'], { events: new Subject() });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FormsModule],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
        provideAnimationsAsync()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchText as empty', () => {
    expect(component.searchedText).toBe('');
  });

  it('should clear search text on navigation start', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    (routerSpy.events as Subject<any>).next(new NavigationStart(1, '/some-route'));
    expect(component.searchedText).toBe('');
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.clearSearch());
  });

  it('should dispatch search action when valid search text is entered', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.search('Angular');
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.search({ query: 'Angular' }));
  });

  it('should dispatch clearSearch action when search text is empty', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.search('');
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.clearSearch());
  });

  it('should update search text on input change', () => {
    const searchText = 'Test';
    component.onSearchChange(searchText);
    expect(component.searchTextSubject).toBeTruthy();
  });

  it('should navigate to main page if not already on it', async () => {
    routerSpy.url = '/edit';
    await component.redirectToMainPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not navigate to main page if already there', async () => {
    routerSpy.url = '/';
    await component.redirectToMainPage();
    fixture.detectChanges();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should clear search text when clear() is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.clear();
    expect(component.searchedText).toBe('');
    expect(dispatchSpy).toHaveBeenCalledWith(bookmarkActions.clearSearch());
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscriptions[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
