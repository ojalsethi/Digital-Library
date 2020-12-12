
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashComponent } from './user-dash.component';

describe('UserDashComponent', () => {
  let component: UserDashComponent;
  let fixture: ComponentFixture<UserDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
