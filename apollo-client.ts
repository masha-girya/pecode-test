import { API_ENDPOINT_GQL } from "@/constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: API_ENDPOINT_GQL,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;