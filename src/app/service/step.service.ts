import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { StepRequest } from "../model/step-request";
import { catchError } from 'rxjs';
import { handleError } from './error.handler';

@Injectable({
    providedIn: 'root'
})
export class StepService {
    constructor(private httpClient: HttpClient) { }

    incluir(step: StepRequest, receitaId: number) {
        const formData = new FormData();
        formData.append('step', step.step.toString());
        formData.append('produtos', JSON.stringify(step.produtos));
        formData.append('modoPreparo', step.modoPreparo);
        formData.append('video', step.video);

        return this.httpClient.post(environment.ApiUrl + `/receitas/${receitaId}/steps`, formData, {
            observe: 'events',
            reportProgress: true
        })
            .pipe(catchError(err => handleError(err)));
    }

    delete(stepId: BigInteger, receitaId: number) {
        return this.httpClient.delete(environment.ApiUrl + `/receitas/${receitaId}/steps/${stepId}`);
    }
}