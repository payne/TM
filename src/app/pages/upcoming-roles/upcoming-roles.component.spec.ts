import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingRolesComponent } from './upcoming-roles.component';

describe('UpcomingRolesComponent', () => {
  let component: UpcomingRolesComponent;
  let fixture: ComponentFixture<UpcomingRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
