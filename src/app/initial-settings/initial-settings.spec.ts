import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSettings } from './initial-settings';

describe('InitialSettings', () => {
  let component: InitialSettings;
  let fixture: ComponentFixture<InitialSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
