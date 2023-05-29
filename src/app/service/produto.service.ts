import { environment } from 'src/environments/environment';
import { ProdutoDesc } from './../model/produto-desc';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) { }

  listAll() {
    return this.httpClient.get<ProdutoDesc>(environment.ApiUrl + '/produtos')
  }

}
