import { Tag } from "./tag";

export class ReceitaRequest {
  constructor(public titulo: string, public tags: Tag[]) { }
}
