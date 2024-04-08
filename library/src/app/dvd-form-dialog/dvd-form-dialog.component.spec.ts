import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdFormDialogComponent } from './dvd-form-dialog.component';

describe('DvdFormDialogComponent', () => {
  let component: DvdFormDialogComponent;
  let fixture: ComponentFixture<DvdFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DvdFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DvdFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
