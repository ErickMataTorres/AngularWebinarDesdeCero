import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-inscripcion-respuestas',
  standalone: true,
  imports: [CommonModule, MatDialogModule,MatFormFieldModule],
  templateUrl: './dialog-inscripcion-respuestas.component.html',
  styleUrl: './dialog-inscripcion-respuestas.component.css'
})
export class DialogInscripcionRespuestasComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)public data:any
  ){}

  ngOnInit():void{
    
  }
}
