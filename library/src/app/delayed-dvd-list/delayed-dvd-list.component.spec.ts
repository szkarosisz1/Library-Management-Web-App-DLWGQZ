import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedDvdListComponent } from './delayed-dvd-list.component';

describe('DelayedDvdListComponent', () => {
  let component: DelayedDvdListComponent;
  let fixture: ComponentFixture<DelayedDvdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayedDvdListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelayedDvdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
