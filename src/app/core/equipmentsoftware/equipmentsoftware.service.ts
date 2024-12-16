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
  
  constructor(private http: HttpClient) { }

  GetAllEquipmentsoftware(): Observable<EquipmentsoftwareModel[]>{
    return this.http.get<EquipmentsoftwareModel[]>(`${ServiceConfig.url_base}${this.entity}`);
  }

  EditEquipmentsoftware(humanTalent: EquipmentsoftwareModel): Observable<any> {
    return this.http.put(`${ServiceConfig.url_base}${this.entity}/${humanTalent.id}`,humanTalent,{
      headers: new HttpHeaders({}),
      responseType: 'json'
    });
  }

  GetEquipmentsoftwareById(id:String):Observable<EquipmentsoftwareModel>{
    return this.http.get<EquipmentsoftwareModel>(`${ServiceConfig.url_base}${this.entity}/${id}`);
  }
}