import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPageHomeComponent } from './company-page-home.component';

describe('CompanyPageHomeComponent', () => {
  let component: CompanyPageHomeComponent;
  let fixture: ComponentFixture<CompanyPageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CompanyPageHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
