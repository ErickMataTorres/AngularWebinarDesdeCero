import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from 'src/app/Clases/Profesor/profesor';
@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  url = "https://localhost:44386";
  constructor(
    private http: HttpClient
  ) { }
  spProfesores_Obtener(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.url + "/Profesores/spProfesores_Obtener");
  }
  spProfesores_Guardar(p: Profesor): Observable<string> {
    return this.http.post<string>(this.url + "/Profesores/spProfesores_Guardar", p);
  }
  spProfesores_Borrar(id: number): Observable<string> {
    return this.http.get<string>(this.url + `/Profesores/spProfesores_Borrar?id=` + id);
  }
}