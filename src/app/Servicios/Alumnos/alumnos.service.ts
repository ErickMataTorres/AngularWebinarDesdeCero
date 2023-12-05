import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Api_Url from 'src/Api_Url';
import { Alumno } from 'src/app/Clases/Alumno/alumno';
import { Inscrito } from 'src/app/Clases/Inscrito/inscrito';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http:HttpClient
  ) { }

  spBuscarAlumnoPorMatricula(matricula:string):Observable<Alumno>{
    return this.http.get<Alumno>(Api_Url+`/Alumnos/spBuscarAlumnoPorMatricula?matricula=${matricula}`);
  }

  spInscritos_Guardar(inscrito: Inscrito):Observable<string>{
    let params=new HttpParams()
      .set("Matricula", inscrito.Matricula)
      .set("Nombre",inscrito.Nombre)
      .set("Carrera",inscrito.Carrera)
      .set("Telefono",inscrito.Telefono)
      .set("FolioRecibo",inscrito.FolioRecibo)
      .set("Taller",inscrito.Taller)
      .set("Correo",inscrito.Correo)
      .set("LugarProcedencia",inscrito.LugarProcedencia)
      .set("IdCongreso",inscrito.IdCongreso);
    return this.http.get<string>(Api_Url+"/Alumnos/spInscritos_Guardar",{params:params});
  }

}
