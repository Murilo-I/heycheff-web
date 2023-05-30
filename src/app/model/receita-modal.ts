import { Step } from "./step";
import { Tag } from "./tag";

export interface ReceitaModal {
  thumb: string;
  titulo: string;
  tags: Tag;
  steps: Step;
}
