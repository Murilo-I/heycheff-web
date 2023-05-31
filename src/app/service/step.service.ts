import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { StepRequest } from "../model/step-request";

@Injectable({
    providedIn: 'root'
})
export class StepService {
    constructor(private httpClient: HttpClient) { }

    incluir(step: StepRequest, receitaId: BigInteger) {
        const formData = new FormData();
        formData.append('step', step.step.toString());
        formData.append('produto', JSON.stringify(step.produtos));
        formData.append('modoPreparo', step.modoPreparo);
        formData.append('video', step.video);

        return this.httpClient.post(environment.ApiUrl + `/receitas/${receitaId}/steps`, formData);
    }

    delete(stepId: BigInteger, receitaId: BigInteger) {
        return this.httpClient.delete(environment.ApiUrl + `/receitas/${receitaId}/steps/${stepId}`);
    }
}