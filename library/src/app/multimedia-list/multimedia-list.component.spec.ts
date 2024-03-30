import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaListComponent } from './multimedia-list.component';

describe('MultimediaListComponent', () => {
  let component: MultimediaListComponent;
  let fixture: ComponentFixture<MultimediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultimediaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultimediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
