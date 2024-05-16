import { API_ENDPOINT, CREATOR_INFO, TECH_STACK } from "@/constants";
import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__col}>
        <h5 className={styles.footer__col__title}>Created by</h5>
        <p className={styles.footer__col__info}>Maria Girya</p>
      </div>
      <div className={styles.footer__col}>
        <h5 className={styles.footer__col__title}>Creator info</h5>
        <ul className={styles.footer__col__list}>
          {CREATOR_INFO.map((info) => (
            <li key={info.title} className={styles.footer__col__info}>
              <a href={info.link} target="_blank">
                {info.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.footer__col}>
        <h5 className={styles.footer__col__title}>Technologies</h5>

        <div className={styles.footer__col__tech}>
          <ul className={styles.footer__col__list}>
            {TECH_STACK.slice(0, Math.ceil(TECH_STACK.length / 2)).map(
              (tech) => (
                <li key={tech} className={styles.footer__col__info}>
                  {tech}
                </li>
              )
            )}
          </ul>
          <ul className={styles.footer__col__list}>
            {TECH_STACK.slice(Math.ceil(TECH_STACK.length / 2)).map((tech) => (
              <li key={tech} className={styles.footer__col__info}>
                {tech}
              </li>
            ))}
            <li className={styles.footer__col__info}>
              <a href={API_ENDPOINT} target="_blank">
                API
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
