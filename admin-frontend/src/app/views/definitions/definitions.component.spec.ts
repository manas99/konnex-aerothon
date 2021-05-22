import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefintionsComponent } from './defintions.component';

describe('DefintionsComponent', () => {
  let component: DefintionsComponent;
  let fixture: ComponentFixture<DefintionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefintionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefintionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
