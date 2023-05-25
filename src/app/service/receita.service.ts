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

  constructor(private httpClient: HttpClient) { }

  loadFeed() {
    return this.httpClient.get<ReceitaFeed[]>(environment.ApiUrl + '/receitas');
  }

  loadModal(id:BigInteger){
    return this.httpClient.get<ReceitaModal[]>(environment.ApiUrl + `/receitas/${id}`);
  }

  incluir(receita:ReceitaRequest,thumb:String){
    return this.httpClient.post<ReceitaRequest[]>
  }

  atualizaStatus(status:ReceitaStatus, id:BigInteger){
    return this.httpClient.patch<ReceitaStatus>(environment.ApiUrl + `/receitas/${id}`,status);
  }


}
