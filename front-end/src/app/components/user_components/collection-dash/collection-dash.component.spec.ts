
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDashComponent } from './collection-dash.component';

describe('CollectionDashComponent', () => {
  let component: CollectionDashComponent;
  let fixture: ComponentFixture<CollectionDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
