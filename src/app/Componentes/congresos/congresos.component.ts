import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Congreso } from 'src/app/Clases/Congreso/congreso';
import { CongresosService } from 'src/app/Servicios/Congresos/congresos.service';
import { DialogCongresosComponent } from '../dialog-congresos/dialog-congresos.component';

@Component({
  selector: 'app-congresos',
  templateUrl: './congresos.component.html',
  styleUrls: ['./congresos.component.css']
})
export class CongresosComponent {
  displayedColumns: string[] = ["Nombre","Estado", "Accion"];
  dataSource!: MatTableDataSource<Congreso>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _congresoS: CongresosService,
    public dialog: MatDialog
  ){}
  ngOnInit(){
    this.spCongresos_Obtener();
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
  spCongresos_Obtener(): void {
    this._congresoS.spCongresos_Obtener().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(rowData: any, ponerTitulo: string): void {
    const dialogRef = this.dialog.open(DialogCongresosComponent, {
      data: { rowData, ponerTitulo },
      minWidth: "30%",
      width:"400px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (ponerTitulo === "Nuevo") {
          this.spCongresos_Obtener();
          this.appendAlert("Se ha guardado correctamente", "", "background-color: #273646; color:white; text-align:center;", "<i class='fa-solid fa-circle-check' style='margin-left:10px;'></i>");
        } else {
          if (ponerTitulo === "Modificar") {
            this.spCongresos_Obtener();
            this.appendAlert("Se ha modificado correctamente", "", "background-color: #273646; color:white; text-align:center;", "<i class='fa-solid fa-pen-to-square' style='margin-left:10px;'></i>");
          } else {
            this.spCongresos_Obtener();
            this.appendAlert("Se ha borrado correctamente", "", "background-color: #1b5a4c; color:white; text-align:center;", "<i class='fa-solid fa-trash' style='margin-left:10px;'></i>");
          }
        }
      }
      window.scrollTo({top:0, behavior:"smooth"});
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
