import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfBorrComponent } from './conf-borr.component';

describe('ConfBorrComponent', () => {
  let component: ConfBorrComponent;
  let fixture: ComponentFixture<ConfBorrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfBorrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfBorrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
