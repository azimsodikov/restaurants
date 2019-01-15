import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoordinatesComponent } from './all-coordinates.component';

describe('AllCoordinatesComponent', () => {
  let component: AllCoordinatesComponent;
  let fixture: ComponentFixture<AllCoordinatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCoordinatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
