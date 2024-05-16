"use client";

import { useQuery } from "@apollo/client";
import { Pagination, Card, Loading } from "@/components";
import { ILocation } from "@/types";
import { GET_LOCATIONS } from "@/api";
import { usePage } from "@/hooks";
import { ERROR_CONSTANTS, ROUTES } from "@/constants";
import MockImage from "./Earth.jpeg";
import styles from "./location-list.module.scss";

export const LocationsList = () => {
  const { page, handleChangePage } = usePage(ROUTES.locations.link);

  const { data, loading, error } = useQuery(GET_LOCATIONS, {
    variables: { page: parseInt(page || "1") },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <h2>{ERROR_CONSTANTS.clientErrorMessage}</h2>;
  }

  return (
    <div className={styles.locationListBox}>
      <ul>
        {data.locations.results.map((location: ILocation) => (
          <Card
            key={location.id}
            name={location.name}
            imageSrc={MockImage.src}
            altImage="Mock Image of Earth"
            infoData={[
              { title: "dimension:", data: location.dimension },
              {
                title: "type:",
                data: location.type,
              },
            ]}
          />
        ))}
      </ul>
      <div className={styles.locationListBox__pagination}>
        <Pagination
          currentPage={page ?? "1"}
          totalPages={data.locations.info.pages}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};
