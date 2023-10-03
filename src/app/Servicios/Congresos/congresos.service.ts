import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Congreso } from 'src/app/Clases/Congreso/congreso';

@Injectable({
  providedIn: 'root'
})
export class CongresosService {
  url = "https://localhost:44386";
  constructor(
    private http: HttpClient
  ) { }
  spCongresos_Obtener(): Observable<Congreso[]> {
    return this.http.get<Congreso[]>(this.url + "/Congresos/spCongresos_Obtener");
  }
  spCongresos_Guardar(p: Congreso): Observable<string> {
    return this.http.post<string>(this.url + "/Congresos/spCongresos_Guardar", p);
  }
  spCongresos_Borrar(id: number): Observable<string> {
    return this.http.get<string>(this.url + `/Congresos/spCongresos_Borrar?id=` + id);
  }
}
