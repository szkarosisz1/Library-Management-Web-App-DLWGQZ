import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedDvdListComponent } from './borrowed-dvd-list.component';

describe('BorrowedDvdListComponent', () => {
  let component: BorrowedDvdListComponent;
  let fixture: ComponentFixture<BorrowedDvdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedDvdListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowedDvdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
