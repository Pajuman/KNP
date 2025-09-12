import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMat } from './play-mat';

describe('PlayMat', () => {
  let component: PlayMat;
  let fixture: ComponentFixture<PlayMat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayMat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayMat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
