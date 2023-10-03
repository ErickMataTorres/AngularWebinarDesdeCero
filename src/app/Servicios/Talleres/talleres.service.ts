import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taller } from 'src/app/Clases/Taller/taller';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {
  url = "https://localhost:44386";
  constructor(
    private http:HttpClient
  ) { }
  spTalleres_Obtener(congreso:number):Observable<Taller[]>{
    return this.http.get<Taller[]>(this.url+"/Talleres/spTalleres_Obtener?congreso="+congreso);
  }

  spTalleres_Guardar(p:Taller):Observable<string>{
    return this.http.post<string>(this.url+"/Talleres/spTalleres_Guardar",p);
  }

  spTalleres_Borrar(id:number):Observable<string>{
    return this.http.get<string>(this.url+"/Talleres/spTalleres_Borrar?id="+id);
  }

}
