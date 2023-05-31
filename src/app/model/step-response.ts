import { Produto } from "./produto";

export interface StepResponse {
  path: string;
  step: number;
  produto: Produto[];
  modoPreparo: string;
}
