import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HumanTalentModel } from '../../../core/models/human-talent.model';
import { HumanTalentService } from '../../../core/humanTalent/human-talent.service';
import { HumanTalentBudgetModel } from '../../../core/models/human-talent-budget.model';

@Component({
  selector: 'app-human-talent',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './human-talent.component.html',
  styleUrl: './human-talent.component.css'
})
export class HumanTalentComponent  implements OnInit{

  recordList!: HumanTalentModel[];
  budgetList!: HumanTalentBudgetModel[];

  constructor(private service: HumanTalentService) {}

  ngOnInit(): void{
    this.fillRecords();
    this.fillBudget();
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

  fillBudget() {
    this.service.GetHumanTalentBudget().subscribe(
      (data) => {
        this.budgetList = data;
      },
      (error) => {
        alert('Error de comunicación con el servicio');
      }
    );
  }

  onEdit(record: HumanTalentModel){
    
    // (record as any)[field] = value;

    this.service.EditHumanTalent(record).subscribe({
      next: ( () => console.log('Registro actualizado:', record)),
      error: (err) => console.log('Error al actualizar el registro', err)
    });    
  }

}