import { trainingeventsModel } from '../models/trainingevents.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class trainingeventsService {

  entity = 'human_talents';

  constructor(private http: HttpClient) { }

  GetAlltrainingevents(): Observable<trainingeventsModel[]>{
    return this.http.get<trainingeventsModel[]>(`${ServiceConfig.url_base}${this.entity}`);
  }

  Edittrainingevents(trainingevents: trainingeventsModel): Observable<any> {
    return this.http.put(`${ServiceConfig.url_base}${this.entity}/${trainingevents.id}`,trainingevents,{
      headers: new HttpHeaders({}),
      responseType: 'json'
    });
  }

  GettrainingeventsById(id:String):Observable<trainingeventsModel>{
    return this.http.get<trainingeventsModel>(`${ServiceConfig.url_base}${this.entity}/${id}`);
  }
}
