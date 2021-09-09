import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  pagina = 0;
  readonly qtdPagina = 4;
  filtroListagem:  FormGroup;
  generos: Array<string>;

  constructor(private filmeService: FilmesService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.filtroListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });
    this.generos = ['Ação, Romance', 'Aventura', 'Terror', 'Ficção científica', 'Comédia', 'Drama', 'Aventura'];
    this.listarFIlmes();

  }

  onScroll(): void{     
    this.listarFIlmes();
  }
  
  private listarFIlmes(): void{
    this.pagina++;
    this.filmeService.listar(this.pagina, this.qtdPagina).subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }



}
