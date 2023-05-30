import { ReceitaModal } from './../model/receita-modal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReceitaFeed } from '../model/receita-feed';
import { ReceitaRequest } from '../model/receita-request';
import { ReceitaStatus } from '../model/receita-status';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  url: string = environment.ApiUrl + '/receitas';

  constructor(private httpClient: HttpClient) { }

  loadFeed() {
    return this.httpClient.get<ReceitaFeed[]>(this.url);
  }

  loadModal(id: BigInteger) {
    return this.httpClient.get<ReceitaModal[]>(`${this.url}/${id}`);
  }

  incluir(receita: ReceitaRequest, thumb: File) {
    const formData = new FormData();
    formData.append('titulo', receita.titulo);
    formData.append('tags', JSON.stringify(receita.tags));
    formData.append('thumb', thumb);
    return this.httpClient.post<ReceitaRequest[]>(this.url, formData);
  }

  atualizaStatus(status: ReceitaStatus, id: BigInteger) {
    return this.httpClient.patch<ReceitaStatus>(`${this.url}/${id}`, status);
  }


}
