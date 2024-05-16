import { GENDER, STATUS } from "./character.type";

export interface IFilter {
  name: string;
  gender: "" | GENDER;
  status: "" | STATUS;
}