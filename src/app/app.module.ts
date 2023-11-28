import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { ProfesoresComponent } from './Componentes/profesores/profesores.component';
import { TalleresComponent } from './Componentes/talleres/talleres.component';
import { DialogGuardarProfesoresComponent } from './Componentes/dialog-guardar-profesores/dialog-guardar-profesores.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

import { CongresosComponent } from './Componentes/congresos/congresos.component';
import { DialogCongresosComponent } from './Componentes/dialog-congresos/dialog-congresos.component';
import { DialogTalleresComponent } from './Componentes/dialog-talleres/dialog-talleres.component';
import { InscripcionComponent } from './Componentes/inscripcion/inscripcion.component';
import { DialogInscripcionComponent } from './Componentes/dialog-inscripcion/dialog-inscripcion.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProfesoresComponent,
    TalleresComponent,
    DialogGuardarProfesoresComponent,
    CongresosComponent,
    DialogCongresosComponent,
    DialogTalleresComponent,
    InscripcionComponent,
    DialogInscripcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }