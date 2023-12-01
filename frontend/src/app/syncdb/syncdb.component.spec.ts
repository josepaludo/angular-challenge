import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncdbComponent } from './syncdb.component';

describe('SyncdbComponent', () => {
  let component: SyncdbComponent;
  let fixture: ComponentFixture<SyncdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SyncdbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
