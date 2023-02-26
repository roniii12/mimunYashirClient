import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostomerDetailsComponent } from './costomer-details.component';

describe('CostomerDetailsComponent', () => {
  let component: CostomerDetailsComponent;
  let fixture: ComponentFixture<CostomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostomerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
