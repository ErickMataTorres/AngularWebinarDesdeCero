import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Congreso } from 'src/app/Clases/Congreso/congreso';
import { CongresosService } from 'src/app/Servicios/Congresos/congresos.service';

interface Estados {
  Valor:number;
  Nombre:string;
}

@Component({
  selector: 'app-dialog-congresos',
  templateUrl: './dialog-congresos.component.html',
  styleUrls: ['./dialog-congresos.component.css']
})
export class DialogCongresosComponent {
  estadosControl = new FormControl<Estados | null>(null,Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  estados: Estados[] = [
    {Valor: 1, Nombre: 'Activo'},
    {Valor: 0, Nombre: 'Inactivo'}
  ];
  inputReadOnly?: string;
  configurarBotones: any = { configBotonConfirmar: "", configBotonCancelar: "" };
  tituloMatDialog?: string;
  nombreFormControl = new FormControl('', [Validators.required]);
  constructor(
    private _congresoS: CongresosService,
    private dialogRef: MatDialogRef<DialogCongresosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  ngOnInit(): void {
    this.matDialogTitulo();
  }
  mostrarMensajesConfirmacion(): void {
    this.inputReadOnly = "readonly";
    const mensajeEstasSeguro = document.getElementById("mensajeEstasSeguro");
    const mensajeBorrarInstructor = document.getElementById("mensajeBorrarInstructor");
    const seguroWapper = document.createElement("p");
    const borrarWapper = document.createElement("p");
    seguroWapper.innerHTML = "¿Estás seguro?";
    borrarWapper.innerHTML = "Se va a borrar el instructor";
    seguroWapper.classList.add("text-center");
    // seguroWapper.style.color="#1b5a4c";
    // borrarWapper.style.color="#1b5a4c";
    borrarWapper.classList.add("text-center");
    mensajeEstasSeguro?.append(seguroWapper);
    mensajeBorrarInstructor?.append(borrarWapper);
  }
  matDialogTitulo(): void {
    if (this.data.ponerTitulo === "Nuevo") {
      this.tituloMatDialog = "Agregar nuevo instructor";
      this.configurarBotones.configBotonConfirmar = "Guardar";
      this.configurarBotones.configBotonCancelar = "Cerrar";
    } else {
      if (this.data.ponerTitulo === "Modificar") {
        this.tituloMatDialog = "Modificar instructor";
        this.configurarBotones.configBotonConfirmar = "Guardar";
        this.configurarBotones.configBotonCancelar = "Cerrar";
      } else {
        this.tituloMatDialog = "Borrar instructor";
        this.mostrarMensajesConfirmacion();
        this.configurarBotones.configBotonConfirmar = "Confirmar";
        this.configurarBotones.configBotonCancelar = "Cancelar";
      }
      this.nombreFormControl.setValue(this.data.rowData.Nombre);
    }
  }
  spCongresos_Guardar(nombre: string): void {
    if (nombre === ""||this.estadosControl.invalid) {
        this.estadosControl.markAsTouched();
      return;
    } else {
      if (this.data.ponerTitulo === "Nuevo" || this.data.ponerTitulo === "Modificar") {
        let p = new Congreso();
        if (this.data.ponerTitulo === "Nuevo") {
          p.Id = 0;
        } else {
          p.Id = this.data.rowData.Id;
        }
        p.Nombre = nombre;
        this._congresoS.spCongresos_Guardar(p).subscribe(response => {
          console.log(response);
        });
      } else {
        // p.Id=this.data.rowData.Id;
        this._congresoS.spCongresos_Borrar(this.data.rowData.Id).subscribe(response => {
          console.log(response);
        });
      }
      this.dialogRef.close(true);
    }
  }
}
