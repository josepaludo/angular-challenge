import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRouterOutletComponent } from './company-router-outlet.component';

describe('CompanyRouterOutletComponent', () => {
  let component: CompanyRouterOutletComponent;
  let fixture: ComponentFixture<CompanyRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CompanyRouterOutletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
