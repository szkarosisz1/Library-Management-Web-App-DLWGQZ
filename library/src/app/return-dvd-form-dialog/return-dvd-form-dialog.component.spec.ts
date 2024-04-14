import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDvdFormDialogComponent } from './return-dvd-form-dialog.component';

describe('ReturnDvdFormDialogComponent', () => {
  let component: ReturnDvdFormDialogComponent;
  let fixture: ComponentFixture<ReturnDvdFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnDvdFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnDvdFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
