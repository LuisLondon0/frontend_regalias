import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentsoftwareModel } from '../../../core/models/equipment-software.model';
import { EquipmentsoftwareService } from '../../../core/equipmentsoftware/equipmentsoftware.service';

@Component({
  selector: 'app-equipmentsoftware',
  imports: [CommonModule, FormsModule],
  templateUrl: './equipmentsoftware.component.html',
  styleUrl: './equipmentsoftware.component.css',
})
export class EquipmentsoftwareComponent implements OnInit {
  recordList!: EquipmentsoftwareModel[];
  projectId: number | null = null;

  constructor(private route: ActivatedRoute, private service: EquipmentsoftwareService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID:', id);
      if (id) {
        this.projectId = +id;
        this.loadData(this.projectId);
      }
    });
    // this.loadData(0);
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

  loadData(projectId: number) {
    this.service.GetAllEquipmentsoftwareProject(projectId).subscribe(
      (data) => {
        this.recordList = data;
      },
      (error) => {
        alert('Error de comunicación con el servicio');
      }
    );
  }

  onEdit(record: EquipmentsoftwareModel) {
    // (record as any)[field] = value;
    if (record.entity == null || record.entity == '') {
      record.entity = ' ';
    }
    this.service.EditEquipmentsoftware(record).subscribe(
      {
        next: () => alert('Registro actualizado:'),
        error: (err) => alert('Error al actualizar el registro'),
      }
      
      // (data) => {
      //   showMessage('Registros actualizados exitosamente !');
      // },
      // (error) => {
      //   showMessage('Error en la actualización');
      // }
    );
    this.closeModal();
  }

  openModal(record: EquipmentsoftwareModel) {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
    const actualizarBtn = document.getElementById('btn-actualizar');
    if (actualizarBtn) {
      actualizarBtn.removeEventListener('click', this.handleUpdateClick);

      this.handleUpdateClick = () => {
        this.onEdit(record);
      };

      actualizarBtn.addEventListener('click', this.handleUpdateClick);
    }
  }

  onDelete(equipmentId: number|undefined): void {
    console.log('Eliminar Equipo:', equipmentId);
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
    this.service.GetGenerateEquipmentSoftwares().subscribe(
      (data) => {
        console.log('Creacion presupuesto equipo');
      },
      (error) => {
        alert('Error de comunicación con el servicio');
      }
    );
    console.log('Crear presupuesto');
    // // Redirigir a la página de creación de presupuesto
    // this.router.navigate(['/create-budget']);
  }

  private handleUpdateClick!: () => void;

  closeModal() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
    this.fillRecords()
  }
}