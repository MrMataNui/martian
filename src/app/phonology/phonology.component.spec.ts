import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonologyComponent } from './phonology.component';

describe('PhonologyComponent', () => {
  let component: PhonologyComponent;
  let fixture: ComponentFixture<PhonologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
