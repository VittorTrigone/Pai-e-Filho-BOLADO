import { EstudanteService } from '../estudante.service';
import { Component, OnInit } from '@angular/core';
import { Estudante } from '../estudante';


@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css'],
})

export class EstudantesComponent {
  Estudantes: Estudante[] = [];
  Estudante: Estudante = {} as Estudante;
  isEditing: boolean = false;

  constructor(private EstudanteService: EstudanteService) { }

  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.EstudanteService.getEstudantes().subscribe({
      next: (data) => (this.Estudantes = data),
    });
  }

  onCleanEvent() {
    this.isEditing = false;
  }

  onSaveEvent(Estudante: Estudante) {
    if (this.isEditing) {
      this.EstudanteService.edit(Estudante).subscribe({
        next: () => {
          this.loadEstudantes();
          this.isEditing = false;
        },
      });
    } else {
      this.EstudanteService.save(Estudante).subscribe({
        next: (data) => {
          this.Estudantes.push(data);
        },
      });
    }
  }

  edit(Estudante: Estudante) {
    this.Estudante = Estudante;
    this.isEditing = true;
  }

  delete(Estudante: Estudante) {
    this.EstudanteService.delete(Estudante).subscribe({
      next: () => this.loadEstudantes(),
    });
  }
}