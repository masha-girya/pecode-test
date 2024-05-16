import { IRequestInfo } from "./request-info.type";

export interface ICharactersRequest {
  info: IRequestInfo;
  results: ICharacter[];
}

export enum GENDER {
  female = "female",
  male = "male",
  genderless = "genderless",
  unknown = "unknown",
}

export enum STATUS {
  alive = "alive",
  dead = "dead",
  unknown = "unknown",
}

export interface ICharacter {
  id: number;
  name: string;
  status: STATUS;
  species: string;
  type: string;
  gender: GENDER;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
