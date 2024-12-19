import { trainingeventsService } from './../../../core/trainingevents/trainingevents.service';
import { trainingeventsModel } from './../../../core/models/trainingevents.model';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-human-talent',
  imports: [CommonModule, FormsModule],
  templateUrl: './trainingevents.component.html',
  styleUrls: ['./trainingevents.component.css']
})
export class TrainingEventsComponents implements OnInit {
  recordList!: trainingeventsModel[];

  constructor(private service: trainingeventsService) {}

  ngOnInit(): void {
    this.fillRecords();
  }

  fillRecords(): void {
    this.service.GetAlltrainingevents().subscribe({
      next: (data) => {
        this.recordList = data;
      },
      error: (error) => {
        alert('Error de comunicación con el servicio');
        console.error(error);
      }
    });
  }

  onEdit(record: trainingeventsModel, field: string, value: any): void {
    (record as any)[field] = value;

    this.service.Edittrainingevents(record).subscribe({
      next: () => console.log('Registro actualizado:', record),
      error: (err) => console.log('Error al actualizar el registro', err)
    });
  }
}
