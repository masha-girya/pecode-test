import { Dispatch, SetStateAction, useCallback } from "react";
import { Select } from "@/components";
import { GENDER, IFilter, STATUS } from "@/types";
import styles from "./filter-block.module.scss";

interface IProps {
  setFilter: Dispatch<SetStateAction<IFilter>>;
  textValue: string;
}

export const FilterBlock = (props: IProps) => {
  const { setFilter, textValue } = props;

  const setFilterGender = useCallback(
    (gender: GENDER) => {
      setFilter((prev) => ({ ...prev, gender }));
    },
    [setFilter]
  );

  const setFilterStatus = useCallback(
    (status: STATUS) => {
      setFilter((prev) => ({ ...prev, status }));
    },
    [setFilter]
  );

  return (
    <div className={styles.labelBox}>
      <label className={styles.label}>
        Search by name:
        <input
          className={styles.label__textInput}
          placeholder="Type here..."
          value={textValue}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </label>

      <Select
        setFilter={setFilterGender}
        options={Object.values(GENDER)}
        name="gender"
        styles={styles.label__select}
      />
      <Select
        setFilter={setFilterStatus}
        options={Object.values(STATUS)}
        name="status"
        styles={styles.label__select}
      />
    </div>
  );
};
