import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CassetteListComponent } from './cassette-list.component';

describe('CassetteListComponent', () => {
  let component: CassetteListComponent;
  let fixture: ComponentFixture<CassetteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CassetteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CassetteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
