"use client";

import { useEffect, useState } from "react";
import { FilterBlock } from "./filter-block";
import { Card, Loading, Pagination } from "@/components";
import { ICharacter, ICharactersRequest, IFilter } from "@/types";
import { getCharacters } from "@/api";
import { useDebounce, usePage } from "@/hooks";
import { ERROR_CONSTANTS, ROUTES } from "@/constants";
import styles from "./characters-list.module.scss";

export const CharactersList = () => {
  const { page, handleChangePage } = usePage(ROUTES.characters.link);

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState<IFilter>({
    name: "",
    gender: "",
    status: "",
  });

  const { debouncedValue } = useDebounce(filter.name, 500);

  useEffect(() => {
    const loadCharacters = async () => {
      setIsLoading(true);

      try {
        const data: ICharactersRequest = await getCharacters(
          page ?? "1",
          {
            ...filter, 
            name: debouncedValue
          }
        );

        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err: any) {
        setCharacters([]);
        setIsError(true);

        console.error("Error occurred", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, [page, filter.gender, filter.status, debouncedValue]);

  return (
    <div className={styles.charactersList}>
      <FilterBlock setFilter={setFilter} textValue={filter.name} />
      {isError && <p>{ERROR_CONSTANTS.clientErrorMessage}</p>}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ul>
            {characters.map((ch) => (
              <Card
                key={ch.id}
                name={ch.name}
                imageSrc={ch.image}
                altImage={`Image of ${ch.name} character`}
                infoData={[
                  { title: "gender: ", data: ch.gender },
                  { title: "status:", data: ch.status },
                  {
                    title: "type:",
                    data: ch.type.length > 0 ? ch.type : "no information",
                  },
                ]}
              />
            ))}
          </ul>
          <div className={styles.pagination}>
            <Pagination
              currentPage={page ?? "1"}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};
