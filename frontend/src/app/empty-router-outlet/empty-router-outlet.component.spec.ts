import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyRouterOutletComponent } from './empty-router-outlet.component';

describe('EmptyRouterOutletComponent', () => {
  let component: EmptyRouterOutletComponent;
  let fixture: ComponentFixture<EmptyRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EmptyRouterOutletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
