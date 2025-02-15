import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route : ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    
    if(environment.token == ''){
      this.router.navigate(['/login-cadastro'])
    }

    let idTema = this.route.snapshot.params['idTema']
    this.findByIdTema(idTema)
  }

  findByIdTema(idTema: number){
    this.temaService.getByIdTema(idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema) =>{
      this.tema = resp
      this.alerta.showAlertSuccess('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}