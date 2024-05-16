import { IRequestInfo } from "./request-info.type";

export interface ILocationsAPI {
  info: IRequestInfo;
  results: ILocation[];
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
