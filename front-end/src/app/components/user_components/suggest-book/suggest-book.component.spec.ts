
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestBookComponent } from './suggest-book.component';

describe('SuggestBookComponent', () => {
  let component: SuggestBookComponent;
  let fixture: ComponentFixture<SuggestBookComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
