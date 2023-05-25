import { Produto } from "./produto";

export interface Step{
  path:string;
  step:BigInteger;
  produto:Produto;
  modoPreparo:string;
}
