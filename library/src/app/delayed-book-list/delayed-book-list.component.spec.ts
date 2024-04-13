import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedBookListComponent } from './delayed-book-list.component';

describe('DelayedBookListComponent', () => {
  let component: DelayedBookListComponent;
  let fixture: ComponentFixture<DelayedBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayedBookListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelayedBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
