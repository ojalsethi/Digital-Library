import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDelWarnComponent } from './book-del-warn.component';

describe('BookDelWarnComponent', () => {
  let component: BookDelWarnComponent;
  let fixture: ComponentFixture<BookDelWarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDelWarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDelWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
