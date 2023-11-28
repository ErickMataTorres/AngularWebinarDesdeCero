import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { TalleresComponent } from './Componentes/talleres/talleres.component';
import { ProfesoresComponent } from './Componentes/profesores/profesores.component';
import { CongresosComponent } from './Componentes/congresos/congresos.component';
import { InscripcionComponent } from './Componentes/inscripcion/inscripcion.component';

const routes: Routes = [
  {path:"", component: InicioComponent},
  {path:"Talleres",component:TalleresComponent},
  {path:"Profesores",component:ProfesoresComponent},
  {path:"Congresos",component:CongresosComponent},
  {path:"Inscripcion",component:InscripcionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    // {useHash: true}
    ), 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
