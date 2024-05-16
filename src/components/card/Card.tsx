import Image from "next/image";
import styles from "./card.module.scss";

interface IInfoData {
  title: string;
  data: string;
}

interface IProps {
  name: string;
  imageSrc: string;
  altImage: string;
  infoData: IInfoData[];
}

export const Card = (props: IProps) => {
  const { name, imageSrc, altImage, infoData } = props;

  return (
    <li className={styles.card}>
      <div className={styles.card__image}>
        <Image
          src={imageSrc}
          alt={altImage}
          priority
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 200px"
        />
      </div>

      <div>
        <h4 className={styles.card__name}>{name}</h4>

        {infoData.map((info) => (
          <p className={styles.card__info} key={info.title}>
            <i>{info.title} </i>
            {info.data}
          </p>
        ))}
      </div>
    </li>
  );
};
