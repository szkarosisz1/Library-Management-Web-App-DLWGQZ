import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBookListComponent } from './return-book-list.component';

describe('ReturnBookListComponent', () => {
  let component: ReturnBookListComponent;
  let fixture: ComponentFixture<ReturnBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnBookListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
