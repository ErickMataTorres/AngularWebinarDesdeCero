import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlumnosService } from 'src/app/Servicios/Alumnos/alumnos.service';

@Component({
  selector: 'app-dialog-inscripcion',
  templateUrl: './dialog-inscripcion.component.html',
  styleUrls: ['./dialog-inscripcion.component.css']
})
export class DialogInscripcionComponent {
  tituloMatDialog?: string;
  matriculaFormControl = new FormControl('', [Validators.required]);
  nombreFormControl = new FormControl('', [Validators.required]);
  carreraFormControl=new FormControl('', [Validators.required]);
  emailFormControl=new FormControl('',[Validators.required, Validators.email]);
  telefonoFormControl=new FormControl('', [Validators.required]);
  procedenciaFormControl=new FormControl('', [Validators.required]);
  folioFormControl=new FormControl('',[Validators.required]);
  configurarBotones: any = { configBotonConfirmar: "", configBotonCancelar: "" };
  inputReadOnly?: string;

  
  @ViewChild("txtNombre") txtNombre?:ElementRef;
  @ViewChild("txtCarrera")txtCarrera?:ElementRef;
  @ViewChild("txtEmail") txtEmail?:ElementRef;

  constructor(
    private dialogRef:MatDialogRef<DialogInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _alumnoS:AlumnosService
  ){}
  ngOnInit():void{
    this.matDialogTitulo();

  }

  BuscarAlumnoPorMatricula():void{

    if(this.matriculaFormControl.value===""){
      this.matriculaFormControl.markAsTouched();
      return;
    }

    this._alumnoS.spBuscarAlumnoPorMatricula(this.matriculaFormControl.value!.toString()).subscribe(response=>{
      if(response.Matricula===null){
        this.nombreFormControl.setValue("");
        this.carreraFormControl.setValue("");
        this.carreraFormControl.markAsUntouched();
        this.emailFormControl.markAsUntouched();
        return;
      }

      this.nombreFormControl.setValue(response.Nombre);
      
      if(response.Carrera===null||response.Carrera===""){
        this.carreraFormControl.setValue("");
        this.emailFormControl.markAsUntouched();
        this.txtCarrera?.nativeElement.focus();
      }
      else{
        this.carreraFormControl.setValue(response.Carrera);
        this.txtEmail?.nativeElement.focus();
      }
    })
  }

  

  Inscribirse():void{
    if(this.matriculaFormControl.value===""||this.nombreFormControl.value===""||this.carreraFormControl.value===""||this.emailFormControl.value===""||this.telefonoFormControl.value===""||this.procedenciaFormControl.value===""||this.folioFormControl.value===""){
      this.matriculaFormControl.markAsTouched();
      this.nombreFormControl.markAsTouched();
      this.carreraFormControl.markAsTouched();
      this.emailFormControl.markAsTouched();
      this.telefonoFormControl.markAsTouched();
      this.procedenciaFormControl.markAsTouched();
      this.folioFormControl.markAsTouched();
      return;
    }
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
