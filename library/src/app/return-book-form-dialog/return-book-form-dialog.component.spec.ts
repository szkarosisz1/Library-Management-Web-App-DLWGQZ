import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBookFormDialogComponent } from './return-book-form-dialog.component';

describe('ReturnBookFormDialogComponent', () => {
  let component: ReturnBookFormDialogComponent;
  let fixture: ComponentFixture<ReturnBookFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnBookFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnBookFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
