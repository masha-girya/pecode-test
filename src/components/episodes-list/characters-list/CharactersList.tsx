import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { ICharacter } from "@/types";
import { getCharactersById } from "@/api";
import styles from "./characters-list.module.scss";

interface IProps {
  charactersList: string[];
}

export const CharactersList = (props: IProps) => {
  const { charactersList } = props;

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [charactersLimit, setCharactersLimit] = useState(3);

  const listRef = useRef<any | null>(null);

  useEffect(() => {
    const loadCharacters = async (characterUrls: string[]) => {
      const characterIds = characterUrls.map((url) =>
        url.slice(url.lastIndexOf("/") + 1, url.length)
      );
      const characterIdsLimit = characterIds.slice(1, charactersLimit + 1);

      try {
        const charactersData = await getCharactersById(characterIdsLimit);

        setCharacters(charactersData);
      } catch (err) {
        console.error(err);
      }
    };

    loadCharacters(charactersList);
  }, [charactersLimit, charactersList]);

  const changeLimit = useCallback(() => {
    if (charactersList.length > charactersLimit) {
      setCharactersLimit((prev) => prev + 3);
    }
    if (listRef.current) {
      setTimeout(() => {
        listRef.current.scrollTop = Number.MAX_SAFE_INTEGER;
      }, 200);
    }
  }, [charactersLimit, charactersList, listRef]);

  return (
    <div className={styles.charactersList}>
      <ul className={styles.charactersList__list} ref={listRef}>
        {characters.map((ch) => (
          <li className={styles.character} key={ch.id}>
            <div className={styles.character__img}>
              <Image
                src={ch.image}
                alt={ch.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 130px"
              />
            </div>
            <p className={styles.character__name}>{ch.name}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={changeLimit}
        disabled={charactersList.length <= charactersLimit}
        className={classNames(styles.charactersList__moreBtn, {
          [styles.charactersList__moreBtn_maxLimit]:
            charactersList.length <= charactersLimit,
        })}
      >
        Load more
      </button>
    </div>
  );
};
