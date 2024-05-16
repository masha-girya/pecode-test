"use client";

import { useEffect, useState } from "react";
import { CharactersList } from "../characters-list";
import { IEpisode } from "@/types";
import { getEpisodeById } from "@/api";
import styles from "./episode-modal.module.scss";

interface IProps {
  id: number;
}

export const EpisodeModal = ({ id }: IProps) => {
  const [episode, setEpisode] = useState<null | IEpisode>(null);

  useEffect(() => {
    const loadEpisode = async () => {
      try {
        const episode = await getEpisodeById(id);

        setEpisode(episode);
      } catch (err) {
        console.error(err);
      }
    };

    loadEpisode();
  }, [id]);

  return (
    <div>
      {episode && (
        <div className={styles.episode}>
          <h2 className={styles.episode__name}>{episode.name}</h2>
          <p className={styles.episode__info}>
            Episode was created in <span>{episode.air_date}</span>
          </p>
          <p className={styles.episode__info}>
            Episode index is <span>{episode.episode}</span>
          </p>

          <div className={styles.episode__characters}>
            <h6>Characters</h6>

            <CharactersList charactersList={episode.characters} />
          </div>
        </div>
      )}
    </div>
  );
};
