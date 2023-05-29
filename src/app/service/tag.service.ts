import { HttpClient } from "@angular/common/http";
import { Tag } from "../model/tag";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TagService {
    constructor(private httpClient: HttpClient) { }

    listAll() {
        return this.httpClient.get<Tag[]>(environment.ApiUrl + '/tags');
    }
}