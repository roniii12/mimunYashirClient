import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameValueComponent } from './name-value.component';

describe('NameValueComponent', () => {
  let component: NameValueComponent;
  let fixture: ComponentFixture<NameValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
