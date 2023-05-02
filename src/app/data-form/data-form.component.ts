import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../services/dropdown.service';
import { EstadoBr } from './models/estado-br';
import { ConsultaCepService } from '../services/consulta-cep.service';
import { Observable } from 'rxjs';
import { FormValidators } from './form-validators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  // estados!: EstadoBr[];
  estados!: Observable<EstadoBr[]>;
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!:any[];

  constructor
  (private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService){

  }


  ngOnInit(){

    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

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
         cep:[null, [Validators.required, FormValidators.cepValidator]],
      numero:[null, Validators.required],
      complemento:[null],
      rua:[null, Validators.required],
      bairro:[null, Validators.required],
      cidade:[null, Validators.required],
      estado:[null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: [null],
      termos: [null, Validators.pattern('true')],


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

      Object.keys(this.formulario.controls).forEach(campo =>{
        console.log(campo);

        this.formulario.get(campo)?.markAllAsTouched();

        if(this.formulario.get('termos')?.value == null){
          this.formulario.get('termos')?.setValue(false);
        }


      })
    }

  }

  limpar(){
    this.formulario.reset();
  }

  consultaCep(){

    let cep = this.formulario.get('endereco.cep')?.value;


    if(cep != null && cep !== ''){
      this.cepService.consultaCep(cep)
      ?.subscribe(dados=>this.populaDadosForm(dados));
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

   setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1:any, obj2:any){
    return obj1 && obj2 ? (obj1.nivel === obj2.nivel) : obj1 && obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'ruby']);

  }

  }
