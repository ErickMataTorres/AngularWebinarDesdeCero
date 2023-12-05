import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inscrito } from 'src/app/Clases/Inscrito/inscrito';
import { AlumnosService } from 'src/app/Servicios/Alumnos/alumnos.service';
import { DialogInscripcionRespuestasComponent } from '../dialog-inscripcion-respuestas/dialog-inscripcion-respuestas.component';

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
    private _alumnoS:AlumnosService,
    public dialogRespuestas:MatDialog
  ){}
  ngOnInit():void{
    this.matDialogTitulo();

  }

  AbrirDialogRespuestas(respuesta:string):void{
    const dialogRef=this.dialogRespuestas.open(DialogInscripcionRespuestasComponent,{
      data: respuesta,
      minWidth: "30%",
      width:"400px"
    });
  }

  SoloNumeros(event:KeyboardEvent):void{
    const teclasPermitidas=/[0-9]|ArrowLeft|ArrowRight|Backspace|Delete|Home|End|Shift|Tab/;
    if(!teclasPermitidas.test(event.key)){
      event.preventDefault();
    }
  }

  SoloLetras(event:KeyboardEvent):void{
    const soloLetras=/^[a-zA-ZñÑáéíóú]+$/;
    if(this.nombreFormControl.value===""){
      if(event.code==="Space"){
        event.preventDefault();
        return;
      }
    }
    if(!soloLetras.test(event.key)&&event.code!=="Space"){
      event.preventDefault();
    }
  }

  NoEspaciosPrimero(event:KeyboardEvent):void{
    const valorInput=(event.target as HTMLInputElement).value;
    if(valorInput===""){
      if(event.code==="Space"){
        event.preventDefault();
      }
    }
  }

  BuscarAlumnoPorMatricula():void{

    if(this.matriculaFormControl.value===""){
      this.nombreFormControl.setValue("");
      this.carreraFormControl.setValue("");
      this.matriculaFormControl.markAsTouched();
      this.nombreFormControl.markAsUntouched();
      this.carreraFormControl.markAsUntouched();
      this.emailFormControl.markAsUntouched();
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
    } else  {
      this.data.datosInscripcion.Datos.Matricula=this.matriculaFormControl.value;
      this.data.datosInscripcion.Datos.Nombre=this.nombreFormControl.value;
      this.data.datosInscripcion.Datos.Carrera=this.carreraFormControl.value;
      this.data.datosInscripcion.Datos.Telefono=this.telefonoFormControl.value;
      this.data.datosInscripcion.Datos.FolioRecibo=this.folioFormControl.value;
      this.data.datosInscripcion.Datos.Taller= this.data.datosInscripcion.Talleres[0].Id;
      this.data.datosInscripcion.Datos.Correo=this.emailFormControl.value;
      this.data.datosInscripcion.Datos.LugarProcedencia=this.procedenciaFormControl.value;
      this.data.datosInscripcion.Datos.IdCongreso=this.data.datosInscripcion.Talleres[0].Congreso;
      this._alumnoS.spInscritos_Guardar(this.data.datosInscripcion.Datos).subscribe(response=>{
        if(response!=="1"){
          this.AbrirDialogRespuestas(response);
        }else{
          this.dialogRef.close("1");
        }
      });
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
