
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksDashComponent } from './bookmarks-dash.component';

describe('BookmarksDashComponent', () => {
  let component: BookmarksDashComponent;
  let fixture: ComponentFixture<BookmarksDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarksDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarksDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
