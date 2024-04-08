import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CassetteFormDialogComponent } from './cassette-form-dialog.component';

describe('CassetteFormDialogComponent', () => {
  let component: CassetteFormDialogComponent;
  let fixture: ComponentFixture<CassetteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CassetteFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CassetteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
