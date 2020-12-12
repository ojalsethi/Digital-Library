
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDashComponent } from './due-dash.component';

describe('DueDashComponent', () => {
  let component: DueDashComponent;
  let fixture: ComponentFixture<DueDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DueDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
