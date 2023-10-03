import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGuardarProfesoresComponent } from './dialog-guardar-profesores.component';

describe('DialogGuardarProfesoresComponent', () => {
  let component: DialogGuardarProfesoresComponent;
  let fixture: ComponentFixture<DialogGuardarProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogGuardarProfesoresComponent]
    });
    fixture = TestBed.createComponent(DialogGuardarProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
