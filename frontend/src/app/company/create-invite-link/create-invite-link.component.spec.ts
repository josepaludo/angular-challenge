import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInviteLinkComponent } from './create-invite-link.component';

describe('CreateInviteLinkComponent', () => {
  let component: CreateInviteLinkComponent;
  let fixture: ComponentFixture<CreateInviteLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateInviteLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInviteLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
