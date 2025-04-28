import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuComponent, RouterModule.forRoot([])],
      providers: [{ provide: MatDialog, useValue: dialogMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
