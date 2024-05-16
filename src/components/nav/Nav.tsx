"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants";
import styles from "./nav.module.scss";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {Object.values(ROUTES).map((route) => (
          <li
            key={route.title}
            className={classNames(styles.nav__item, {
              [styles.nav__item_active]: pathname.includes(route.link),
            })}
          >
            <a href={`/${route.link}`}>{route.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
