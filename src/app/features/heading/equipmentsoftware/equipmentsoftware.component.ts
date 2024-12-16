import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentsoftwareModel } from '../../../core/models/equipment-software.model';
import { EquipmentsoftwareService } from '../../../core/equipmentsoftware/equipmentsoftware.service';


@Component({
  selector: 'app-equipmentsoftware',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './equipmentsoftware.component.html',
  styleUrl: './equipmentsoftware.component.css'
})
export class EquipmentsoftwareComponent implements OnInit{

  recordList!: EquipmentsoftwareModel[];

  constructor(private service: EquipmentsoftwareService) {}

  ngOnInit(): void{
    this.fillRecords();
  }

  fillRecords() {
    this.service.GetAllEquipmentsoftware().subscribe(
      (data) => {
        this.recordList = data;
      },
      (error) => {
        alert('Error de comunicación con el servicio');
      }
    );
  }

  onEdit(record: EquipmentsoftwareModel, field: string, value: any){
    
    (record as any)[field] = value;

    this.service.EditEquipmentsoftware(record).subscribe({
      next: ( () => console.log('Registro actualizado:', record)),
      error: (err) => console.log('Error al actualizar el registro', err)
    });    
  }

}