import { Dispatch, SetStateAction } from "react";

interface IProps {
  setFilter: Dispatch<SetStateAction<any>>;
  options: any[];
  styles: string;
  name: string;
}

export const Select = (props: IProps) => {
  const { setFilter, options, styles, name } = props;

  return (
    <label>
      Filter by {name}:
      <select onChange={(e) => setFilter(e.target.value)} className={styles}>
        <option defaultChecked>Select {name}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};
