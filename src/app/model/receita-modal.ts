import { StepResponse } from "./step-response";
import { Tag } from "./tag";

export interface ReceitaModal {
  tags: Tag[];
  steps: StepResponse[];
}
