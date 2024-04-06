import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdListComponent } from './dvd-list.component';

describe('DvdListComponent', () => {
  let component: DvdListComponent;
  let fixture: ComponentFixture<DvdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DvdListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DvdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
