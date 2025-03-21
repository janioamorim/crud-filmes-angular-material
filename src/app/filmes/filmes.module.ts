import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VisualizarFilmeComponent } from './visualizar-filme/visualizar-filme.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroFilmesComponent, ListagemFilmesComponent, VisualizarFilmeComponent]
})
export class FilmesModule { }
