import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolMenuComponent } from './tool-menu.component';
import { RouterModule } from '@angular/router';

describe('ToolMenuComponent', () => {
  let component: ToolMenuComponent;
  let fixture: ComponentFixture<ToolMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolMenuComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
