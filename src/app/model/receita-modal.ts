import { StepResponse } from "./step-response";
import { Tag } from "./tag";

export interface ReceitaModal {
  thumb: string;
  titulo: string;
  tags: Tag[];
  steps: StepResponse[];
}
