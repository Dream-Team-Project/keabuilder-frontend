import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFunnelArchiveComponent } from './new-funnel-archive.component';

describe('NewFunnelArchiveComponent', () => {
  let component: NewFunnelArchiveComponent;
  let fixture: ComponentFixture<NewFunnelArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFunnelArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFunnelArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
