import { IRequestInfo } from "./request-info.type";

export interface IEpisodesRequest {
  info: IRequestInfo;
  results: IEpisode[];
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
