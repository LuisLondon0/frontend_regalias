import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HumanTalentModel } from '../models/human-talent.model';
import { ServiceConfig } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HumanTalentService {

  entity = 'human_talents';
  
  constructor(private http: HttpClient) { }

  GetAllHumanTalent(): Observable<HumanTalentModel[]>{
    return this.http.get<HumanTalentModel[]>(`${ServiceConfig.url_base}${this.entity}`);
  }

  EditHumanTalent(humanTalent: HumanTalentModel): Observable<any> {
    return this.http.put(`${ServiceConfig.url_base}${this.entity}/${humanTalent.id}`,humanTalent,{
      headers: new HttpHeaders({}),
      responseType: 'json'
    });
  }

  GetHumanTalentById(id:String):Observable<HumanTalentModel>{
    return this.http.get<HumanTalentModel>(`${ServiceConfig.url_base}${this.entity}/${id}`);
  }

  getHumanTalentBudget(projectId: number): Observable<any> {
    return this.http.get<any>(`${ServiceConfig.url_base}${this.entity}/total_budget_per_talent/${projectId}`);
  }

  getHumanTalentDetails(projectId: number): Observable<any> {
    return this.http.get<any>(`${ServiceConfig.url_base}${this.entity}/budget_per_talent/${projectId}`);
  }
}
