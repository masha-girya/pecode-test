import { Nav } from "@/components";
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  )
}