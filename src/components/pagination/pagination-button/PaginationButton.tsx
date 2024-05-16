import classNames from "classnames";
import {
  PaginationArrowNextIcon,
  PaginationArrowPrevIcon,
} from "@/components/icons";
import styles from "./pagination-button.module.scss";

interface IProps {
  type?: "number" | "prev" | "next" | "empty";
  pageNumber?: number;
  isActive?: boolean;
  isNonClickable?: boolean;
  handleChangePage: () => void;
}

export const PaginationButton = (props: IProps) => {
  const {
    pageNumber,
    type = "number",
    isNonClickable,
    isActive,
    handleChangePage,
  } = props;

  const getPageNumber = () => {
    switch (type) {
      case "prev":
        return <PaginationArrowPrevIcon />;
      case "next":
        return <PaginationArrowNextIcon />;
      case "number":
        return pageNumber;
      case "empty":
        return "...";
      default:
        return "";
    }
  };

  return (
    <div
      onClick={
        !isNonClickable
          ? () => handleChangePage()
          : () => {}
      }
      className={classNames(styles.pagination, styles[`pagination--${type}`], {
        [styles.pagination_active]: isActive,
        [styles[`pagination--${type}_nonClickable`]]: isNonClickable,
      })}
    >
      <p
        className={classNames(styles.pagination__pageNumber, {
          [styles.pagination__pageNumber_active]: isActive,
        })}
      >
        {getPageNumber()}
      </p>
    </div>
  );
};
