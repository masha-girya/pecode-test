import { API_ENDPOINT, API_ROUTES } from "@/constants";
import axios from "axios";
import { tryCatchMiddleware } from "./tryCatch.middleware";

export const getAllEpisodes = async (page: string) => {
  return tryCatchMiddleware(async () => {
    const res = await axios.get(
      `${API_ENDPOINT}/${API_ROUTES.episodes}?page=${page}`
    );

    return res.data;
  });
};

export const getEpisodeById = async (id: number) => {
  return tryCatchMiddleware(async () => {
    const res = await axios.get(`${API_ENDPOINT}/${API_ROUTES.episodes}/${id}`);

    return res.data;
  });
};
