import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedBookFormDialogComponent } from './borrowed-book-form-dialog.component';

describe('BorrowedBookFormDialogComponent', () => {
  let component: BorrowedBookFormDialogComponent;
  let fixture: ComponentFixture<BorrowedBookFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedBookFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowedBookFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
