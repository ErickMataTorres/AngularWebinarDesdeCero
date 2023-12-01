import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Api_Url from 'src/Api_Url';
import { Taller } from 'src/app/Clases/Taller/taller';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {
  constructor(
    private http:HttpClient
  ) { }
  spTalleres_Obtener(congreso:number):Observable<Taller[]>{
    return this.http.get<Taller[]>(Api_Url+"/Talleres/spTalleres_Obtener?congreso="+congreso);
  }

  spTalleres_Guardar(p:Taller):Observable<string>{
    return this.http.post<string>(Api_Url+"/Talleres/spTalleres_Guardar",p);
  }

  spTalleres_Borrar(id:number):Observable<string>{
    return this.http.get<string>(Api_Url+"/Talleres/spTalleres_Borrar?id="+id);
  }

}
