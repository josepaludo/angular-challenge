import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinViaLinkHomeComponent } from './join-via-link-home.component';

describe('JoinViaLinkHomeComponent', () => {
  let component: JoinViaLinkHomeComponent;
  let fixture: ComponentFixture<JoinViaLinkHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ JoinViaLinkHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinViaLinkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
