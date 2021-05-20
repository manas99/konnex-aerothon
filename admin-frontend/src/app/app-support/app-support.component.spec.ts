import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSupportComponent } from './app-support.component';

describe('AppSupportComponent', () => {
  let component: AppSupportComponent;
  let fixture: ComponentFixture<AppSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
