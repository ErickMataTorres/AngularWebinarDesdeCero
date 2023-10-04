import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Congreso } from 'src/app/Clases/Congreso/congreso';
import { Taller } from 'src/app/Clases/Taller/taller';
import { CongresosService } from 'src/app/Servicios/Congresos/congresos.service';
import { TalleresService } from 'src/app/Servicios/Talleres/talleres.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent {
  displayedColumns: string[] = ["Nombre","Profesor","Cupo","Inscritos","Turno","Horario", "Accion"];
  dataSource!: MatTableDataSource<Taller>;
  congresos?:Congreso[];
  congresosControl=new FormControl<Congreso|null>(null, Validators.required);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  seleccionar:boolean=false;
  constructor(
    private _congresoS: CongresosService,
    private _tallerS:TalleresService,
    private renderer:Renderer2,
    private element:ElementRef
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

  toggleClassSeleccionar(idTaller:string):void {
    
    const button = this.element.nativeElement.querySelector(`#${idTaller}`);
    if(button.textContent!=='Seleccionado'){
      this.renderer.addClass(button,'btnReimprimir');
      this.renderer.setProperty(button, 'textContent','Seleccionado');
      
    }else{
      this.renderer.removeClass(button,'btnReimprimir');
      this.renderer.setProperty(button, 'textContent','Seleccionar');
      
    }
    console.log(button.textContent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
