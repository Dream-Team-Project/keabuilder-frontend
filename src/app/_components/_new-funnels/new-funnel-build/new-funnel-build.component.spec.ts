import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFunnelBuildComponent } from './new-funnel-build.component';

describe('NewFunnelBuildComponent', () => {
  let component: NewFunnelBuildComponent;
  let fixture: ComponentFixture<NewFunnelBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFunnelBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFunnelBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
