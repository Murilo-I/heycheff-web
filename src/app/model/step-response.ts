import { Produto } from "./produto";

export interface StepResponse {
  path: string;
  step: number;
  produtos: Produto[];
  modoPreparo: string;
}
