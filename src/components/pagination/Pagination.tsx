import styles from "./pagination.module.scss";
import { PaginationButton } from "./pagination-button";

interface IProps {
  currentPage: string;
  totalPages: number;
  handleChangePage: (page: number) => void;
}

export const Pagination = (props: IProps) => {
  const { currentPage, totalPages, handleChangePage } = props;
  const page = Number(currentPage);

  const pageBreakpoint = totalPages >= 5 ? 2 : 3;
  const isCurrentPageMoreThanBreakpoint = page > pageBreakpoint;
  const isLastPageActive = page === totalPages;
  const isTotalPagesMoreThanBreakpoint = totalPages > pageBreakpoint;

  const getLastPage = () => {
    if (isLastPageActive && isTotalPagesMoreThanBreakpoint) {
      return page - 1;
    }

    if (isTotalPagesMoreThanBreakpoint) {
      return 3;
    }

    return totalPages;
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    const startPage =
      isLastPageActive && isTotalPagesMoreThanBreakpoint ? page - 3 : 1;
    const endPage = getLastPage();

    for (let i = startPage + 1; i <= endPage; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          type="number"
          isActive={page === i}
          pageNumber={i}
          handleChangePage={() => handleChangePage(i)}
          isNonClickable={page === i}
        />
      );
    }
    return buttons;
  };

  return (
    <div className={styles.paginationWrapper}>
      <PaginationButton
        type="prev"
        handleChangePage={() => handleChangePage(page - 1)}
        isNonClickable={page === 1}
      />
      <PaginationButton
        type="number"
        isActive={page === 1}
        pageNumber={1}
        handleChangePage={() => handleChangePage(1)}
        isNonClickable={page === 1}
      />

      {(isCurrentPageMoreThanBreakpoint || isLastPageActive) &&
        isTotalPagesMoreThanBreakpoint && (
          <PaginationButton
            type="empty"
            handleChangePage={() => handleChangePage(page - 1)}
          />
        )}

      {(!isCurrentPageMoreThanBreakpoint || isLastPageActive) &&
        renderPaginationButtons()}

      {isCurrentPageMoreThanBreakpoint && !isLastPageActive && (
        <PaginationButton
          type="number"
          isActive
          pageNumber={page}
          handleChangePage={() => {}}
          isNonClickable
        />
      )}

      {isTotalPagesMoreThanBreakpoint && !isLastPageActive && (
        <PaginationButton
          type="empty"
          handleChangePage={() => handleChangePage(page + 1)}
        />
      )}

      {isTotalPagesMoreThanBreakpoint && (
        <PaginationButton
          type="number"
          pageNumber={totalPages}
          isActive={isLastPageActive}
          handleChangePage={() => handleChangePage(totalPages)}
        />
      )}

      <PaginationButton
        type="next"
        handleChangePage={() => handleChangePage(page + 1)}
        isNonClickable={isLastPageActive}
      />
    </div>
  );
};
