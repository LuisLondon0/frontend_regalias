import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HumanTalentModel } from '../../../core/models/human-talent.model';
import { HumanTalentService } from '../../../core/humanTalent/human-talent.service';

@Component({
  selector: 'app-human-talent',
  imports: [CommonModule, FormsModule],
  templateUrl: './human-talent.component.html',
  styleUrl: './human-talent.component.css'
})
export class HumanTalentComponent  implements OnInit{

  recordList!: HumanTalentModel[];

  constructor(private service: HumanTalentService) {}

  ngOnInit(): void{
    this.fillRecords();
  }

  fillRecords() {
    this.service.GetAllHumanTalent().subscribe(
      (data) => {
        this.recordList = data;
      },
      (error) => {
        alert('Error de comunicación con el servicio');
      }
    );
  }

  onEdit(record: HumanTalentModel, field: string, value: any){
    
    (record as any)[field] = value;

    this.service.EditHumanTalent(record).subscribe({
      next: ( () => console.log('Registro actualizado:', record)),
      error: (err) => console.log('Error al actualizar el registro', err)
    });    
  }

}