import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudante } from '../estudante';


@Component({
  selector: 'app-form-estudante',
  templateUrl: './form-estudante.component.html',
  styleUrls: ['./form-estudante.component.css']
})

export class FormEstudanteComponent implements OnChanges {
  @Input() Estudante: Estudante = {} as Estudante;
  @Output() saveEvent = new EventEmitter<Estudante>();
  @Output() cleanEvent = new EventEmitter<void>();
  formGroupEstudante: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.formGroupEstudante = formBuilder.group({
      id: [''],
      nome_est: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupEstudante.setValue(this.Estudante);
  }

  save() {
    this.submitted = true;
    if (this.formGroupEstudante.valid) {
      this.saveEvent.emit(this.formGroupEstudante.value);
      this.formGroupEstudante.reset();
      this.submitted = false;
    }
  }

  clean() {
    this.cleanEvent.emit();
    this.formGroupEstudante.reset();
    this.submitted = false;

  }

  get nome_est(): any {
    return this.formGroupEstudante.get('nome_est');
  }
  
  get email(): any {
    return this.formGroupEstudante.get('email');
  }
  
  get cpf(): any {
    return this.formGroupEstudante.get('cpf');
  }
  
  get endereco(): any {
    return this.formGroupEstudante.get('endereco');
  }
  
}
