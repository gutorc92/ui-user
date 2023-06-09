import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDetailComponent } from './logs-detail.component';

describe('LogsDetailComponent', () => {
  let component: LogsDetailComponent;
  let fixture: ComponentFixture<LogsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
