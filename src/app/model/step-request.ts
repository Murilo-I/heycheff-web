import { Produto } from "./produto";

export class StepRequest {
  constructor(public step: number, public produtos: Produto[],
    public modoPreparo: string, public video: File) { }
}
