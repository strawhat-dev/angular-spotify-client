import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermometerComponent } from './thermometer.component';

describe('ThermometerComponent', () => {
  let component: ThermometerComponent;
  let fixture: ComponentFixture<ThermometerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ThermometerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
