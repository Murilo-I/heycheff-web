import { HttpClient } from "@angular/common/http";
import { Tag } from "../model/tag";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Step } from "../model/step";

@Injectable({
    providedIn: 'root'
})
export class StepService {
    constructor(private httpClient: HttpClient) { }

    incluir(step: Step, video: File, receitaId: BigInteger) {
        const formData = new FormData();
        formData.append('step', step.step.toString());
        formData.append('produto', JSON.stringify(step.produto));
        formData.append('modoPreparo', step.modoPreparo);
        formData.append('video', video);

        return this.httpClient.post(environment.ApiUrl + `/receitas/${receitaId}/steps`, formData);
    }

    delete(stepId: BigInteger, receitaId: BigInteger) {
        return this.httpClient.delete(environment.ApiUrl + `/receitas/${receitaId}/steps/${stepId}`);
    }
}