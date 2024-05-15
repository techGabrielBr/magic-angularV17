import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { MagicSetResponse } from '../../modules/public/models/MagicSetResponse';
import { BoosterResponse } from '../../modules/public/models/BoosterResponse';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private http: HttpClient) { }

  API_URL = environment.MAGIC_API_URL;

  getSets(block: string, name: string): Observable<MagicSetResponse> {
    if(name != "") {
      return this.http.get<MagicSetResponse>(`${this.API_URL}/sets?name=${name}|${block}`);
    }
    return this.http.get<MagicSetResponse>(`${this.API_URL}/sets?name=${block}`);
  }

  getBooster(id: string): Observable<BoosterResponse> {
    return this.http.get<BoosterResponse>(`${this.API_URL}/sets/${id}/booster`);
  }

}
