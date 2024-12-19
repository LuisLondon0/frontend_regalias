import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentsoftwareModel } from '../models/equipment-software.model';
import { ServiceConfig } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsoftwareService {

  entity = 'equipment_softwares';
  generate = 'generate_equipment_softwares';
  
  constructor(private http: HttpClient) { }

  GetAllEquipmentsoftware(): Observable<EquipmentsoftwareModel[]>{
    return this.http.get<EquipmentsoftwareModel[]>(`${ServiceConfig.url_base}${this.entity}`);
  }

  EditEquipmentsoftware(equipment: EquipmentsoftwareModel): Observable<any> {
    return this.http.put(`${ServiceConfig.url_base}${this.entity}/${equipment.id}`,equipment,{
      headers: new HttpHeaders({}),
      responseType: 'json'
    });
  }

  GetEquipmentsoftwareById(id:String):Observable<EquipmentsoftwareModel>{
    return this.http.get<EquipmentsoftwareModel>(`${ServiceConfig.url_base}${this.entity}/${id}`);
  }

  GetGenerateEquipmentSoftwares(): Observable<EquipmentsoftwareModel[]>{
    return this.http.get<EquipmentsoftwareModel[]>(`${ServiceConfig.url_base}${this.generate}`);
  }
  GetAllEquipmentsoftwareProject(projectId: number): Observable<EquipmentsoftwareModel[]>{ 
    return this.http.get<EquipmentsoftwareModel[]>(`${ServiceConfig.url_base}${this.entity}/project/${projectId}`);
  }
}