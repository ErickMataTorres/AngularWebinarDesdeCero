import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Congreso } from 'src/app/Clases/Congreso/congreso';
import { Taller } from 'src/app/Clases/Taller/taller';
import { CongresosService } from 'src/app/Servicios/Congresos/congresos.service';
import { TalleresService } from 'src/app/Servicios/Talleres/talleres.service';
import { DialogInscripcionComponent } from '../dialog-inscripcion/dialog-inscripcion.component';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent {
  displayedColumns: string[] = ["Nombre","Profesor","Cupo","Inscritos","Turno","Horario", "Accion"];
  dataSource!: MatTableDataSource<Taller>;
  congresos?:Congreso[];
  Selected:any = {
    Talleres: [],
    Datos:{}
  };
  contadorTaller:number=0;
  congresosControl=new FormControl<Congreso|null>(null, Validators.required);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _congresoS: CongresosService,
    private _tallerS:TalleresService,
    private renderer:Renderer2,
    private element:ElementRef,
    public dialog:MatDialog
  ){}
  
  ngOnInit(){
    this._congresoS.spLlenarComboBoxCongresos().subscribe(response=>this.congresos=response);
  }

  spTalleres_Obtener():void{
    this._tallerS.spTalleres_Obtener(Number(this.congresosControl.value)).subscribe(response=>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  toggleClassSeleccionar(row: any):void {
    const button = this.element.nativeElement.querySelector(`#btnSeleccionar${row.Id}`);
    if(this.contadorTaller>0 && button.textContent!=='Seleccionado'){
      // console.log('Por el momento solo se permite seleccionar un taller a la vez');
      return;
    }
    if(button.textContent!=='Seleccionado'){
      this.renderer.addClass(button,'btnReimprimir');
      this.renderer.setProperty(button, 'textContent','Seleccionado');
      this.contadorTaller++;
      this.Selected.Talleres.push(row);
    }else{
      this.renderer.removeClass(button,'btnReimprimir');
      this.renderer.setProperty(button, 'textContent','Seleccionar');
      this.Selected.Talleres=[];
      this.contadorTaller--;
    }
  }

  openDialog( ponerTitulo: string): void {
    const dialogRef = this.dialog.open(DialogInscripcionComponent, {
      data: { ponerTitulo },
      minWidth: "30%",
      width:"400px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        
        // if (ponerTitulo === "Nuevo") {
        //   this.spProfesor_Obtener();
        //   this.appendAlert("Se ha guardado correctamente", "", "background-color: #273646; color:white; text-align:center;", "<i class='fa-solid fa-circle-check' style='margin-left:10px;'></i>");
        // } else {
        //   if (ponerTitulo === "Modificar") {
        //     this.spProfesor_Obtener();
        //     this.appendAlert("Se ha modificado correctamente", "", "background-color: #273646; color:white; text-align:center;", "<i class='fa-solid fa-pen-to-square' style='margin-left:10px;'></i>");
        //   } else {
        //     this.spProfesor_Obtener();
        //     this.appendAlert("Se ha borrado correctamente", "", "background-color: #1b5a4c; color:white; text-align:center;", "<i class='fa-solid fa-trash' style='margin-left:10px;'></i>");
        //   }
        // }
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
