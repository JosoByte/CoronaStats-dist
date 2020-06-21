import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpainStatsComponent } from './spain-stats-component';

describe('SpainStatsComponent', () => {
  let component: SpainStatsComponent;
  let fixture: ComponentFixture<SpainStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpainStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpainStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
