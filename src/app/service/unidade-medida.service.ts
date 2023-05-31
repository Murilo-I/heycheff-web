import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { UnidadeMedida } from "../model/unidade-medida";

@Injectable({
    providedIn: 'root'
})
export class UnidadeMedidaService {
    constructor(private httpClient: HttpClient) { }

    list(produtoId: number) {
        return this.httpClient.get<UnidadeMedida[]>(environment.ApiUrl + `/produtos/${produtoId}/medidas`);
    }
}