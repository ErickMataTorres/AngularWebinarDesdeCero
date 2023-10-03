import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Taller } from 'src/app/Clases/Taller/taller';
import { TalleresService } from 'src/app/Servicios/Talleres/talleres.service';
import { DialogTalleresComponent } from '../dialog-talleres/dialog-talleres.component';
import { Congreso } from 'src/app/Clases/Congreso/congreso';
import { FormControl, Validators } from '@angular/forms';
import { CongresosService } from 'src/app/Servicios/Congresos/congresos.service';
@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent { 
  displayedColumns: string[] = ["Nombre","Profesor","Cupo","Inscritos","Precio","Turno","Horario", "Accion"];
  dataSource!: MatTableDataSource<Taller>;
  congresos?:Congreso[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  congresosControl=new FormControl<Congreso|null>(null, Validators.required);

  constructor(
    private _congresoS: CongresosService,
    private _tallerS:TalleresService,
    public dialog: MatDialog
  ){}

  ngOnInit() {
    this._congresoS.spCongresos_Obtener().subscribe(response=>this.congresos=response);
    this.spTalleres_Obtener();
  }

  appendAlert(message: string, type: string, styles: string, icon: string) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')!;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div style="${styles}" data-bs-theme="dark" class="alert ${type} alert-dismissible" role="alert">`,
      `   <div style="font-size:large;">${message} ${icon}</div>`,
      `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
      '</div>'
    ].join('');
    alertPlaceholder.append(wrapper);
  }

  spTalleres_Obtener():void{
    this._tallerS.spTalleres_Obtener(Number(this.congresosControl.value)).subscribe(response=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(rowData: any, ponerTitulo: string): void {
    const dialogRef = this.dialog.open(DialogTalleresComponent, {
      data: { rowData, ponerTitulo },
      minWidth: "30%",
      width:"400px"
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result!==undefined&&result.variableBool===true) {
        if (ponerTitulo === "Nuevo") {
          this.congresosControl.setValue(result.variableSelect);
          this.spTalleres_Obtener();
          this.appendAlert("Se ha guardado correctamente", "", "background-color: #273646; color:white; text-align:center;", "<i class='fa-solid fa-circle-check' style='margin-left:10px;'></i>");
        } else {
          if (ponerTitulo === "Modificar") {
            this.congresosControl.setValue(result.variableSelect);
            this.spTalleres_Obtener();
            this.appendAlert("Se ha modificado correctamente", "", "background-color: #273646; color:white; text-align:center;", "<i class='fa-solid fa-pen-to-square' style='margin-left:10px;'></i>");
          } else {
            this.congresosControl.setValue(result.variableSelect);
            this.spTalleres_Obtener();
            this.appendAlert("Se ha borrado correctamente", "", "background-color: #1b5a4c; color:white; text-align:center;", "<i class='fa-solid fa-trash' style='margin-left:10px;'></i>");
          }
        }
      }
      /*
        setTimeout(() => {
          document.getElementById("liveAlertPlaceholder")!.style.display="none";
        }, 10000);
      */
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
