
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDashComponent } from './book-dash.component';

describe('BookDashComponent', () => {
  let component: BookDashComponent;
  let fixture: ComponentFixture<BookDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
