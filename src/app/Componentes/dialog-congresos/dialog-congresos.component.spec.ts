import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCongresosComponent } from './dialog-congresos.component';

describe('DialogCongresosComponent', () => {
  let component: DialogCongresosComponent;
  let fixture: ComponentFixture<DialogCongresosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCongresosComponent]
    });
    fixture = TestBed.createComponent(DialogCongresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
