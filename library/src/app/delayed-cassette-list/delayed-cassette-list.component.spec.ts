import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayedCassetteListComponent } from './delayed-cassette-list.component';

describe('DelayedCassetteListComponent', () => {
  let component: DelayedCassetteListComponent;
  let fixture: ComponentFixture<DelayedCassetteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayedCassetteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelayedCassetteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
