import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

constructor(private http: HttpClient) { }

consultaCep(cep:string){

    cep = cep.replace(/\D/g, '');

    if(cep != ""){

      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){

        return this.http.get(`//viacep.com.br/ws/${cep}/json`);


      } return alert('ERRO ao buscar CEP.');


    }

  }
}
