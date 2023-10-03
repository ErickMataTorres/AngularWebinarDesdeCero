import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TalleresService } from 'src/app/Servicios/Talleres/talleres.service';
import { Taller } from "src/app/Clases/Taller/taller";
import { Profesor } from 'src/app/Clases/Profesor/profesor';
import { Congreso } from 'src/app/Clases/Congreso/congreso';
import { ProfesoresService } from 'src/app/Servicios/Profesores/profesores.service';
import { CongresosService } from 'src/app/Servicios/Congresos/congresos.service';
interface Turnos {
  Valor: number;
  Nombre: string;
}
@Component({
  selector: 'app-dialog-talleres',
  templateUrl: './dialog-talleres.component.html',
  styleUrls: ['./dialog-talleres.component.css']
})

export class DialogTalleresComponent {

  selectFormControl = new FormControl('', Validators.required);

  profesores?: Profesor[];
  congresos?: Congreso[];

  turnos: Turnos[] = [
    { Valor: 0, Nombre: 'Matutino' },
    { Valor: 1, Nombre: 'Vespertino' }
  ];
  inputReadOnly?: boolean;
  configurarBotones: any = { configBotonConfirmar: "", configBotonCancelar: "" };
  tituloMatDialog?: string;

  congresosControl = new FormControl<Congreso | null>(null, Validators.required);
  turnosControl = new FormControl<Turnos | null>(null, Validators.required);
  profesoresControl = new FormControl<Profesor | null>(null, Validators.required);

  nombreFormControl = new FormControl('', [Validators.required]);
  cupoFormControl = new FormControl('', [Validators.required]);
  precioFormControl = new FormControl('', [Validators.required]);
  horarioFormControl = new FormControl('', [Validators.required]);

  constructor(
    private _tallerS: TalleresService,
    private _profesorS: ProfesoresService,
    private _congresoS: CongresosService,
    private dialogRef: MatDialogRef<DialogTalleresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.matDialogTitulo();
  }
  mostrarMensajesConfirmacion(): void {
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
    // console.log(this.data.rowData.Estado);
    // console.log(this.estadosControl);
  }
  matDialogTitulo(): void {
    if (this.data.ponerTitulo === "Nuevo") {
      this.tituloMatDialog = "Agregar nuevo taller";
      this.configurarBotones.configBotonConfirmar = "Guardar";
      this.configurarBotones.configBotonCancelar = "Cerrar";
      this.inputReadOnly = false;
      this._profesorS.spProfesores_Obtener().subscribe(response => this.profesores = response);
      this._congresoS.spCongresos_Obtener().subscribe(response => this.congresos = response);
    } else {
      if (this.data.ponerTitulo === "Modificar") {
        this.tituloMatDialog = "Modificar taller";
        this.configurarBotones.configBotonConfirmar = "Guardar";
        this.configurarBotones.configBotonCancelar = "Cerrar";
        this.inputReadOnly = false;
        this._profesorS.spProfesores_Obtener().subscribe(response => this.profesores = response);
        this._congresoS.spCongresos_Obtener().subscribe(response => this.congresos = response);
      } else {
        this.tituloMatDialog = "Borrar taller";
        this.mostrarMensajesConfirmacion();
        this.configurarBotones.configBotonConfirmar = "Confirmar";
        this.configurarBotones.configBotonCancelar = "Cancelar";
        this.inputReadOnly = true;
      }
      this.nombreFormControl.setValue(this.data.rowData.Nombre);
      this.profesoresControl.setValue(this.data.rowData.Profesor);
      this.congresosControl.setValue(this.data.rowData.Congreso);
      this.cupoFormControl.setValue(this.data.rowData.Cupo);
      this.precioFormControl.setValue(this.data.rowData.Precio);
      this.turnosControl.setValue(this.data.rowData.Turno);
      this.horarioFormControl.setValue(this.data.rowData.Horario);
    }
  }

  spCongresos_Guardar(): void {

    if (this.nombreFormControl.value === "" || this.profesoresControl.value === null || this.congresosControl.value === null || this.cupoFormControl.value === "" || this.precioFormControl.value === "" || this.turnosControl.value === null || this.horarioFormControl.value === "") {
      this.profesoresControl.markAsTouched();
      this.congresosControl.markAsTouched();
      this.cupoFormControl.markAsTouched();
      this.precioFormControl.markAsTouched();
      this.turnosControl.markAsTouched();
      this.horarioFormControl.markAsTouched();
      return;
    } else {
      if (this.data.ponerTitulo === "Nuevo" || this.data.ponerTitulo === "Modificar") {
        let p = new Taller();
        if (this.data.ponerTitulo === "Nuevo") {
          p.Id = 0;
        } else {
          p.Id = this.data.rowData.Id;
        }
        p.Nombre = this.nombreFormControl.value!;
        p.Profesor = Number(this.profesoresControl.value);
        p.Congreso = Number(this.congresosControl.value);
        p.Cupo = Number(this.cupoFormControl.value);
        p.Precio = Number(this.precioFormControl.value);
        p.Turno = Number(this.turnosControl.value);
        p.Horario = this.horarioFormControl.value!;
        this._tallerS.spTalleres_Guardar(p).subscribe(response => {
          console.log(response);
        });
      } else {

        this._tallerS.spTalleres_Borrar(this.data.rowData.Id).subscribe(response => {
          console.log(response);
        });

      }
      const resultado = {
        variableBool: true,
        variableSelect: this.congresosControl.value
      };
      this.dialogRef.close(resultado);
    }
  }
}
