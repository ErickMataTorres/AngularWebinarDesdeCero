import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInscripcionRespuestasComponent } from './dialog-inscripcion-respuestas.component';

describe('DialogInscripcionRespuestasComponent', () => {
  let component: DialogInscripcionRespuestasComponent;
  let fixture: ComponentFixture<DialogInscripcionRespuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInscripcionRespuestasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogInscripcionRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
