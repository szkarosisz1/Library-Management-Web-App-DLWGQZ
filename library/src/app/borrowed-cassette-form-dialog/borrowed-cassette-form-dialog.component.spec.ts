import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedCassetteFormDialogComponent } from './borrowed-cassette-form-dialog.component';

describe('BorrowedCassetteFormDialogComponent', () => {
  let component: BorrowedCassetteFormDialogComponent;
  let fixture: ComponentFixture<BorrowedCassetteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedCassetteFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowedCassetteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
