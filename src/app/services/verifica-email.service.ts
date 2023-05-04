import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private htpp: HttpClient) {}


    verificarEmail(email:string){

      return this.htpp.get('assets/dados/verificaremail.json')
      .pipe(
        map((dados:any)=> dados.emails),
        map((dados:any[])=> dados.filter(v=> v.email == email)),
        map((dados:any[]) => dados.length>0)

      );

   }
}
