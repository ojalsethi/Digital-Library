import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnBorrowComponent } from './un-borrow.component';

describe('UnBorrowComponent', () => {
  let component: UnBorrowComponent;
  let fixture: ComponentFixture<UnBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
