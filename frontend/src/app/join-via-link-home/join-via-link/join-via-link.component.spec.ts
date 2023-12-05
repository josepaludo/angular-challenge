import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinViaLinkComponent } from './join-via-link.component';

describe('JoinViaLinkComponent', () => {
  let component: JoinViaLinkComponent;
  let fixture: ComponentFixture<JoinViaLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JoinViaLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinViaLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
