import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../data-form/models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }


  getEstadosBr(){

    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');

  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ];
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'C#', desc: '#C'},
      {nome: 'ruby', desc: 'Ruby'},
    ]
  }

  getNewsletter(){
    return[
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
  }

}
