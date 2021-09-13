import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'


 config: ConfigParams = {
   pagina: 0,
   limite: 4
 }
  filmes: Filme[] = [];
  filtroListagem:  FormGroup;
  generos: Array<string>;

  constructor(private filmeService: FilmesService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.filtroListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtroListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
     this.config.pesquisa = val;
     this.resetarConsulta();
      
    })
    this.filtroListagem.get('genero').valueChanges.subscribe((val: string) => {
     this.config.campo = {tipo: 'genero', valor: val};
     this.resetarConsulta();
      
    })
    this.generos = ['Ação, Romance', 'Aventura', 'Terror', 'Ficção científica', 'Comédia', 'Drama', 'Aventura'];
    this.listarFIlmes();

  }

  onScroll(): void{     
    this.listarFIlmes();
  }

  abrir(id: number): void{
    this.router.navigateByUrl('/filmes/' + id)
  }
  
  private listarFIlmes(): void{
    this.config.pagina++;
    this.filmeService.listar(this.config).subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFIlmes()
  }



}
