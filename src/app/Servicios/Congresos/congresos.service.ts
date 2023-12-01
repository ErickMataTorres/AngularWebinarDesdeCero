import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Api_Url from 'src/Api_Url';
import { Congreso } from 'src/app/Clases/Congreso/congreso';

@Injectable({
  providedIn: 'root'
})
export class CongresosService {
  constructor(
    private http: HttpClient
  ) { }
  spCongresos_Obtener(): Observable<Congreso[]> {
    return this.http.get<Congreso[]>(Api_Url + "/Congresos/spCongresos_Obtener");
  }
  spCongresos_Guardar(p: Congreso): Observable<string> {
    return this.http.post<string>(Api_Url + "/Congresos/spCongresos_Guardar", p);
  }
  spCongresos_Borrar(id: number): Observable<string> {
    return this.http.get<string>(Api_Url + `/Congresos/spCongresos_Borrar?id=` + id);
  }
  spLlenarComboBoxCongresos():Observable<Congreso[]>{
    return this.http.get<Congreso[]>(Api_Url + "/Congresos/spLlenarComboBoxCongresos");
  }
}
