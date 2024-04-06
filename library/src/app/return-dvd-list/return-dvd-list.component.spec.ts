import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDvdListComponent } from './return-dvd-list.component';

describe('ReturnDvdListComponent', () => {
  let component: ReturnDvdListComponent;
  let fixture: ComponentFixture<ReturnDvdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnDvdListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnDvdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
