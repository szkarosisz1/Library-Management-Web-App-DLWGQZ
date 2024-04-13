import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedCassetteListComponent } from './borrowed-cassette-list.component';

describe('BorrowedCassetteListComponent', () => {
  let component: BorrowedCassetteListComponent;
  let fixture: ComponentFixture<BorrowedCassetteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedCassetteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowedCassetteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
