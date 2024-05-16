import { API_ENDPOINT, API_ROUTES } from "@/constants";
import axios from "axios";
import { tryCatchMiddleware } from "./tryCatch.middleware";

export const getCharacters = async (
  page: string,
  filter?: {
    name: string;
    gender: string;
    status: string;
  }
) => {
  let urlQuery = `${API_ENDPOINT}/${API_ROUTES.characters}?page=${page}`;

  if (filter) {
    urlQuery += `&name=${filter.name}&gender=${filter.gender}&status=${filter.status}`;
  }

  return tryCatchMiddleware(async () => {
    const res = await axios.get(urlQuery);

    return res.data;
  });
};

export const getCharactersById = async (ids: string[]) => {
  return tryCatchMiddleware(async () => {
    const res = await axios.get(
      `${API_ENDPOINT}/${API_ROUTES.characters}/${ids.join(",")}`
    );

    return res.data;
  });
};
