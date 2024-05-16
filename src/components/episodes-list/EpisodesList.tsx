"use client";

import { useEffect, useRef, useState } from "react";
import { Pagination, Modal, Card, Loading } from "../../components";
import { EpisodeModal } from "./episode-modal";
import { IEpisode, IEpisodesRequest } from "@/types";
import { getAllEpisodes } from "@/api";
import { usePage } from "@/hooks";
import { ERROR_CONSTANTS, ROUTES } from "@/constants";
import ImageMock from "./RickAndMorty.jpeg";
import styles from "./episodes-list.module.scss";

export const EpisodesList = () => {
  const { page, handleChangePage } = usePage(ROUTES.episodes.link);

  const transitionRef = useRef<null | any>(null);

  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [episodeOnShow, setEpisodeOnShow] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadEpisodes = async () => {
      setIsLoading(true);
      try {
        const data: IEpisodesRequest = await getAllEpisodes(page ?? "1");

        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setEpisodes([]);
        setIsError(true);

        console.error("Error occurred", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEpisodes();
  }, [page]);

  return (
    <div className={styles.episodeListBox} id={"episodeListBox"}>
      {isError && <p>{ERROR_CONSTANTS.clientErrorMessage}</p>}
      <Modal
        selector={"episodeListBox"}
        show={episodeOnShow > 0}
        onClose={() => setEpisodeOnShow(-1)}
      >
        <EpisodeModal id={episodeOnShow} />
      </Modal>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ul className={styles.episodeList}>
            {episodes.map((episode) => (
              <div
                className={styles.episodeList__cardWrapper}
                onClick={() => setEpisodeOnShow(episode.id)}
                key={episode.id}
              >
                <Card
                  name={episode.name}
                  imageSrc={ImageMock.src}
                  altImage="Mock image"
                  infoData={[
                    { title: "created date:", data: episode.air_date },
                    { title: "episode index:", data: episode.episode },
                  ]}
                />
              </div>
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
