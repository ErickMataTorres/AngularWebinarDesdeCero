import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Api_Url from 'src/Api_Url';
import { Profesor } from 'src/app/Clases/Profesor/profesor';
@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  constructor(
    private http: HttpClient
  ) { }
  spProfesores_Obtener(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(Api_Url + "/Profesores/spProfesores_Obtener");
  }
  spProfesores_Guardar(p: Profesor): Observable<string> {
    return this.http.post<string>(Api_Url + "/Profesores/spProfesores_Guardar", p);
  }
  spProfesores_Borrar(id: number): Observable<string> {
    return this.http.get<string>(Api_Url + `/Profesores/spProfesores_Borrar?id=` + id);
  }
}