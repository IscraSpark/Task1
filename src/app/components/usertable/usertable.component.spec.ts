import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsectComponent } from './usertable.component';

describe('AdsectComponent', () => {
  let component: AdsectComponent;
  let fixture: ComponentFixture<AdsectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
