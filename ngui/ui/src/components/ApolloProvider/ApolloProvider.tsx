import { ApolloClient, ApolloProvider, InMemoryCache, split, HttpLink, from, type DefaultContext } from "@apollo/client";
import { onError, type ErrorResponse } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { type GraphQLError } from "graphql";
import { createClient } from "graphql-ws";
import { v4 as uuidv4 } from "uuid";
import { GET_ERROR } from "graphql/api/common";
import { useGetToken } from "hooks/useGetToken";
import { useSignOut } from "hooks/useSignOut";
import { getEnvironmentVariable } from "utils/env";

const httpBase = getEnvironmentVariable("VITE_APOLLO_HTTP_BASE");
const wsBase = getEnvironmentVariable("VITE_APOLLO_WS_BASE");

const writeErrorToCache = (cache: DefaultContext, graphQLError: GraphQLError) => {
  const { extensions: { response: { url, body: { error } = {} } = {} } = {}, message } = graphQLError;

  cache.writeQuery({
    query: GET_ERROR,
    data: { error: { __typename: "Error", id: uuidv4(), ...error, apolloErrorMessage: message, url } }
  });
};

const ApolloClientProvider = ({ children }) => {
  const { token } = useGetToken();

  const signOut = useSignOut();

  const httpLink = new HttpLink({
    uri: `${httpBase}/api`,
    headers: {
      "x-optscale-token": token
    }
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${wsBase}/subscriptions`
    })
  );

  const errorLink = onError(({ graphQLErrors, networkError, operation }: ErrorResponse) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((graphQLError) => {
        const { message, path, extensions } = graphQLError;

        console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);

        if (extensions?.response?.status === 401) {
          signOut();
        }
      });

      const { cache } = operation.getContext();
      writeErrorToCache(cache, graphQLErrors[0]);
    }

    /* Just log network errors for now. 
       We rely on custom error codes that are returned in graphQLErrors. 
       It might be useful to cache networkError errors to display alerts as well. 
    */
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, splitLink])
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
