import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {
  readonly semFoto = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'

  filme: Filme;
  id: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, 
    private filmeService: FilmesService, 
    private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
    this.visualizar();
  }
  private visualizar(): void{
    this.filmeService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme)
  }

  excluir():void{
    const config = 
    {
      data: {
        titulo: "Tem certeza que deseja excluir?",
        descricao: "Confirme para excluir o item.",
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuiBtnFechar: true
    } as Alerta
  };
   const dialogRef = this.dialog.open(AlertaComponent, config);
   dialogRef.afterClosed().subscribe((opcao: boolean)=> {
     if(opcao){
       this.filmeService.excluir(this.id)
       .subscribe(()=> this.router.navigateByUrl('filmes'));     
     }
   })
  }

  editar():void{
    this.router.navigateByUrl('/filmes/cadastro/'+ this.id)
  }

}
