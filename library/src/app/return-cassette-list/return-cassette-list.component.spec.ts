import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCassetteListComponent } from './return-cassette-list.component';

describe('ReturnCassetteListComponent', () => {
  let component: ReturnCassetteListComponent;
  let fixture: ComponentFixture<ReturnCassetteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnCassetteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnCassetteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
