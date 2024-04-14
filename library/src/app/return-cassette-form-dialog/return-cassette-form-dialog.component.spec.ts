import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCassetteFormDialogComponent } from './return-cassette-form-dialog.component';

describe('ReturnCassetteFormDialogComponent', () => {
  let component: ReturnCassetteFormDialogComponent;
  let fixture: ComponentFixture<ReturnCassetteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnCassetteFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnCassetteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
