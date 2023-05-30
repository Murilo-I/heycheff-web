import { Produto } from "./produto";

export interface StepResponse {
  path: string;
  step: BigInteger;
  produto: Produto[];
  modoPreparo: string;
}
