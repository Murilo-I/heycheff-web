import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceitaFeed } from '../model/receita-feed';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(private httpClient: HttpClient) { }

  loadFeed() {
    return this.httpClient.get<ReceitaFeed[]>(environment.ApiUrl + "/receitas");
  }
}