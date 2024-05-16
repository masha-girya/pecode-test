import React from "react";
import styles from './page-wrapper.module.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const PageWrapper = (props: IProps) => {
  const { title, children } = props;

  return (
    <main className={styles.pageWrapper}>
      <h1 className={styles.pageWrapper__title}>
        {title}
      </h1>
      {children}
    </main>
  );
};
