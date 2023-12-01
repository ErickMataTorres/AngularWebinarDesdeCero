import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Api_Url from 'src/Api_Url';
import { Alumno } from 'src/app/Clases/Alumno/alumno';

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

}
