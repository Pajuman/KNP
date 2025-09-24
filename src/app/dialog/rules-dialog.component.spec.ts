import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RulesDialog} from './rules-dialog.component';

describe('Dialog', () => {
  let component: RulesDialog;
  let fixture: ComponentFixture<RulesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RulesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
