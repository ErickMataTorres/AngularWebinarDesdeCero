import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-inscripcion',
  templateUrl: './dialog-inscripcion.component.html',
  styleUrls: ['./dialog-inscripcion.component.css']
})
export class DialogInscripcionComponent {
  tituloMatDialog?: string;
  nombreFormControl = new FormControl('', [Validators.required]);
  matriculaFormControl = new FormControl('', [Validators.required]);
  carreraFormControl=new FormControl('', [Validators.required]);
  emailFormControl=new FormControl('',[Validators.required, Validators.email]);
  telefonoFormControl=new FormControl('', [Validators.required]);
  procedenciaFormControl=new FormControl('', [Validators.required]);
  folioFormControl=new FormControl('',[Validators.required]);
  configurarBotones: any = { configBotonConfirmar: "", configBotonCancelar: "" };
  inputReadOnly?: string;
  constructor(
    private dialogRef:MatDialogRef<DialogInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  ngOnInit():void{
    this.matDialogTitulo();

  }

  Inscribirse():void{
    
  }

  matDialogTitulo(): void {

    this.tituloMatDialog="Terminar inscripción";

    this.configurarBotones.configBotonConfirmar="Inscribirse";
    this.configurarBotones.configBotonCancelar="Cancelar";

    // if (this.data.ponerTitulo === "Nuevo") {
    //   this.tituloMatDialog = "Agregar nuevo instructor";
    //   this.configurarBotones.configBotonConfirmar = "Guardar";
    //   this.configurarBotones.configBotonCancelar = "Cerrar";
    // } else {
    //   if (this.data.ponerTitulo === "Modificar") {
    //     this.tituloMatDialog = "Modificar instructor";
    //     this.configurarBotones.configBotonConfirmar = "Guardar";
    //     this.configurarBotones.configBotonCancelar = "Cerrar";
    //   } else {
    //     this.tituloMatDialog = "Borrar instructor";
    //     // this.mostrarMensajesConfirmacion();
    //     this.configurarBotones.configBotonConfirmar = "Confirmar";
    //     this.configurarBotones.configBotonCancelar = "Cancelar";
    //   }
    //   this.nombreFormControl.setValue(this.data.rowData.Nombre);
    // }
  }
}
