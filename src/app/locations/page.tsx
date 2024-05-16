"use client";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../../../apollo-client";
import { LocationsList, PageWrapper } from "@/components";

const Locations = () => {
  const client = createApolloClient();

  return (
    <PageWrapper title="Locations of Rick & Morty series">
      <div>
        <ApolloProvider client={client}>
          <LocationsList />
        </ApolloProvider>
      </div>
    </PageWrapper>
  );
};

export default Locations;
