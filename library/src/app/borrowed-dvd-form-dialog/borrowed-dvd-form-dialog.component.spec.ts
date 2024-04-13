import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedDvdFormDialogComponent } from './borrowed-dvd-form-dialog.component';

describe('BorrowedDvdFormDialogComponent', () => {
  let component: BorrowedDvdFormDialogComponent;
  let fixture: ComponentFixture<BorrowedDvdFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedDvdFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowedDvdFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
