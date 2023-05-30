import { Produto } from "./produto";

export class StepRequest {
  constructor(public step: BigInteger, public produtos: Produto[],
    public modoPreparo: string) { }
}
