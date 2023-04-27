import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient){

  }


  ngOnInit(){

    /*this.furmulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/


    this.formulario = this.formBuilder.group({
      nome: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: [null, [
        Validators.required,
        Validators.email
      ]],

      endereco: this.formBuilder.group({
         cep:[null, Validators.required],
      numero:[null, Validators.required],
      complemento:[null],
      rua:[null, Validators.required],
      bairro:[null, Validators.required],
      cidade:[null, Validators.required],
      estado:[null, Validators.required]
      })

    });

  }


  OnSubmit(){
    console.log(this.formulario);

      if(this.formulario.valid){

        this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados =>{
        console.log(dados);

        this.limpar();
      }, (error:any)=> alert('erro'));

    }else{

      Object.keys(this.formulario['controls']).forEach(campo =>{
        console.log(campo);

        const controle = this.formulario.get(campo);
        controle?.markAllAsTouched;


      })
    }

  }

  limpar(){
    this.formulario.reset();
  }

  consultaCep(){

    let cep = this.formulario.get('endereco.cep')?.value;

    cep = cep.replace(/\D/g, '');

    if(cep != ""){

      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .subscribe(dados => this.populaDadosForm(dados));


      }

    }

  }

  populaDadosForm(dados:any){
    this.formulario.patchValue({
      endereco:{
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

  }

  }
