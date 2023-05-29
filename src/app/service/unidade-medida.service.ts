import { HttpClient } from "@angular/common/http";
import { Tag } from "../model/tag";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UnidadeMedidaService {
    constructor(private httpClient: HttpClient) { }

    list(produtoId: string) {
        return this.httpClient.get<Tag>(environment.ApiUrl + `/produtos/${produtoId}/medidas`);
    }
}