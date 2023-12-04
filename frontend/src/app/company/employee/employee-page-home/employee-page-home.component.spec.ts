import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePageHomeComponent } from './employee-page-home.component';

describe('EmployeePageHomeComponent', () => {
  let component: EmployeePageHomeComponent;
  let fixture: ComponentFixture<EmployeePageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EmployeePageHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
