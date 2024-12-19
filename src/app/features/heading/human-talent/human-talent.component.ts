import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HumanTalentService } from '../../../core/humanTalent/human-talent.service';
import { HumanTalentModel } from '../../../core/models/human-talent.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-human-talent',
  templateUrl: './human-talent.component.html',
  styleUrls: ['./human-talent.component.css'],
  imports: [CommonModule]
})
export class HumanTalentComponent implements OnInit {

  human_talents: any[] = [];
  projectId: number | null = null;

  constructor(private route: ActivatedRoute, private service: HumanTalentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id;
        this.loadData(this.projectId);
      }
    });
  }

  loadData(projectId: number): void {
    this.service.getHumanTalentBudget(projectId).subscribe({
      next: (budgetData) => {
        this.service.getHumanTalentDetails(projectId).subscribe({
          next: (detailsData) => {
            this.combineData(budgetData, detailsData);
          },
          error: (err) => console.log('Error al obtener los detalles del talento', err)
        });
      },
      error: (err) => console.log('Error al obtener el presupuesto del talento', err)
    });
  }

  combineData(budgetData: any[], detailsData: any[]): void {
    const combinedData = budgetData.map(budget => {
      const details = detailsData.filter(d => d.TalentID === budget.TalentID);
      const talent = {
        TalentID: budget.TalentID,
        Position: budget.Position,
        Justification: budget.Justification,
        Quantity: budget.Quantity,
        Year1WeeksOrYears: this.getValueForYear(details, 1, 'WeeksOrYears'),
        Year2WeeksOrYears: this.getValueForYear(details, 2, 'WeeksOrYears'),
        Year3WeeksOrYears: this.getValueForYear(details, 3, 'WeeksOrYears'),
        HourValue: this.getValueForYear(details, 1, 'HourValue'),
        Year1TotalAmount: this.getValueForYear(details, 1, 'TotalAmount'),
        Year2TotalAmount: this.getValueForYear(details, 2, 'TotalAmount'),
        Year3TotalAmount: this.getValueForYear(details, 3, 'TotalAmount'),
        TotalHonorariumAmount: budget.TotalHonorariumAmount
      };
      return talent;
    });

    this.human_talents = combinedData;
  }

  getValueForYear(details: any[], year: number, field: string): any {
    const yearDetail = details.find(d => d.Year === year);
    return yearDetail ? yearDetail[field] : 0;
  }

  onEdit(record: any): void {
    // Aquí puedes redirigir al formulario de edición o mostrar un modal para editar el talento
    console.log('Editar talento:', record);
    // Ejemplo: Redirigir a una página de edición
    // this.router.navigate(['/edit-talent', record.TalentID]);
  }

  // Función para eliminar el talento
  onDelete(talentId: number): void {
    console.log('Eliminar talento:', talentId);
    // // Llamar al servicio para eliminar el talento
    // this.service.deleteHumanTalent(talentId).subscribe({
    //   next: () => {
    //     console.log('Talento eliminado:', talentId);
    //     // Actualizar la lista después de eliminar
    //     this.human_talents = this.human_talents.filter(talent => talent.TalentID !== talentId);
    //   },
    //   error: (err) => console.log('Error al eliminar el talento', err)
    // });
  }

  onCreateBudget(): void {
    if (this.projectId){
      this.service.createBudget(this.projectId).subscribe({
        next: (response) => {
          if (response){
            alert('Presupuesto creado correctamente');
            if (this.projectId){
              this.loadData(this.projectId);
            }
          }
        },
        error: (err) => console.log('Error al crear el presupuesto', err)
      });
    }
  }
}